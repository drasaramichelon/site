import {timingSafeEqual} from "node:crypto";
import {revalidatePath, revalidateTag} from "next/cache";
import {NextResponse} from "next/server";

export const runtime = "nodejs";

function secretsMatch(received: string | null, expected: string | undefined) {
  if (!received || !expected) return false;
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  if (!secretsMatch(request.headers.get("x-sanity-secret"), process.env.SANITY_REVALIDATE_SECRET)) {
    return NextResponse.json({revalidated: false}, {status: 401});
  }

  const body = (await request.json()) as {_type?: string; slug?: {current?: string}};
  const slug = body.slug?.current;
  const validSlug = typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null;

  if (body._type === "siteSettings") {
    revalidateTag("site-settings", "max");
    revalidatePath("/", "layout");
  } else if (body._type === "article" && validSlug) {
    revalidateTag(`content:${validSlug}`, "max");
    revalidateTag("articles", "max");
    revalidatePath(`/conteudos/${validSlug}`);
    revalidatePath("/conteudos");
    revalidatePath(`/${validSlug}`);
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  } else if (["treatment", "page", "landingPage"].includes(body._type ?? "") && validSlug) {
    revalidateTag(`content:${validSlug}`, "max");
    revalidatePath(`/${validSlug}`);
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  } else if (body._type === "professional") {
    revalidateTag("professionals", "max");
    if (validSlug) {
      revalidateTag(`professional:${validSlug}`, "max");
      revalidatePath(`/equipe/${validSlug}`);
      if (validSlug === "dra-sara-michelon") {
        revalidatePath("/dra-sara-michelon");
      }
    }
    revalidatePath("/equipe");
    revalidatePath("/");
  } else {
    revalidatePath("/", "layout");
  }

  return NextResponse.json({revalidated: true});
}
