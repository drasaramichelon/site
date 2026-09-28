import {ButtonLink, Container, Eyebrow, Heading, Section} from "@/components/design-system";

export default function NotFound() {
  return <Section className="min-h-[65vh] bg-[var(--color-pink)]"><Container><Eyebrow>Erro 404</Eyebrow><Heading as="h1">Não encontramos esta página</Heading><p className="mt-6 max-w-xl leading-7 text-[var(--color-muted)]">Confira o endereço informado ou volte ao início para navegar pelos tratamentos e conteúdos clínicos.</p><div className="mt-9"><ButtonLink href="/" variant="secondary" event="page_view">Ir para o início</ButtonLink></div></Container></Section>;
}
