# Site Dra. Sara Michelon

Site institucional em Next.js com conteúdo estruturado no Sanity e fallback editorial versionado. A mesma base em `lib/content/fallback.ts` alimenta a aplicação sem CMS e o seed idempotente, evitando divergência entre a primeira publicação e o conteúdo administrável.

## Fontes editoriais da Fase 3

- `Docs/Matriz_Mestra_Site_Dra_Sara_Michelon_v4.xlsx`: arquitetura, URLs, H1, titles, descriptions e indexação.
- `Docs/site novo 2026 (1).docx`: conteúdo clínico aprovado.
- `Docs/Auditoria_Acervo_Site_Dra_Sara.xlsx`: imagens próprias aprovadas e regras de uso.

Há 26 páginas de tratamento. Vinte têm conteúdo final apoiado no DOCX. Permanecem marcadas como `partial` e `matrix-supported`: limpeza dental, próteses dentárias, clareamento dental, inlays/onlays, fechamento de diastemas e bichectomia. Esse estado é editorial no CMS; não aparece como placeholder público.

## Ambiente

Copie `.env.example` para `.env.local` e preencha somente valores confirmados. O site funciona sem Sanity e sem analytics; nenhuma identificação fictícia é usada.

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` e `NEXT_PUBLIC_SANITY_API_VERSION`: leitura do conteúdo publicado.
- `SANITY_API_READ_TOKEN`: opcional para dataset privado.
- `SANITY_API_WRITE_TOKEN`: somente para executar o seed; nunca deve ser exposto no navegador ou versionado.
- `SANITY_REVALIDATE_SECRET`: protege a rota de revalidação.
- `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID` e `NEXT_PUBLIC_GOOGLE_ADS_ID`: opcionais. Sem IDs, o componente não exibe banner nem envia eventos. Com IDs, scripts só são carregados após consentimento.

## Desenvolvimento e validação

```powershell
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm start
pnpm qa:content
```

`qa:content` verifica status HTTP, um H1 por página, title, meta description, canonical, robots, imagens sem alt, links internos quebrados, páginas indexáveis órfãs e as rotas que precisam responder 404. Para outro host:

```powershell
pnpm qa:content -- https://endereco-do-ambiente
```

## Seed idempotente do Sanity

O seed usa IDs estáveis e `createOrReplace`. Pode ser repetido no mesmo dataset sem duplicar documentos. As imagens auditadas são enviadas do diretório `public/images`; o Sanity deduplica assets pelo conteúdo e os documentos de mídia mantêm IDs estáveis.

1. Crie ou selecione o projeto e o dataset no Sanity.
2. Gere um token com permissão de escrita e configure `SANITY_API_WRITE_TOKEN` apenas no ambiente local seguro.
3. Execute:

```powershell
pnpm seed:sanity
pnpm sanity
```

4. No Studio, confira `Maturidade do conteúdo`, `Fonte editorial`, autoria/revisão, relacionamentos, SEO e estado de publicação.
5. Publique somente após a revisão clínica final. O seed não inclui CROs, contato, horários ou casos clínicos sem documentação confirmada.

O seed cria configurações, especialidades, profissionais, FAQs, tratamentos, páginas institucionais e legais, landing page, categorias, artigos e documentos de mídia. Credenciais, contatos, casos clínicos, IDs de analytics e infraestrutura permanecem fora do código até confirmação.

## Publicação

Antes do deploy, execute lint, typecheck, build e `qa:content` contra o build de produção. Depois da configuração do domínio, valide sitemap, robots, canonical, consentimento, Search Console e Google Business Profile no ambiente real.
