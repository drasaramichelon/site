import {defineArrayMember, defineField, defineType} from "sanity";

const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.max(65)}),
    defineField({name: "description", title: "Meta description", type: "text", rows: 3, validation: (rule) => rule.max(160)}),
    defineField({name: "canonical", title: "Canonical", type: "string", description: "Use uma URL absoluta ou o caminho iniciado por /."}),
    defineField({name: "index", title: "Permitir indexação", type: "boolean", initialValue: true}),
    defineField({name: "ogImage", title: "Imagem social", type: "reference", to: [{type: "mediaAsset"}]}),
  ],
});

const blockFields = [
  defineField({name: "heading", title: "Título da seção", type: "string"}),
  defineField({name: "anchor", title: "Âncora", type: "slug", options: {source: "heading"}}),
];

const richTextSection = defineType({
  name: "richTextSection",
  title: "Texto",
  type: "object",
  fields: [...blockFields, defineField({name: "content", title: "Conteúdo", type: "array", of: [{type: "block"}], validation: (rule) => rule.required()})],
  preview: {select: {title: "heading"}, prepare: ({title}) => ({title: title || "Texto"})},
});

const imageSection = defineType({
  name: "imageSection",
  title: "Imagem",
  type: "object",
  fields: [...blockFields, defineField({name: "image", title: "Imagem", type: "reference", to: [{type: "mediaAsset"}], validation: (rule) => rule.required()})],
});

const imageTextSection = defineType({
  name: "imageTextSection",
  title: "Imagem + texto",
  type: "object",
  fields: [
    ...blockFields,
    defineField({name: "image", title: "Imagem", type: "reference", to: [{type: "mediaAsset"}], validation: (rule) => rule.required()}),
    defineField({name: "imagePosition", title: "Posição", type: "string", options: {list: [{title: "Esquerda", value: "left"}, {title: "Direita", value: "right"}]}, initialValue: "left"}),
    defineField({name: "content", title: "Conteúdo", type: "array", of: [{type: "block"}], validation: (rule) => rule.required()}),
  ],
});

const stepsSection = defineType({
  name: "stepsSection",
  title: "Etapas",
  type: "object",
  fields: [
    ...blockFields,
    defineField({name: "items", title: "Etapas", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}), defineField({name: "text", title: "Texto", type: "text", rows: 3, validation: (rule) => rule.required()})]})], validation: (rule) => rule.min(2)}),
  ],
});

const cardGridSection = defineType({
  name: "cardGridSection",
  title: "Grade de cards",
  type: "object",
  fields: [
    ...blockFields,
    defineField({name: "items", title: "Cards", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}), defineField({name: "text", title: "Texto", type: "text", rows: 3, validation: (rule) => rule.required()}), defineField({name: "href", title: "Link interno", type: "string"})]})]}),
  ],
});

const comparisonSection = defineType({
  name: "comparisonSection",
  title: "Comparação",
  type: "object",
  fields: [
    ...blockFields,
    defineField({name: "columns", title: "Colunas", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "title", title: "Título", type: "string"}), defineField({name: "items", title: "Itens", type: "array", of: [{type: "string"}]})]})], validation: (rule) => rule.min(2).max(3)}),
  ],
});

const clinicalCaseSection = defineType({
  name: "clinicalCaseSection",
  title: "Caso clínico",
  type: "object",
  fields: [
    ...blockFields,
    defineField({name: "summary", title: "Resumo clínico", type: "text", rows: 4}),
    defineField({name: "consentConfirmed", title: "Consentimento confirmado", type: "boolean", initialValue: false, validation: (rule) => rule.required().custom((value) => value === true || "Confirme o consentimento antes de publicar")}),
    defineField({name: "images", title: "Imagens", type: "array", of: [{type: "reference", to: [{type: "mediaAsset"}]}]}),
  ],
});

const quoteSection = defineType({
  name: "quoteSection",
  title: "Citação",
  type: "object",
  fields: [defineField({name: "quote", title: "Citação", type: "text", rows: 3, validation: (rule) => rule.required()}), defineField({name: "attribution", title: "Atribuição", type: "string"})],
});

const ctaSection = defineType({
  name: "ctaSection",
  title: "Chamada para ação",
  type: "object",
  fields: [...blockFields, defineField({name: "text", title: "Texto", type: "text", rows: 3}), defineField({name: "label", title: "Rótulo do botão", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Destino", type: "string", validation: (rule) => rule.required()})],
});

const relatedTreatmentsSection = defineType({
  name: "relatedTreatmentsSection",
  title: "Tratamentos relacionados",
  type: "object",
  fields: [...blockFields, defineField({name: "treatments", title: "Tratamentos", type: "array", of: [{type: "reference", to: [{type: "treatment"}]}]})],
});

const localBlockSection = defineType({
  name: "localBlockSection",
  title: "Bloco local",
  type: "object",
  fields: blockFields,
});

const contentSections = [
  defineArrayMember({type: "richTextSection"}),
  defineArrayMember({type: "imageSection"}),
  defineArrayMember({type: "imageTextSection"}),
  defineArrayMember({type: "stepsSection"}),
  defineArrayMember({type: "cardGridSection"}),
  defineArrayMember({type: "comparisonSection"}),
  defineArrayMember({type: "clinicalCaseSection"}),
  defineArrayMember({type: "quoteSection"}),
  defineArrayMember({type: "ctaSection"}),
  defineArrayMember({type: "relatedTreatmentsSection"}),
  defineArrayMember({type: "localBlockSection"}),
];

const specialty = defineType({
  name: "specialty",
  title: "Especialidade",
  type: "document",
  fields: [defineField({name: "name", title: "Nome", type: "string", validation: (rule) => rule.required()}), defineField({name: "slug", title: "Slug", type: "slug", options: {source: "name"}, validation: (rule) => rule.required()}), defineField({name: "description", title: "Descrição", type: "text"}), defineField({name: "order", title: "Ordem", type: "number"}), defineField({name: "featuredTreatments", title: "Tratamentos em destaque", type: "array", of: [{type: "reference", to: [{type: "treatment"}]}]}), defineField({name: "seo", title: "SEO", type: "seo"})],
});

const professional = defineType({
  name: "professional",
  title: "Profissional",
  type: "document",
  fields: [
    defineField({name: "name", title: "Nome", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "name"}, validation: (rule) => rule.required()}),
    defineField({name: "portrait", title: "Retrato", type: "reference", to: [{type: "mediaAsset"}]}),
    defineField({name: "summary", title: "Resumo de autoridade", type: "text", rows: 3}),
    defineField({name: "order", title: "Ordem", type: "number"}),
    defineField({name: "cro", title: "CRO", type: "string", description: "Publicar somente após validação documental."}),
    defineField({name: "bio", title: "Biografia", type: "array", of: [{type: "block"}]}),
    defineField({name: "credentials", title: "Credenciais confirmadas", type: "array", of: [{type: "string"}]}),
    defineField({name: "specialties", title: "Especialidades", type: "array", of: [{type: "reference", to: [{type: "specialty"}]}]}),
    defineField({name: "relatedTreatments", title: "Tratamentos", type: "array", of: [{type: "reference", to: [{type: "treatment"}]}]}),
    defineField({name: "seo", title: "SEO", type: "seo"}),
    defineField({name: "publishStatus", title: "Status", type: "string", options: {list: [{title: "Rascunho", value: "draft"}, {title: "Publicado", value: "published"}]}, initialValue: "draft", validation: (rule) => rule.required()}),
  ],
});

const reusableFaq = defineType({
  name: "faq",
  title: "Pergunta frequente",
  type: "document",
  fields: [defineField({name: "question", title: "Pergunta", type: "string", validation: (rule) => rule.required()}), defineField({name: "answer", title: "Resposta", type: "array", of: [{type: "block"}], validation: (rule) => rule.required()}), defineField({name: "scope", title: "Escopo", type: "string"})],
});

const treatment = defineType({
  name: "treatment",
  title: "Tratamento",
  type: "document",
  groups: [{name: "content", title: "Conteúdo", default: true}, {name: "relationships", title: "Relações"}, {name: "search", title: "SEO e publicação"}],
  fields: [
    defineField({name: "title", title: "Título", type: "string", group: "content", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", group: "search", options: {source: "title"}, validation: (rule) => rule.required()}),
    defineField({name: "shortDescription", title: "Descrição curta", type: "text", rows: 3, group: "content", validation: (rule) => rule.required()}),
    defineField({name: "heroImage", title: "Imagem principal", type: "reference", to: [{type: "mediaAsset"}], group: "content"}),
    defineField({name: "specialty", title: "Especialidade", type: "reference", to: [{type: "specialty"}], group: "relationships", validation: (rule) => rule.required()}),
    defineField({name: "clinicalLead", title: "Responsável clínico", type: "reference", to: [{type: "professional"}], group: "relationships"}),
    defineField({name: "variant", title: "Composição visual", type: "string", group: "content", options: {list: [{title: "Imagem e comparação", value: "image-led"}, {title: "Processo", value: "process"}, {title: "Entrada por sintomas", value: "symptom-led"}, {title: "Hub narrativo", value: "hub"}, {title: "Editorial", value: "editorial"}]}, initialValue: "editorial"}),
    defineField({name: "contentSections", title: "Seções", type: "array", of: contentSections, group: "content"}),
    defineField({name: "faq", title: "Perguntas frequentes", type: "array", of: [{type: "reference", to: [{type: "faq"}]}], group: "content"}),
    defineField({name: "aftercare", title: "Acompanhamento e cuidados", type: "array", of: [{type: "block"}], group: "content"}),
    defineField({name: "contentStatus", title: "Maturidade do conteúdo", type: "string", group: "search", options: {list: [{title: "Conteúdo clínico final", value: "final"}, {title: "Conteúdo parcial", value: "partial"}]}, initialValue: "final", validation: (rule) => rule.required()}),
    defineField({name: "contentSource", title: "Fonte editorial", type: "string", group: "search", options: {list: [{title: "DOCX clínico", value: "docx-clinical"}, {title: "Matriz Mestra", value: "matrix-supported"}]}, validation: (rule) => rule.required()}),
    defineField({name: "gallery", title: "Galeria", type: "array", of: [{type: "reference", to: [{type: "mediaAsset"}]}], group: "content"}),
    defineField({name: "relatedTreatments", title: "Relacionados", type: "array", of: [{type: "reference", to: [{type: "treatment"}]}], group: "relationships"}),
    defineField({name: "seo", title: "SEO", type: "seo", group: "search"}),
    defineField({name: "publishStatus", title: "Status", type: "string", group: "search", options: {list: [{title: "Rascunho", value: "draft"}, {title: "Revisão clínica", value: "clinicalReview"}, {title: "Publicado", value: "published"}]}, initialValue: "draft", validation: (rule) => rule.required()}),
  ],
});

const category = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  fields: [defineField({name: "name", title: "Nome", type: "string", validation: (rule) => rule.required()}), defineField({name: "slug", title: "Slug", type: "slug", options: {source: "name"}, validation: (rule) => rule.required()}), defineField({name: "description", title: "Descrição", type: "text"}), defineField({name: "index", title: "Permitir indexação", type: "boolean", initialValue: false})],
});

const article = defineType({
  name: "article",
  title: "Artigo",
  type: "document",
  fields: [defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}), defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title"}, validation: (rule) => rule.required()}), defineField({name: "routePath", title: "Caminho público", type: "string", description: "Use /conteudos/slug. Apenas a URL histórica aprovada permanece na raiz.", validation: (rule) => rule.required().regex(/^\//)}), defineField({name: "excerpt", title: "Resumo", type: "text"}), defineField({name: "contentSections", title: "Conteúdo", type: "array", of: contentSections}), defineField({name: "author", title: "Autor", type: "reference", to: [{type: "professional"}], validation: (rule) => rule.required()}), defineField({name: "reviewer", title: "Revisor clínico", type: "reference", to: [{type: "professional"}]}), defineField({name: "publishedAt", title: "Publicado em", type: "datetime"}), defineField({name: "updatedAt", title: "Atualizado em", type: "datetime"}), defineField({name: "sources", title: "Fontes", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "title", title: "Título", type: "string"}), defineField({name: "url", title: "URL", type: "url"})]})]}), defineField({name: "categories", title: "Categorias", type: "array", of: [{type: "reference", to: [{type: "category"}]}]}), defineField({name: "relatedTreatments", title: "Tratamentos relacionados", type: "array", of: [{type: "reference", to: [{type: "treatment"}]}]}), defineField({name: "seo", title: "SEO", type: "seo"}), defineField({name: "publishStatus", title: "Status", type: "string", options: {list: [{title: "Rascunho", value: "draft"}, {title: "Revisão clínica", value: "clinicalReview"}, {title: "Publicado", value: "published"}]}, initialValue: "draft", validation: (rule) => rule.required()})],
});

const page = defineType({
  name: "page",
  title: "Página",
  type: "document",
  fields: [defineField({name: "eyebrow", title: "Categoria curta", type: "string"}), defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}), defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title"}, validation: (rule) => rule.required()}), defineField({name: "description", title: "Descrição", type: "text", rows: 3, validation: (rule) => rule.required()}), defineField({name: "heroImage", title: "Imagem principal", type: "reference", to: [{type: "mediaAsset"}]}), defineField({name: "contentSections", title: "Seções", type: "array", of: contentSections}), defineField({name: "linkGroups", title: "Grupos de links", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}), defineField({name: "items", title: "Links", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}), defineField({name: "href", title: "Destino", type: "string", validation: (rule) => rule.required()}), defineField({name: "description", title: "Descrição", type: "text"})]})]})]})]}), defineField({name: "seo", title: "SEO", type: "seo"}), defineField({name: "publishStatus", title: "Status", type: "string", options: {list: [{title: "Rascunho", value: "draft"}, {title: "Publicado", value: "published"}]}, initialValue: "draft", validation: (rule) => rule.required()})],
});

const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  fields: [defineField({name: "eyebrow", title: "Categoria curta", type: "string"}), defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}), defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title"}, validation: (rule) => rule.required()}), defineField({name: "description", title: "Descrição", type: "text", rows: 3, validation: (rule) => rule.required()}), defineField({name: "heroImage", title: "Imagem principal", type: "reference", to: [{type: "mediaAsset"}]}), defineField({name: "contentSections", title: "Seções", type: "array", of: contentSections}), defineField({name: "faq", title: "Perguntas frequentes", type: "array", of: [{type: "reference", to: [{type: "faq"}]}]}), defineField({name: "ctaLabel", title: "CTA", type: "string"}), defineField({name: "seo", title: "SEO", type: "seo", initialValue: {index: false}}), defineField({name: "publishStatus", title: "Status", type: "string", options: {list: [{title: "Rascunho", value: "draft"}, {title: "Publicado", value: "published"}]}, initialValue: "draft", validation: (rule) => rule.required()})],
});

const mediaAsset = defineType({
  name: "mediaAsset",
  title: "Mídia",
  type: "document",
  fields: [defineField({name: "title", title: "Nome interno", type: "string", validation: (rule) => rule.required()}), defineField({name: "asset", title: "Arquivo", type: "image", options: {hotspot: true}, validation: (rule) => rule.required()}), defineField({name: "alt", title: "Texto alternativo", type: "string", validation: (rule) => rule.required()}), defineField({name: "caption", title: "Legenda", type: "string"}), defineField({name: "sourceType", title: "Origem", type: "string", options: {list: ["Própria", "Licenciada", "Legado"]}, validation: (rule) => rule.required()}), defineField({name: "license", title: "Licença / autorização", type: "string"}), defineField({name: "credit", title: "Crédito", type: "string"}), defineField({name: "usageNotes", title: "Notas de uso", type: "text"})],
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  fields: [
    defineField({name: "clinicName", title: "Nome da clínica", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "legalName", title: "Nome institucional", type: "string"}),
    defineField({name: "siteUrl", title: "URL do site", type: "url"}),
    defineField({name: "locality", title: "Localidade resumida", type: "string", description: "Ex.: Ingleses, Florianópolis — SC"}),
    defineField({name: "region", title: "Região de atendimento", type: "string"}),
    defineField({name: "phones", title: "Telefones", type: "array", of: [{type: "string"}]}),
    defineField({name: "whatsapp", title: "WhatsApp", type: "string"}),
    defineField({name: "email", title: "E-mail", type: "string"}),
    defineField({name: "address", title: "Endereço", type: "object", fields: [defineField({name: "street", title: "Logradouro", type: "string"}), defineField({name: "district", title: "Bairro", type: "string"}), defineField({name: "city", title: "Cidade", type: "string"}), defineField({name: "region", title: "Estado", type: "string"}), defineField({name: "postalCode", title: "CEP", type: "string"})]}),
    defineField({name: "geo", title: "Coordenadas", type: "geopoint"}),
    defineField({name: "openingHours", title: "Horários", type: "array", of: [{type: "string"}]}),
    defineField({name: "socialLinks", title: "Redes sociais", type: "array", of: [{type: "url"}]}),
    defineField({name: "footerLinks", title: "Links do rodapé", type: "array", of: [defineArrayMember({type: "object", fields: [defineField({name: "label", title: "Rótulo", type: "string"}), defineField({name: "href", title: "Destino", type: "string"})]})]}),
    defineField({name: "defaultSeo", title: "SEO padrão", type: "seo"}),
    defineField({
      name: "trackingIds",
      title: "IDs de tracking",
      type: "object",
      fields: [
        defineField({name: "ga4", title: "GA4 Measurement ID (G-XXXX)", type: "string"}),
        defineField({name: "gtm", title: "GTM Container ID (GTM-XXXX)", type: "string"}),
        defineField({name: "googleAds", title: "Google Ads Tag ID (AW-XXXX)", type: "string"}),
        defineField({name: "googleAdsConversionLabel", title: "Google Ads Conversion Label (ex: AbCdEfGhIjK)", type: "string"}),
        defineField({name: "metaPixel", title: "Meta Pixel ID (Facebook)", type: "string"}),
        defineField({name: "clarity", title: "Microsoft Clarity Project ID", type: "string"}),
      ],
    }),
  ],
});

const testimonial = defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({name: "personName", title: "Nome do paciente", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "text", title: "Depoimento", type: "text", rows: 4, validation: (rule) => rule.required()}),
    defineField({name: "source", title: "Origem", type: "string", options: {list: ["Google Avaliações", "WhatsApp", "Relato Clínico", "Outro"]}, initialValue: "Google Avaliações"}),
    defineField({name: "authorization", title: "Autorização de uso confirmada", type: "boolean", initialValue: false, validation: (rule) => rule.required().custom((value) => value === true || "Confirme a autorização antes de publicar")}),
    defineField({name: "date", title: "Data", type: "date"}),
  ],
});

export const schemaTypes = [seo, richTextSection, imageSection, imageTextSection, stepsSection, cardGridSection, comparisonSection, clinicalCaseSection, quoteSection, ctaSection, relatedTreatmentsSection, localBlockSection, treatment, specialty, professional, article, category, reusableFaq, page, landingPage, siteSettings, mediaAsset, testimonial];
