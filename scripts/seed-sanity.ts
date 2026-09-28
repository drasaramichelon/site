import {readdir, readFile} from "node:fs/promises";
import path from "node:path";
import {createClient} from "next-sanity";
import {fallbackArticles, fallbackLandingPages, fallbackPages, fallbackProfessionals, fallbackSiteSettings, fallbackTreatments} from "../lib/content/fallback.ts";
import type {ContentSection, Seo} from "../lib/content/types.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) throw new Error("Defina NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN antes de executar o seed.");

const client = createClient({projectId, dataset, apiVersion, token, useCdn: false});
const id = (type: string, slug: string) => `seed-${type}-${slug.replace(/[^a-z0-9-]/g, "-")}`;
const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const ref = (_ref: string) => ({_type: "reference", _ref});
const blocks = (paragraphs: string[] = [], prefix = "text") => paragraphs.map((text, index) => ({_type: "block", _key: `${prefix}-${index + 1}`, style: "normal", markDefs: [], children: [{_type: "span", _key: `${prefix}-${index + 1}-span`, text, marks: []}]}));
const seo = (value: Seo) => ({title: value.title, description: value.description, canonical: value.canonical, index: value.index ?? true});

const media = [
  ["dr-sara-hero.webp", "Dra. Sara Michelon em retrato profissional"],
  ["dr-sara-perfil.webp", "Retrato profissional da Dra. Sara Michelon"],
  ["dr-sara-autoridade.webp", "Dra. Sara Michelon em retrato de autoridade"],
  ["dr-sara-planejamento.webp", "Dra. Sara Michelon diante de um planejamento odontológico digital"],
  ["dr-sara-estetica.webp", "Dra. Sara Michelon em retrato editorial"],
  ["sara-home-hero-2026.webp", "Dra. Sara Michelon em retrato profissional no consultório"],
  ["sara-home-hero-17.webp", "Dra. Sara Michelon em retrato profissional no consultório"],
  ["sara-autoridade-2025.webp", "Dra. Sara Michelon em retrato clínico de autoridade"],
  ["sara-profile-2026.webp", "Retrato profissional da Dra. Sara Michelon"],
  ["sara-card-profile.webp", "Retrato de perfil da Dra. Sara Michelon"],
  ["sara-card-profile-33.webp", "Retrato de perfil da Dra. Sara Michelon"],
  ["sara-estetica-orofacial.webp", "Dra. Sara Michelon em avaliação facial"],
  ["team-main.webp", "Equipe da clínica da Dra. Sara Michelon"],
  ["planning-digital-scan.webp", "Planejamento odontológico digital e escaneamento"],
  ["clinic-consultorio-1.webp", "Consultório 1 da clínica da Dra. Sara Michelon"],
  ["clinic-operatory-main.webp", "Consultório odontológico da clínica da Dra. Sara Michelon"],
  ["clinic-reception-rear.webp", "Recepção da clínica da Dra. Sara Michelon nos Ingleses"],
  ["clinic-coffee-lounge.webp", "Cantinho do café e lounge acolhedor da clínica"],
  ["clinic-sterilization.webp", "Central de esterilização e biossegurança da clínica"],
  ["clinic-office.webp", "Escritório de diagnóstico e planejamento clínico"],
  ["clinic-counter.webp", "Balcão de recepção e atendimento da clínica"],
  ["clinic-biosecurity.webp", "Protocolos de biossegurança hospitalar"],
  ["invisalign-real-support.webp", "Alinhador Invisalign em contexto clínico real"],
  ["dra-camila.webp", "Retrato profissional da Dra. Camila Cecchin"],
  ["dra-maria-clara.webp", "Retrato profissional da Dra. Maria Clara"],
  ["dr-ericson.webp", "Retrato profissional do Dr. Ericson Pessanha"],
  ["equipe.webp", "Equipe da clínica da Dra. Sara Michelon"],
  ["clinica-consultorio.webp", "Consultório da clínica da Dra. Sara Michelon"],
  ["clinica-consultorio-2.webp", "Ambiente clínico da Dra. Sara Michelon"],
  ["clinica-entrada.webp", "Entrada da clínica da Dra. Sara Michelon nos Ingleses"],
] as const;

const mediaId = (src?: string) => src ? id("media", path.basename(src)) : null;
const mediaRef = (src?: string) => mediaId(src) ? ref(mediaId(src)!) : undefined;

function mapSection(section: ContentSection) {
  if (section._type === "richText") return {...section, _type: "richTextSection", content: blocks(section.body, section._key), body: undefined};
  if (section._type === "imageText") return {...section, _type: "imageTextSection", content: blocks(section.body, section._key), body: undefined, image: mediaRef(section.image), imageAlt: undefined};
  if (section._type === "steps") return {...section, _type: "stepsSection", items: section.items.map((item, index) => ({...item, _key: `${section._key}-${index + 1}`}))};
  if (section._type === "cardGrid") return {...section, _type: "cardGridSection", items: section.items.map((item, index) => ({...item, _key: `${section._key}-${index + 1}`}))};
  if (section._type === "comparison") return {...section, _type: "comparisonSection", columns: section.columns.map((column, index) => ({...column, _key: `${section._key}-${index + 1}`}))};
  if (section._type === "quote") return {...section, _type: "quoteSection"};
  if (section._type === "cta") return {...section, _type: "ctaSection"};
  return {...section, _type: "localBlockSection"};
}

async function findImageBuffer(filename: string): Promise<Buffer> {
  const imagesRoot = path.join(process.cwd(), "public", "images");

  async function search(dir: string): Promise<string | null> {
    const entries = await readdir(dir, {withFileTypes: true});
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = await search(fullPath);
        if (found) return found;
      } else if (entry.name === filename) {
        return fullPath;
      }
    }
    return null;
  }

  const filePath = await search(imagesRoot);
  if (!filePath) {
    throw new Error(`Imagem não encontrada no acervo: ${filename}`);
  }
  return readFile(filePath);
}

async function replace(document: Record<string, unknown>) {
  await client.createOrReplace(document as never);
  process.stdout.write(`✓ ${String(document._id)}\n`);
}

async function main() {
  for (const [filename, alt] of media) {
    const buffer = await findImageBuffer(filename);
    const asset = await client.assets.upload("image", buffer, {filename});
    await replace({_id: id("media", filename), _type: "mediaAsset", title: filename, alt, sourceType: "Própria", usageNotes: "Arquivo aprovado no acervo auditado da Fase 3.", asset: {_type: "image", asset: ref(asset._id)}});
  }

  const specialties = new Set([...Object.values(fallbackTreatments).map((item) => item.specialty), ...fallbackProfessionals.map((item) => item.role)]);
  let specialtyOrder = 0;
  for (const name of specialties) await replace({_id: id("specialty", slugify(name)), _type: "specialty", name, slug: {_type: "slug", current: slugify(name)}, order: specialtyOrder++});

  for (const [order, professional] of fallbackProfessionals.entries()) {
    await replace({_id: id("professional", professional.slug), _type: "professional", name: professional.name, slug: {_type: "slug", current: professional.slug}, portrait: mediaRef(professional.image), summary: professional.summary, order, bio: blocks(professional.bio, `${professional.slug}-bio`), specialties: [ref(id("specialty", slugify(professional.role)))], seo: professional.seo ? seo(professional.seo) : undefined, publishStatus: "published"});
  }

  const treatmentDocuments = [];
  for (const treatment of Object.values(fallbackTreatments)) {
    const faqRefs = [];
    for (const [index, item] of treatment.faq.entries()) {
      const faqId = id("faq", `${treatment.slug}-${index + 1}`);
      await replace({_id: faqId, _type: "faq", question: item.question, answer: blocks([item.answer], `${treatment.slug}-faq-${index + 1}`), scope: treatment.slug});
      faqRefs.push(ref(faqId));
    }
    const document = {_id: id("treatment", treatment.slug), _type: "treatment", title: treatment.title, slug: {_type: "slug", current: treatment.slug}, shortDescription: treatment.shortDescription, heroImage: mediaRef(treatment.heroImage), specialty: ref(id("specialty", slugify(treatment.specialty))), clinicalLead: treatment.clinicalLead ? ref(id("professional", treatment.clinicalLead.slug)) : undefined, variant: treatment.variant, contentSections: treatment.sections.map(mapSection), faq: faqRefs, aftercare: blocks(treatment.aftercare?.body, `${treatment.slug}-aftercare`), contentStatus: treatment.contentStatus, contentSource: treatment.source, relatedTreatments: treatment.relatedTreatments.map((item) => ref(id("treatment", item.href.slice(1)))), seo: seo(treatment.seo), publishStatus: "published"};
    treatmentDocuments.push(document);
    await replace({...document, relatedTreatments: []});
  }
  for (const document of treatmentDocuments) await replace(document);

  for (const page of Object.values(fallbackPages)) await replace({_id: id("page", page.slug), _type: "page", eyebrow: page.eyebrow, title: page.title, slug: {_type: "slug", current: page.slug}, description: page.description, heroImage: mediaRef(page.image), contentSections: page.sections?.map(mapSection), linkGroups: page.linkGroups?.map((group, groupIndex) => ({...group, _key: `${page.slug}-group-${groupIndex + 1}`, items: group.items.map((item, itemIndex) => ({...item, _key: `${page.slug}-link-${groupIndex + 1}-${itemIndex + 1}`}))})), seo: seo(page.seo), publishStatus: "published"});

  for (const landing of Object.values(fallbackLandingPages)) {
    const faqRefs = [];
    for (const [index, item] of landing.faq.entries()) {
      const faqId = id("faq", `${landing.slug}-${index + 1}`);
      await replace({_id: faqId, _type: "faq", question: item.question, answer: blocks([item.answer], `${landing.slug}-faq-${index + 1}`), scope: landing.slug});
      faqRefs.push(ref(faqId));
    }
    await replace({_id: id("landing", landing.slug), _type: "landingPage", eyebrow: landing.eyebrow, title: landing.title, slug: {_type: "slug", current: landing.slug}, description: landing.description, heroImage: mediaRef(landing.image), contentSections: landing.sections.map(mapSection), faq: faqRefs, ctaLabel: landing.ctaLabel, seo: seo(landing.seo), publishStatus: "published"});
  }

  const categories = new Set(Object.values(fallbackArticles).flatMap((article) => article.categories));
  for (const name of categories) await replace({_id: id("category", slugify(name)), _type: "category", name, slug: {_type: "slug", current: slugify(name)}, index: false});
  for (const article of Object.values(fallbackArticles)) await replace({_id: id("article", article.slug), _type: "article", title: article.title, slug: {_type: "slug", current: article.slug}, routePath: article.path, excerpt: article.excerpt, contentSections: article.sections.map(mapSection), author: ref(id("professional", article.author.slug)), reviewer: article.reviewer ? ref(id("professional", article.reviewer.slug)) : undefined, publishedAt: article.publishedAt, updatedAt: article.updatedAt, categories: article.categories.map((name) => ref(id("category", slugify(name)))), relatedTreatments: article.relatedTreatments.map((item) => ref(id("treatment", item.href.slice(1)))), seo: seo(article.seo), publishStatus: "published"});

  await replace({_id: "site-settings", _type: "siteSettings", ...fallbackSiteSettings, phones: fallbackSiteSettings.phone ? [fallbackSiteSettings.phone] : [], address: fallbackSiteSettings.streetAddress ? {street: fallbackSiteSettings.streetAddress} : undefined, phone: undefined});
  process.stdout.write(`\nSeed concluído no dataset ${dataset}: ${media.length} mídias, ${fallbackProfessionals.length} profissionais, ${Object.keys(fallbackTreatments).length} tratamentos, ${Object.keys(fallbackPages).length} páginas e ${Object.keys(fallbackArticles).length} artigos.\n`);
}

main().catch((error) => {console.error(error); process.exitCode = 1;});
