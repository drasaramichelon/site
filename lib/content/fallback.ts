import type { Article, ContentSection, InstitutionalPage, LandingPage, NavigationItem, Professional, SiteSettings, SupportStaff, Treatment, TreatmentVariant } from "@/lib/content/types";

export const fallbackSiteSettings: SiteSettings = {
  clinicName: "Dra. Sara Michelon",
  legalName: "Dra. Sara Michelon — Odontologia e Estética",
  locality: "Ingleses, Florianópolis — SC",
  region: "Norte da Ilha",
  phone: "(48) 98506-3001",
  whatsapp: "(48) 98506-3001",
  commercialPhone: "(48) 99181-6291",
  email: "odontoestetica.net@gmail.com",
  streetAddress: "SC-403, 6201 - 218 - Ingleses Norte, Florianópolis - SC, 88058-001",
  openingHours: ["Segunda a Sexta: 09:00 às 12:00 e 14:00 às 19:00"],
  geo: { latitude: -27.4373, longitude: -48.3998 },
  socialLinks: [
    "https://www.instagram.com/drasaramichelon",
    "https://www.facebook.com/odontoesteticadrasara",
  ],
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0)
    ? process.env.NEXT_PUBLIC_SITE_URL.trim()
    : "https://odontoestetica.net",
  trackingIds: {
    ga4: process.env.NEXT_PUBLIC_GA4_ID ?? null,
    gtm: process.env.NEXT_PUBLIC_GTM_ID ?? null,
    googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? null,
    googleAdsConversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? null,
    metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? null,
    clarity: process.env.NEXT_PUBLIC_CLARITY_ID ?? null,
  },
};

export const fallbackProfessionals: Professional[] = [
  {
    name: "Dra. Sara Michelon",
    slug: "dra-sara-michelon",
    role: "Odontologia Estética e Estética Orofacial",
    cro: "CRO-SC 10632",
    graduation: "Graduada em 2003",
    graduationYear: 2003,
    qualifications: [
      "Especialista em Dentística Restauradora (Odontologia Estética) desde 2005",
      "Especialista em Endodontia desde 2007",
      "Especialista em Ortodontia desde 2012",
      "Harmonização Facial desde 2015",
    ],
    image: "/images/real/sara/sara-card-profile-33.webp",
    summary: "A experiência em diferentes áreas da Odontologia permite avaliar cada caso de forma mais ampla, considerando saúde, função, sorriso e face antes de definir qualquer tratamento.",
    profileHref: "/dra-sara-michelon",
    bio: [
      "Com mais de 20 anos de experiência clínica, a Dra. Sara Michelon (CRO-SC 10632) graduou-se em 2003 e construiu uma formação sólida e multidisciplinar: especialista em Dentística Restauradora (Odontologia Estética) desde 2005, especialista em Endodontia desde 2007, especialista em Ortodontia desde 2012 e atuando em Harmonização Facial desde 2015.",
      "Sua abordagem clínica integra saúde bucal, função mastigatória, estética do sorriso e harmonia facial em um planejamento individual e conservador.",
    ],
  },
  {
    name: "Dr. Ericson Pessanha",
    slug: "dr-ericson-pessanha",
    role: "Periodontia e Cirurgia Oral",
    cro: "CRO-SC 10329",
    graduation: "Graduado em 2004",
    graduationYear: 2004,
    qualifications: [
      "Especialista em Periodontia",
      "Aperfeiçoamento em Cirurgia Oral Menor",
    ],
    image: "/images/dr-ericson.webp",
    summary: "Graduado em 2004 com mais de 20 anos de experiência, é especialista em Periodontia com aperfeiçoamento em Cirurgia Oral Menor.",
    profileHref: "/equipe/dr-ericson-pessanha",
    bio: [
      "Com mais de 20 anos de experiência clínica, o Dr. Ericson Pessanha (CRO-SC 10329) graduou-se em 2004 e especializou-se em Periodontia, além de aperfeiçoamento em Cirurgia Oral Menor.",
      "Na equipe da Dra. Sara Michelon, sua atuação conecta a saúde dos tecidos periodontais e os procedimentos cirúrgicos ao planejamento global do tratamento odontológico.",
    ],
    seo: {
      title: "Dr. Ericson Pessanha | Periodontia e Cirurgia Oral",
      description: "Conheça a atuação clínica do Dr. Ericson Pessanha em periodontia e cirurgia oral na equipe da Dra. Sara Michelon.",
      canonical: "/equipe/dr-ericson-pessanha",
      index: true,
    },
  },
  {
    name: "Dra. Camila Cecchin",
    slug: "dra-camila-cecchin",
    role: "Implantodontia e Periodontia",
    cro: "CRO-SC 13398",
    graduation: "Graduada em 2013",
    graduationYear: 2013,
    qualifications: [
      "Especialista em Implantodontia",
      "Cirurgia Plástica Periodontal e Periimplantar",
      "Capacitação em Laserterapia",
    ],
    image: "/images/dra-camila.webp",
    summary: "Graduada em 2013, é especialista em Implantodontia com atuação em Cirurgia Plástica Periodontal e Periimplantar e Laserterapia.",
    profileHref: "/equipe/dra-camila-cecchin",
    bio: [
      "Graduada em 2013, a Dra. Camila Cecchin (CRO-SC 13398) é especialista em Implantodontia e atua com Cirurgia Plástica Periodontal e Periimplantar, além de contar com capacitação em Laserterapia.",
      "Na equipe, sua atuação conecta saúde periodontal, disponibilidade óssea e planejamento protético para organizar as etapas da reabilitação oral sobre implantes.",
    ],
    seo: {
      title: "Dra. Camila Cecchin | Implantodontia e Periodontia",
      description: "Conheça a atuação clínica da Dra. Camila Cecchin em implantodontia e periodontia na equipe da Dra. Sara Michelon.",
      canonical: "/equipe/dra-camila-cecchin",
      index: true,
    },
  },
  {
    name: "Dra. Maria Clara Paranhos Hoelscher",
    slug: "dra-maria-clara",
    role: "Endodontia",
    cro: "CRO-SC 17801",
    graduation: "Graduação pela UFSM-RS",
    qualifications: [
      "Especialista em Endodontia",
    ],
    image: "/images/dra-maria-clara.webp",
    summary: "Graduada pela UFSM-RS e especialista em Endodontia, com atuação em diagnóstico e tratamento endodôntico integrado.",
    profileHref: "/equipe/dra-maria-clara",
    bio: [
      "Com graduação pela Universidade Federal de Santa Maria (UFSM-RS), a Dra. Maria Clara (CRO-SC 17801) é especialista em Endodontia.",
      "Na equipe, sua atuação conecta o diagnóstico da dor à preservação e desinfecção dos canais radiculares dentro do planejamento reabilitador conservador.",
    ],
    seo: {
      title: "Dra. Maria Clara | Endodontia em Florianópolis",
      description: "Conheça a atuação clínica da Dra. Maria Clara em endodontia na equipe da Dra. Sara Michelon.",
      canonical: "/equipe/dra-maria-clara",
      index: true,
    },
  },
];

export const fallbackSupportStaff: SupportStaff[] = [
  {
    name: "Thaise Fleischmann",
    role: "Recepção e Atendimento ao Paciente",
    registrations: [
      "CRO/SC-ASB: 04692 (Auxiliar de Saúde Bucal)",
      "COREN-SC: 002.098.032 (Técnica em Enfermagem)",
    ],
    image: "/images/real/equipe/thaise-recepcao.webp",
    description: "Responsável pelo acolhimento inicial, organização dos atendimentos e suporte ao paciente com formação técnica em enfermagem e saúde bucal.",
  },
  {
    name: "Cassiane",
    role: "Auxiliar de Saúde Bucal (ASB)",
    registrations: [
      "CRO-SC: 06457 (Auxiliar de Saúde Bucal)",
    ],
    image: "/images/real/equipe/cassiane-asb.webp",
    description: "Atuação no suporte direto aos procedimentos clínicos e cirúrgicos, rigor em protocolos de biossegurança e organização do consultório.",
  },
];

const professionalBySlug = Object.fromEntries(fallbackProfessionals.map((professional) => [professional.slug, professional]));

export const fallbackNavigation: NavigationItem[] = [
  { label: "Início", href: "/" },
  {
    label: "Odontologia",
    href: "/odontologia",
    groups: [
      { label: "Estética do sorriso", items: [{ label: "Facetas de resina", href: "/facetas-de-resina" }, { label: "Lentes e facetas de porcelana", href: "/lentes-de-contato-dental" }, { label: "Clareamento dental", href: "/clareamento-dental" }, { label: "Fechamento de diastemas", href: "/fechamento-de-diastemas" }] },
      { label: "Implantes e reabilitação", items: [{ label: "Implantes dentários", href: "/implantes-dentarios" }, { label: "Prótese protocolo", href: "/protese-protocolo" }, { label: "Enxerto ósseo", href: "/enxerto-osseo-dentario" }, { label: "Próteses dentárias", href: "/proteses-dentarias" }, { label: "Inlays e onlays", href: "/inlays-onlays" }, { label: "Reabilitação oral", href: "/reabilitacao-oral" }] },
      { label: "Ortodontia", items: [{ label: "Aparelhos e alinhadores", href: "/ortodontia" }, { label: "Invisalign", href: "/invisalign" }] },
      { label: "Saúde bucal e gengiva", items: [{ label: "Manutenção odontológica", href: "/manutencao-odontologica" }, { label: "Limpeza dental", href: "/limpeza-dental" }, { label: "Periodontia", href: "/periodontia" }, { label: "Cirurgia gengival", href: "/cirurgia-gengival" }, { label: "Tratamento de canal", href: "/tratamento-de-canal" }, { label: "Extração de siso", href: "/extracao-de-siso" }, { label: "Bruxismo e DTM", href: "/bruxismo" }] },
    ],
  },
  {
    label: "Estética Orofacial",
    href: "/estetica-orofacial",
    groups: [{ label: "Planejamento facial", items: [{ label: "Harmonização facial", href: "/harmonizacao-facial" }, { label: "Preenchimento facial", href: "/preenchimento-facial" }, { label: "Preenchimento labial", href: "/preenchimento-labial" }, { label: "Botox e linhas de expressão", href: "/botox" }, { label: "Bioestimuladores de colágeno", href: "/bioestimuladores-de-colageno" }, { label: "Perfiloplastia", href: "/perfiloplastia" }] }],
  },
  { label: "A clínica", href: "/clinica" },
  { label: "Equipe", href: "/equipe" },
  { label: "Conteúdos", href: "/conteudos" },
  { label: "Contato", href: "/contato" },
];

type TreatmentSeed = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  specialty: string;
  variant: TreatmentVariant;
  lead: keyof typeof professionalBySlug;
  focusHeading: string;
  overview: string;
  introParagraphs?: string[];
  topicsHeading?: string;
  topics: { title: string; text: string; href?: string }[];
  stepsHeading?: string;
  steps?: { title: string; text: string }[];
  comparisonHeading?: string;
  comparison?: { title: string; items: string[] }[];
  faq: { question: string; answer: string }[];
  related: { title: string; href: string; description?: string }[];
  aftercareBody?: string[];
  aftercareHref?: string;
  aftercareLabel?: string;
  sections?: ContentSection[];
  contentStatus?: "final" | "partial";
  source?: "docx-clinical" | "matrix-supported";
};

function createSections(seed: TreatmentSeed): ContentSection[] {
  if (seed.sections && seed.sections.length > 0) {
    return seed.sections;
  }
  const intro: ContentSection = {
    _key: `${seed.slug}-overview`,
    _type: "richText",
    heading: seed.focusHeading,
    body: seed.introParagraphs ?? [
      seed.overview,
      "A avaliação reúne as condições clínicas, os objetivos e os limites do caso antes de definir a indicação e a sequência do cuidado.",
    ],
  };
  const cards: ContentSection = {
    _key: `${seed.slug}-focus`,
    _type: "cardGrid",
    heading: seed.topicsHeading ?? (seed.variant === "symptom-led" ? "O que merece avaliação" : "O que faz parte do planejamento"),
    items: seed.topics,
  };
  const steps: ContentSection = {
    _key: `${seed.slug}-steps`,
    _type: "steps",
    heading: seed.stepsHeading ?? (seed.variant === "process" ? "Como o cuidado é organizado" : "Da avaliação ao acompanhamento"),
    items: seed.steps ?? [
      { title: "Avaliação", text: "Histórico, necessidades e expectativas são considerados em conjunto." },
      { title: "Diagnóstico", text: "O exame define prioridades, relações clínicas e limites relevantes." },
      { title: "Indicação", text: "As possibilidades são discutidas de acordo com o caso, sem uma solução padronizada." },
      { title: "Acompanhamento", text: "Revisões e cuidados posteriores integram o planejamento." },
    ],
  };
  const comparison: ContentSection | null = seed.comparison
    ? {
      _key: `${seed.slug}-comparison`,
      _type: "comparison",
      heading: seed.comparisonHeading ?? "Possibilidades que precisam ser diferenciadas",
      columns: seed.comparison,
    }
    : null;
  const local: ContentSection = {
    _key: `${seed.slug}-local`,
    _type: "localBlock",
    heading: `${seed.title} nos Ingleses`,
  };

  if (seed.variant === "symptom-led") return [cards, intro, steps, local];
  if (seed.variant === "hub") return [intro, cards, steps, local];
  if (seed.variant === "image-led" && comparison) return [intro, comparison, cards, steps, local];
  if (seed.variant === "editorial") return [intro, cards, steps, local];
  return [intro, steps, cards, local];
}

function createTreatment(seed: TreatmentSeed): Treatment {
  const clinicalLead = professionalBySlug["dra-sara-michelon"];
  return {
    contentType: "treatment",
    title: seed.title,
    slug: seed.slug,
    eyebrow: seed.specialty,
    shortDescription: seed.description,
    heroImage: undefined,
    heroImageAlt: undefined,
    specialty: seed.specialty,
    variant: seed.variant,
    clinicalLead,
    seo: { title: seed.seoTitle, description: seed.seoDescription, canonical: `/${seed.slug}`, index: true },
    sections: createSections(seed),
    faq: seed.faq,
    relatedTreatments: seed.related,
    aftercare: {
      body: seed.aftercareBody ?? ["Revisões, higiene e orientações específicas fazem parte da continuidade do tratamento."],
      href: seed.aftercareHref ?? "/manutencao-odontologica",
      label: seed.aftercareLabel ?? "Conhecer a manutenção odontológica",
    },
    contentStatus: seed.contentStatus ?? "final",
    source: seed.source ?? "docx-clinical",
  };
}

const treatmentSeeds: TreatmentSeed[] = [
  {
    slug: "facetas-de-resina",
    title: "Facetas de Resina e Lentes em Resina",
    specialty: "Odontologia estética",
    variant: "image-led",
    lead: "dra-sara-michelon",
    description: "Mudanças no sorriso com abordagem conservadora, confeccionadas diretamente sobre os dentes e planejadas conforme mordida, gengiva e proporções faciais.",
    seoTitle: "Facetas de Resina em Florianópolis | Dra. Sara Michelon",
    seoDescription: "Facetas de resina em Florianópolis com planejamento individual e abordagem conservadora. Entenda desgaste, manutenção, duração e diferenças para porcelana.",
    focusHeading: "Preservação da estrutura dental e planejamento individual",
    overview: "As facetas e lentes em resina são confeccionadas diretamente sobre os dentes para modificar forma, proporção, comprimento e cor, além de possibilitar o fechamento de espaços e correção de pequenos desgastes. Dependendo da posição dos dentes e do espaço disponível, o tratamento pode ser realizado sem desgaste ou com ajustes mínimos.",
    introParagraphs: [
      "As facetas em resina, também conhecidas como lentes em resina composta, são confeccionadas diretamente sobre a estrutura dental, permitindo harmonizar forma, proporção, comprimento e cor dos dentes.",
      "São indicadas para fechamento de espaços (diastemas), reparo de desgastes e fraturas, assimetrias e determinadas correções estéticas de posicionamento.",
      "O grande diferencial da técnica é a preservação máxima da estrutura dental: a indicação de preparo mínimo ou ausência de desgaste é definida após avaliação minuciosa da mordida e do espaço disponível.",
    ],
    topicsHeading: "O que pode ser modificado com as facetas em resina",
    topics: [
      { title: "Forma, proporção e comprimento", text: "Harmonização de dentes pequenos, conoides ou com diferenças de proporção no arco do sorriso." },
      { title: "Espaços, desgastes e fraturas", text: "Fechamento de diastemas e reconstrução conservadora de bordas desgastadas ou lascadas." },
      { title: "Planejamento unitário ou múltiplo", text: "Não é obrigatório intervir em todos os dentes; tratamos desde um único dente até transformações estéticas completas." },
    ],
    stepsHeading: "Como é conduzido o tratamento",
    steps: [
      { title: "Avaliação integrada", text: "Exame clínico detalhado de dentes, gengiva, mordida e dinâmica do sorriso." },
      { title: "Planejamento prévio", text: "Uso de planejamento digital e guias quando indicado para precisão milimétrica das proporções." },
      { title: "Escultura direta", text: "Aplicação e estratificação artesanal da resina dente a dente, controlando anatomia e textura." },
      { title: "Acabamento e polimento", text: "Ajustes oclusais finos, polimento de alto brilho e orientações de cuidados preventivos." },
    ],
    comparisonHeading: "Facetas em resina ou porcelana?",
    comparison: [
      { title: "Facetas de resina", items: ["Confecção e escultura direta na clínica", "Abordagem altamente conservadora (com ou sem preparo)", "Possibilidade de reparos e modificações diretas", "Exige repolimentos e revisões periódicas"] },
      { title: "Facetas de porcelana", items: ["Material cerâmico com etapa laboratorial", "Simulação prévia com mock-up diretamente na boca", "Maior estabilidade de cor, brilho e textura a longo prazo", "Indicadas para desgastes severos e reabilitações amplas"] },
    ],
    faq: [
      { question: "Lentes em resina estragam os dentes?", answer: "Quando corretamente indicadas, preservam ao máximo a estrutura dental. Em muitos casos não há necessidade de desgaste; em outros, pequenos ajustes mínimos são realizados conforme a anatomia original e o planejamento." },
      { question: "Preciso colocar lentes em todos os dentes?", answer: "Não. O número de dentes tratados é individualizado. É possível intervir em apenas um dente isolado, em um grupo anterior ou em uma região maior do sorriso conforme o objetivo estético." },
      { question: "Facetas em resina mancham?", answer: "A resina composta pode sofrer alterações graduais de brilho e pigmentação superficial ao longo dos anos. Alimentação, hábitos, higiene e polimentos periódicos influenciam diretamente na manutenção da estética." },
      { question: "Quanto tempo duram as facetas em resina?", answer: "A longevidade depende da correta indicação, do equilíbrio da mordida, dos hábitos de mastigação e da assiduidade nas manutenções preventivas. A resina tem como grande benefício permitir repolimentos e reparos rápidos no consultório." },
      { question: "Resina ou porcelana: qual é melhor?", answer: "Nenhum material é universalmente superior. Resina e porcelana possuem indicações, características biológicas e manutenções distintas. A avaliação presencial define qual técnica é a mais adequada para o seu caso." },
    ],
    aftercareBody: [
      "As facetas em resina requerem acompanhamento periódico assim como os dentes naturais.",
      "Consultas de revisão para polimento superficial e checagem da mordida garantem a manutenção do brilho, da saúde gengival e da longevidade estética.",
    ],
    related: [
      { title: "Lentes e facetas de porcelana", href: "/lentes-de-contato-dental" },
      { title: "Ortodontia e alinhadores", href: "/ortodontia" },
      { title: "Cirurgia gengival", href: "/cirurgia-gengival" },
      { title: "Clareamento dental", href: "/clareamento-dental" },
    ],
  },
  {
    slug: "lentes-de-contato-dental",
    title: "Lentes de Contato Dental e Facetas de Porcelana",
    specialty: "Odontologia estética",
    variant: "image-led",
    lead: "dra-sara-michelon",
    description: "Planejamento digital, escaneamento intraoral e simulação com mock-up para transformações estéticas de alta precisão e estabilidade cerâmica.",
    seoTitle: "Lentes de Contato Dental e Facetas de Porcelana | Florianópolis",
    seoDescription: "Lentes de contato dental e facetas de porcelana em Florianópolis. Veja como funciona o planejamento, mock-up, preparo, manutenção e indicações.",
    focusHeading: "O planejamento digital precede a escolha do material cerâmico",
    overview: "As facetas e lentes de porcelana são peças cerâmicas confeccionadas individualmente para modificar forma, proporção, tamanho e cor dos dentes, além de integrarem reabilitações mais amplas. O tratamento une avaliação clínica, escaneamento intraoral e mock-up antes da confecção definitiva.",
    introParagraphs: [
      "As facetas e lentes de porcelana são peças cerâmicas confeccionadas laboratorialmente para modificar forma, proporção, tamanho e tonalidade dos dentes.",
      "São indicadas para dentes desgastados, perdas estruturais, alterações de cor resistentes ao clareamento, substituição de restaurações antigas ou reabilitações estético-funcionais mais extensas.",
      "O fluxo inicia com avaliação clínica e escaneamento digital, permitindo a realização de um teste provisório diretamente na boca (mock-up) antes de qualquer intervenção definitiva.",
    ],
    topicsHeading: "Quando a porcelana pode ser indicada",
    topics: [
      { title: "Estabilidade cerâmica prolongada", text: "Excelente preservação de cor, brilho e textura de superfície ao longo dos anos." },
      { title: "Visualização com mock-up", text: "Simulação prévia no próprio sorriso para aprovação do formato e proporções antes da confecção laboratorial." },
      { title: "Preparo dental conservador", text: "Ajuste milimétrico guiado para garantir adaptação marginal perfeita e longevidade biológica." },
    ],
    stepsHeading: "Etapas do tratamento cerâmico",
    steps: [
      { title: "Avaliação e escaneamento", text: "Diagnóstico de dentes, gengiva, mordida e captura digital 3D da arcada." },
      { title: "Planejamento e mock-up", text: "Desenho digital do sorriso e simulação provisória diretamente na boca para avaliação estética." },
      { title: "Preparo e provisórios", text: "Preparo dental guiado e instalação de dentes provisórios durante a fase laboratorial." },
      { title: "Prova e cimentação", text: "Ajuste de adaptação, anatomia e cor seguido de cimentação adesiva definitiva." },
    ],
    comparisonHeading: "Diferenças entre resina e porcelana",
    comparison: [
      { title: "Facetas de resina", items: ["Confecção direta na clínica", "Fácil reparo e ajuste imediato", "Exige polimentos periódicos para manter o brilho", "Abordagem com mínimo ou nenhum desgaste"] },
      { title: "Facetas de porcelana", items: ["Fluxo laboratorial e cerâmica de alta resistência", "Máxima estabilidade de brilho e textura a longo prazo", "Ideal para alterações severas de cor e desgastes extensos", "Planejamento digital com teste em mock-up"] },
    ],
    faq: [
      { question: "Quanto tempo duram as facetas de porcelana?", answer: "A longevidade depende da condição dental, mordida, hábitos de mastigação, higiene e acompanhamento regular. Na nossa prática clínica, acompanhamos tratamentos em porcelana há mais de 10 anos em excelentes condições." },
      { question: "Preciso fazer facetas em todos os dentes?", answer: "Não. A quantidade de dentes envolvidos varia conforme a queixa e o planejamento. Alguns casos tratam poucos dentes anteriores, enquanto outros exigem uma reabilitação do arco do sorriso." },
      { question: "Quem tem bruxismo pode colocar facetas de porcelana?", answer: "Sim, desde que o bruxismo seja diagnosticado e considerado no planejamento. Nesses casos, o ajuste equilibrado da mordida e o uso de uma placa protetora noturna são fundamentais para proteger as peças cerâmicas." },
      { question: "Porcelana mancha com café ou alimentos pigmentados?", answer: "A cerâmica odontológica é um material vítreo de alta estabilidade e não absorve pigmentos como a resina. A manutenção da saúde gengival e da higiene continua essencial." },
      { question: "É preciso desgastar muito os dentes?", answer: "O preparo é planejado para ser o mais conservador possível, variando conforme o volume e alinhamento original dos dentes para garantir a espessura e assentamento corretos da porcelana." },
    ],
    aftercareBody: [
      "Mesmo com alta estabilidade cerâmica, as facetas necessitam de acompanhamento periódico.",
      "Higiene diária, limpezas profissionais e controle da oclusão garantem a saúde periodontal ao redor das margens e a integridade do tratamento.",
    ],
    related: [
      { title: "Facetas de resina", href: "/facetas-de-resina" },
      { title: "Reabilitação oral", href: "/reabilitacao-oral" },
      { title: "Ortodontia", href: "/ortodontia" },
      { title: "Cirurgia gengival", href: "/cirurgia-gengival" },
    ],
  },
  {
    slug: "implantes-dentarios",
    title: "Implantes Dentários para Substituição de Dentes",
    specialty: "Implantodontia",
    variant: "process",
    lead: "dra-sara-michelon",
    description: "Planejamento reabilitador guiado pela tomografia 3D, escaneamento intraoral e função mastigatória para repor um, vários ou todos os dentes.",
    seoTitle: "Implantes Dentários em Florianópolis | Clínica nos Ingleses",
    seoDescription: "Implantes dentários em Florianópolis para substituir um ou mais dentes, com avaliação, tomografia, planejamento e acompanhamento da reabilitação.",
    focusHeading: "O planejamento começa pelo dente que será reabilitado",
    overview: "Os implantes dentários substituem as raízes de dentes perdidos e servem de suporte para restaurações unitárias, pontes fixas ou próteses completas. Cada caso parte de uma avaliação minuciosa da estrutura óssea, mordida e dentes remanescentes.",
    introParagraphs: [
      "A perda de dentes compromete a mastigação, a fonética, a distribuição de forças na mordida e a segurança ao sorrir.",
      "Os implantes dentários são estruturas de titânio instaladas no tecido ósseo que substituem as raízes perdidas e servem de ancoragem para os novos dentes.",
      "O planejamento não visa apenas instalar implantes, mas projetar como a futura prótese irá funcionar, mastigar e se integrar esteticamente à sua arcada.",
    ],
    topicsHeading: "Fundamentos do tratamento com implantes",
    topics: [
      { title: "Reposição unitária ou múltipla", text: "Substituição precisa de dentes ausentes sem a necessidade de desgastar dentes vizinhos saudáveis." },
      { title: "Diagnóstico tomográfico 3D", text: "Análise minuciosa da altura, espessura e densidade óssea, além do mapeamento de nervos e seios maxilares." },
      { title: "Reconstrução óssea associada", text: "Procedimentos de enxerto ósseo ou levantamento de seio maxilar quando o suporte precisa ser restabelecido." },
    ],
    stepsHeading: "Etapas da reabilitação com implantes",
    steps: [
      { title: "Avaliação e escaneamento", text: "Exame clínico de dentes, gengiva, mordida e necessidades funcionais do paciente." },
      { title: "Tomografia e planejamento 3D", text: "Mapeamento ósseo e definição da posição tridimensional ideal de cada implante." },
      { title: "Procedimento cirúrgico", text: "Instalação dos implantes com opção de sedação planejada para máximo conforto e tranquilidade." },
      { title: "Cicatrização e prótese definitiva", text: "Acompanhamento da osseointegração com solução provisória confortável até a fixação da prótese final." },
    ],
    faq: [
      { question: "Quanto custa um implante dentário?", answer: "O valor varia conforme o número de implantes, a necessidade de enxerto ósseo, o tipo de prótese e os materiais selecionados. O orçamento é apresentado de forma clara após avaliação clínica e tomográfica." },
      { question: "Preciso fazer enxerto ósseo para colocar implante?", answer: "Nem todos os casos necessitam de enxerto. A necessidade é diagnosticada na avaliação clínica e confirmada pela tomografia computadorizada." },
      { question: "Posso colocar dente fixo no mesmo dia da cirurgia?", answer: "Em situações selecionadas, a técnica de carga imediata permite instalar um dente provisório fixo logo após a cirurgia. A indicação depende da qualidade óssea e da estabilidade primária obtida na instalação do implante." },
      { question: "Qual a diferença entre implante e prótese protocolo?", answer: "O implante é o pino instalado no osso que substitui a raiz. A prótese protocolo é a estrutura completa de dentes fixada sobre 4 ou mais implantes para reabilitar uma arcada inteira." },
      { question: "Vou ficar sem dente durante o tratamento?", answer: "Não. Durante todo o período de cicatrização e osseointegração, o planejamento prevê dentes provisórios estéticos e funcionais para que você mantenha sua rotina normal." },
    ],
    aftercareBody: [
      "O tratamento com implantes não termina com a instalação da prótese definitiva.",
      "Consultas periódicas permitem monitorar os tecidos peri-implantares, higienização profissional e oclusão para assegurar a longevidade dos implantes.",
    ],
    related: [
      { title: "Prótese protocolo", href: "/protese-protocolo" },
      { title: "Enxerto ósseo", href: "/enxerto-osseo-dentario" },
      { title: "Reabilitação oral", href: "/reabilitacao-oral" },
      { title: "Periodontia", href: "/periodontia" },
    ],
  },
  {
    slug: "protese-protocolo",
    title: "Prótese Protocolo: Dentes Fixos sobre Implantes",
    specialty: "Implantodontia",
    variant: "process",
    lead: "dra-sara-michelon",
    description: "Reabilitação fixa para arcada completa sobre implantes, devolvendo firmeza mastigatória e estabilidade sem o desconforto de dentaduras móveis.",
    seoTitle: "Prótese Protocolo em Florianópolis | Implantes Dentários",
    seoDescription: "Prótese protocolo em Florianópolis: entenda indicação, implantes, materiais, carga imediata, provisórios e manutenção da prótese fixa.",
    focusHeading: "Reabilitação fixa para quem perdeu todos ou a maioria dos dentes",
    overview: "A prótese protocolo é uma estrutura fixa completa suportada por implantes dentários. Indicada para pacientes edêntulos ou com dentes remanescentes severamente comprometidos, ela restaura a força mastigatória e a estética com total firmeza.",
    introParagraphs: [
      "A prótese protocolo é uma reabilitação fixa sobre implantes indicada para quem perdeu todos os dentes de uma arcada ou possui dentes remanescentes sem condições de preservação.",
      "Diferente das dentaduras convencionais móveis, ela fica fixada aos implantes e é removida apenas pelo cirurgião-dentista em consultas de manutenção periódica.",
      "Os protocolos podem ser confeccionados em resina sobre estrutura metálica ou em zircônia de alta estética e resistência, conforme as demandas mecânicas de cada paciente.",
    ],
    topicsHeading: "Aspectos do planejamento da prótese protocolo",
    topics: [
      { title: "Estabilidade mastigatória total", text: "Segurança para mastigar e falar sem qualquer risco de movimentação ou deslocamento da prótese." },
      { title: "Materiais modernos: resina ou zircônia", text: "Opções de materiais selecionadas conforme estética, carga mastigatória e suporte labial." },
      { title: "Preservação criteriosa de dentes viáveis", text: "Dentes que podem ser tratados e mantidos são preservados; a extração ocorre apenas quando não há viabilidade biológica." },
    ],
    stepsHeading: "Fluxo do tratamento com prótese protocolo",
    steps: [
      { title: "Avaliação clínica e facial", text: "Análise da arcada, suporte labial, dimensão vertical e necessidades estético-funcionais." },
      { title: "Tomografia computadorizada 3D", text: "Mapeamento ósseo para planejamento da posição e angulação estratégica dos implantes." },
      { title: "Cirurgia e provisórios imediatos", text: "Instalação dos implantes com opção de sedação e planejamento de prótese provisória imediata." },
      { title: "Confecção e fixação definitiva", text: "Provas de mordida e estética até a entrega e parafusamento da prótese definitiva." },
    ],
    faq: [
      { question: "Qual a diferença entre implante e prótese protocolo?", answer: "O implante é o pino de titânio fixado no osso que substitui a raiz. A prótese protocolo é a estrutura completa de dentes parafusada firmemente sobre múltiplos implantes." },
      { question: "Quem ainda tem dentes pode fazer prótese protocolo?", answer: "Apenas quando os dentes remanescentes apresentam comprometimento severo sem possibilidade de recuperação. Dentes que podem ser preservados com segurança não devem ser extraídos para fazer protocolo." },
      { question: "Vou ficar sem dentes durante o tratamento?", answer: "Não. O planejamento inclui próteses provisórias adaptadas ou fixadas imediatamente para garantir mastigação, fonação e estética durante toda a osseointegração." },
      { question: "A carga imediata é possível na prótese protocolo?", answer: "Sim, em muitos casos em que a qualidade óssea permite excelente estabilidade primária dos implantes, a prótese provisória fixa pode ser instalada nos primeiros dias após a cirurgia." },
    ],
    aftercareBody: [
      "A prótese protocolo necessita de rotina de higiene domiciliar com passadores de fio e escovas interdentais ou irrigadores.",
      "Consultas periódicas de manutenção profissional para desparafusamento, higienização interna e checagem dos implantes garantem a saúde dos tecidos a longo prazo.",
    ],
    related: [
      { title: "Implantes dentários", href: "/implantes-dentarios" },
      { title: "Enxerto ósseo", href: "/enxerto-osseo-dentario" },
      { title: "Reabilitação oral", href: "/reabilitacao-oral" },
      { title: "Próteses dentárias", href: "/proteses-dentarias" },
    ],
  },
  {
    slug: "periodontia",
    title: "Periodontia e Tratamento da Gengiva",
    specialty: "Periodontia",
    variant: "symptom-led",
    lead: "dra-sara-michelon",
    description: "Diagnóstico e tratamento de gengivite, periodontite, sangramento, retração e manutenção dos tecidos ao redor de dentes e implantes.",
    seoTitle: "Periodontia em Florianópolis | Especialista em Gengiva",
    seoDescription: "Periodontia e tratamento de gengiva em Florianópolis. Avaliação de gengivite, periodontite, sangramento, retração e saúde ao redor de implantes.",
    focusHeading: "Saúde periodontal e estabilização dos tecidos de suporte",
    overview: "A Periodontia é a área responsável por prevenir e tratar as doenças que atingem a gengiva e as estruturas ósseas de suporte dental. Sangramento, inchaço, retração ou mobilidade exigem diagnóstico precoce para controle de infecção e preservação dos dentes.",
    introParagraphs: [
      "Gengiva saudável não deve sangrar durante a escovação ou o uso do fio dental.",
      "Sangramento frequente, inchaço, retração da gengiva, mau hálito persistente e mobilidade dos dentes são sinais que exigem investigação periodontal.",
      "Quando a inflamação afeta apenas a gengiva, trata-se de gengivite. Quando progride e destrói as estruturas ósseas de sustentação, configura-se a periodontite, cuja estabilização é pré-requisito para qualquer procedimento estético.",
    ],
    topicsHeading: "Sinais e condições que merecem avaliação periodontal",
    topics: [
      { title: "Sangramento, inchaço e gengivite", text: "Inflamação reversível que requer remoção de placa bacteriana e profilaxia adequada." },
      { title: "Periodontite e perda óssea", text: "Infecção subgengival com formação de bolsas periodontais e comprometimento da sustentação dos dentes." },
      { title: "Cuidados peri-implantares", text: "Diagnóstico e tratamento de mucosite e peri-implantite nos tecidos ao redor de implantes dentários." },
    ],
    stepsHeading: "Como é conduzido o tratamento periodontal",
    steps: [
      { title: "Exame clínico e sondagem", text: "Mapeamento milimétrico da profundidade das bolsas periodontais ao redor de cada dente." },
      { title: "Avaliação radiográfica", text: "Exames de imagem para verificar o padrão e o nível do suporte ósseo alveolar." },
      { title: "Raspagem e desinfecção", text: "Remoção especializada de tártaro e biofilme subgengival com alisamento radicular." },
      { title: "Manutenção periódica de suporte", text: "Consultas de retorno individualizadas para monitorar os tecidos e prevenir recidivas." },
    ],
    faq: [
      { question: "Gengiva sangrando é normal?", answer: "Não. Sangramento gengival frequente indica processo inflamatório ativo e deve ser avaliado por um especialista, mesmo que não haja dor associada." },
      { question: "Gengivite e periodontite são a mesma coisa?", answer: "Não. Na gengivite, a inflamação fica restrita à gengiva superficial. Na periodontite, a infecção compromete os ligamentos e o osso de suporte dental, podendo causar perda óssea." },
      { question: "Dente com mobilidade por periodontite precisa ser extraído?", answer: "Nem sempre. A possibilidade de preservação do dente depende da quantidade de suporte ósseo remanescente e da resposta favorável ao controle da infecção periodontal." },
      { question: "Periodontite tem cura?", answer: "A periodontite pode ser controlada e estabilizada com excelência. O sucesso do tratamento a longo prazo depende da higienização diária e das visitas periódicas de manutenção profissional." },
    ],
    aftercareBody: [
      "O controle da periodontite não termina com as sessões de raspagem.",
      "Pacientes periodontais precisam de acompanhamento periódico personalizado para manter os tecidos de suporte saudáveis e reduzir riscos de progressão da doença.",
    ],
    related: [
      { title: "Cirurgia gengival", href: "/cirurgia-gengival" },
      { title: "Implantes dentários", href: "/implantes-dentarios" },
      { title: "Manutenção odontológica", href: "/manutencao-odontologica" },
      { title: "Facetas de resina", href: "/facetas-de-resina" },
    ],
  },
  {
    slug: "cirurgia-gengival",
    title: "Gengivoplastia e Cirurgia Gengival",
    specialty: "Periodontia",
    variant: "symptom-led",
    lead: "dra-sara-michelon",
    description: "Correção estética e biológica do contorno gengival: gengivoplastia, aumento de coroa clínica, sorriso gengival e enxertos para retrações.",
    seoTitle: "Gengivoplastia e Cirurgia Gengival em Florianópolis",
    seoDescription: "Cirurgia gengival e gengivoplastia em Florianópolis para casos indicados de contorno gengival, sorriso gengival e retração, após avaliação periodontal.",
    focusHeading: "Harmonia entre dentes e gengiva com respeito aos limites biológicos",
    overview: "A cirurgia gengival ajusta o contorno, o volume e a proporção da gengiva quando os dentes parecem curtos ou quando há exposição excessiva ao sorrir. É fundamental no planejamento do sorriso e antes de facetas ou lentes.",
    introParagraphs: [
      "Um dente que parece pequeno nem sempre é realmente pequeno: muitas vezes, parte da sua coroa natural está recoberta por excesso de gengiva.",
      "A cirurgia gengival remodela o contorno gengival e restabelece a proporção harmônica do sorriso, podendo envolver apenas tecido gengival (gengivoplastia) ou também ajuste ósseo (aumento de coroa clínica).",
      "Primeiro estabilizamos a saúde periodontal; somente depois realizamos correções estéticas e procedimentos como facetas de resina ou porcelana.",
    ],
    topicsHeading: "Indicações da cirurgia gengival",
    topics: [
      { title: "Gengivoplastia e aumento de coroa", text: "Remodelação do contorno gengival e ósseo para expor o tamanho anatômico natural dos dentes." },
      { title: "Correção de sorriso gengival", text: "Diagnóstico da causa da exposição excessiva da gengiva para indicar a abordagem adequada." },
      { title: "Retração gengival e enxertos", text: "Procedimentos cirúrgicos para recobrir raízes expostas, aliviar sensibilidade e aumentar a espessura tecidual." },
    ],
    stepsHeading: "Como funciona o planejamento cirúrgico gengival",
    steps: [
      { title: "Avaliação da saúde periodontal", text: "Verificação da ausência de inflamação e análise biológica da espessura gengival." },
      { title: "Planejamento e proporções estéticas", text: "Medição precisa da relação entre estética branca (dentes) e estética vermelha (gengiva)." },
      { title: "Procedimento cirúrgico delicado", text: "Microcirurgia precisa e conservadora realizada com anestesia local para rápida cicatrização." },
      { title: "Acompanhamento da cicatrização", text: "Revisão e acompanhamento da maturação do tecido antes de etapas restauradoras como facetas." },
    ],
    faq: [
      { question: "Gengivoplastia deixa os dentes maiores?", answer: "A cirurgia não altera o tamanho do dente em si, mas remove o excesso de gengiva que recobria a estrutura dental, revelando a proporção estética natural da coroa." },
      { question: "Todo sorriso gengival precisa de cirurgia?", answer: "Não. A exposição de gengiva pode decorrer de fatores anatômicos dentários, musculares ou esqueléticos. A avaliação clínica define se a cirurgia é indicada ou se outra abordagem é recomendada." },
      { question: "Quando o enxerto gengival é indicado?", answer: "O enxerto é considerado em casos de retração gengival para proteger a raiz exposta, aliviar sensibilidade dentinária ou reforçar a faixa de tecido protetor ao redor do dente." },
      { question: "Preciso fazer cirurgia gengival antes de colocar facetas?", answer: "Quando os dentes apresentam assimetrias de margem gengival ou excesso de tecido cobrindo a coroa, corrigir o contorno gengival antes permite que as facetas sejam desenhadas com proporções perfeitas." },
    ],
    aftercareBody: [
      "O pós-operatório da cirurgia gengival requer repouso mastigatório leve nas primeiras 48 horas, higiene cuidadosa e uso de antissépticos orientados pelo periodontista até a cicatrização completa.",
    ],
    related: [
      { title: "Periodontia", href: "/periodontia" },
      { title: "Facetas de resina", href: "/facetas-de-resina" },
      { title: "Lentes de contato dental", href: "/lentes-de-contato-dental" },
      { title: "Clareamento dental", href: "/clareamento-dental" },
    ],
  },
  {
    slug: "ortodontia",
    title: "Ortodontia: Aparelhos Dentários e Alinhadores Transparentes",
    specialty: "Ortodontia",
    variant: "hub",
    lead: "dra-sara-michelon",
    description: "Alinhamento dos dentes e equilíbrio da mordida para crianças, adolescentes e adultos: alinhadores transparentes (incluindo Invisalign®) e aparelhos autoligados.",
    seoTitle: "Ortodontista em Florianópolis | Aparelhos e Alinhadores",
    seoDescription: "Ortodontia em Florianópolis com aparelhos fixos e alinhadores transparentes. Planejamento individual para crianças, adolescentes e adultos.",
    focusHeading: "A escolha do sistema ortodôntico orientada pelo diagnóstico",
    overview: "A Ortodontia permite corrigir o posicionamento dos dentes e disfunções da mordida em qualquer fase da vida. O planejamento não começa pela marca do aparelho, mas pelo diagnóstico detalhado das movimentações necessárias.",
    introParagraphs: [
      "Corrigir a posição dos dentes e a mordida é essencial para a saúde funcional, estética do sorriso e preservação biológica das estruturas dentárias.",
      "Trabalhamos com alinhadores transparentes (incluindo Invisalign®), aparelhos autoligados e sistemas fixos convencionais, indicados conforme as movimentações necessárias de cada caso.",
      "Atendemos crianças, jovens e adultos, com foco em diagnóstico preciso, conforto e mínima intervenção.",
    ],
    topicsHeading: "Opções e abordagens ortodônticas",
    topics: [
      { title: "Alinhadores transparentes", text: "Placas discretas e removíveis que oferecem facilidade de higiene, conforto e liberdade social.", href: "/invisalign" },
      { title: "Aparelhos autoligados e fixos", text: "Sistemas modernos com forças leves e contínuas indicados para correções mecânicas complexas." },
      { title: "Ortodontia pré-restauradora", text: "Movimentar dentes mal posicionados antes de facetas ou implantes reduz desgastes desnecessários da estrutura dental." },
    ],
    stepsHeading: "Como funciona o planejamento ortodôntico",
    steps: [
      { title: "Avaliação clínica e facial", text: "Análise da oclusão, relação entre arcadas, perfil facial e histórico odontológico." },
      { title: "Escaneamento digital 3D", text: "Captura digital de alta precisão para simulação tridimensional das movimentações previstas." },
      { title: "Instalação e acompanhamento", text: "Início do uso dos alinhadores ou aparelho com revisões periódicas programadas." },
      { title: "Contenção ortodôntica", text: "Uso de contenções fixas ou removíveis para assegurar a estabilidade definitiva dos dentes alinhados." },
    ],
    faq: [
      { question: "Quando os alinhadores transparentes são indicados?", answer: "São indicados para uma grande variedade de correções de posição e mordida. A indicação depende da complexidade das movimentações e do compromisso do paciente com o uso contínuo." },
      { question: "Invisalign® e alinhador transparente são a mesma coisa?", answer: "Invisalign® é uma das marcas de alinhadores transparentes. Trabalhamos com diferentes sistemas certificados e escolhemos o mais indicado para o seu plano de tratamento." },
      { question: "Alinhador é mais rápido que aparelho fixo?", answer: "O tempo de tratamento depende da complexidade do caso e da colaboração com o tempo de uso diário (cerca de 22h/dia), não exclusivamente do sistema escolhido." },
      { question: "Adultos podem fazer tratamento ortodôntico?", answer: "Sim. Adultos em qualquer idade podem alinhar os dentes com segurança e discrição, desde que haja saúde gengival e óssea devidamente avaliada." },
    ],
    aftercareBody: [
      "Após a fase ativa de alinhamento, a fase de contenção é fundamental para evitar a recidiva das movimentações.",
      "O uso das contenções prescritas e consultas de controle preservam o resultado conquistado.",
    ],
    related: [
      { title: "Invisalign", href: "/invisalign" },
      { title: "Facetas de resina", href: "/facetas-de-resina" },
      { title: "Lentes de contato dental", href: "/lentes-de-contato-dental" },
      { title: "Reabilitação oral", href: "/reabilitacao-oral" },
    ],
  },
  {
    slug: "invisalign",
    title: "Invisalign e Alinhadores Transparentes",
    specialty: "Ortodontia",
    variant: "process",
    lead: "dra-sara-michelon",
    description: "Alinhamento ortodôntico com placas transparentes e removíveis, planejadas digitalmente para máxima discrição e previsibilidade.",
    seoTitle: "Invisalign em Florianópolis | Alinhadores Transparentes",
    seoDescription: "Invisalign em Florianópolis e alinhadores transparentes. Saiba como funciona, indicação, tempo de uso e diferenças para aparelho fixo.",
    focusHeading: "Planejamento digital e discrição durante todo o tratamento",
    overview: "Os alinhadores transparentes reposicionam os dentes de forma progressiva e estética. Removíveis para alimentação e higiene, combinam tecnologia digital 3D e previsibilidade clínica.",
    introParagraphs: [
      "Os alinhadores transparentes são placas sequenciais removíveis desenvolvidas para movimentar os dentes gradualmente até a posição planejada.",
      "Permitem alimentar-se sem restrições e facilitam a escovação e o uso de fio dental, sem o desconforto de bráquetes e fios metálicos.",
      "Trabalhamos com os principais sistemas do mercado, incluindo Invisalign®, selecionados de acordo com as necessidades biomecânicas de cada paciente.",
    ],
    topicsHeading: "Diferenciais dos alinhadores transparentes",
    topics: [
      { title: "Discrição e estética", text: "Praticamente imperceptíveis no dia a dia, preservando a estética do seu sorriso durante o tratamento." },
      { title: "Remoção para refeições e higiene", text: "Liberdade para comer o que quiser e higienizar os dentes sem obstáculos." },
      { title: "Colaboração e tempo de uso", text: "Para que a movimentação planejada aconteça, é necessário utilizar os alinhadores por aproximadamente 22 horas ao dia." },
    ],
    stepsHeading: "Como funciona o tratamento com alinhadores",
    steps: [
      { title: "Escaneamento digital", text: "Registro 3D das arcadas sem moldagens desconfortáveis." },
      { title: "Planejamento virtual 3D", text: "Simulação de cada movimentação dentária e estimativa das placas necessárias." },
      { title: "Uso e trocas programadas", text: "Troca das placas conforme orientação clínica com acompanhamento das evoluções." },
      { title: "Contenção ortodôntica", text: "Instalação de placas de contenção para manter o sorriso alinhado permanentemente." },
    ],
    faq: [
      { question: "Invisalign® e alinhador transparente são a mesma coisa?", answer: "Invisalign® é uma marca de alinhadores transparentes. Avaliamos as características de cada caso para indicar o sistema ideal." },
      { question: "Quantas horas por dia devo usar os alinhadores?", answer: "Os alinhadores devem ser usados cerca de 22 horas por dia, sendo retirados apenas para comer, beber líquidos quentes/coloridos e higienizar os dentes." },
      { question: "Alinhador substitui o aparelho fixo em todos os casos?", answer: "A grande maioria dos casos de desalinhamento e mordida pode ser tratada com alinhadores. A avaliação ortodôntica confirma a indicação exata para o seu caso." },
    ],
    aftercareBody: [
      "Após a conclusão da sequência de alinhadores, confeccionamos contenções personalizadas para garantir a estabilidade do resultado a longo prazo.",
    ],
    related: [
      { title: "Ortodontia", href: "/ortodontia" },
      { title: "Facetas de resina", href: "/facetas-de-resina" },
      { title: "Periodontia", href: "/periodontia" },
    ],
  },
  {
    slug: "bruxismo",
    title: "Bruxismo, DTM e Dor Orofacial",
    specialty: "DTM e Dor Orofacial",
    variant: "symptom-led",
    lead: "dra-sara-michelon",
    description: "Investigação e manejo de aperto dentário, estalos articulares, desgaste nos dentes e tensão muscular na face e mandíbula.",
    seoTitle: "Tratamento do Bruxismo em Florianópolis | DTM e Dor Orofacial",
    seoDescription: "Avaliação de bruxismo, DTM e dor orofacial em Florianópolis. Entenda sintomas, placa estabilizadora, acompanhamento e quando buscar avaliação.",
    focusHeading: "Identificação dos fatores causais antes do tratamento",
    overview: "Apertamento, ranger de dentes, cansaço muscular na mandíbula ao acordar, estalos na articulação temporomandibular e dores de cabeça frequentes exigem diagnóstico diferencial para proteção dental e alívio da dor.",
    introParagraphs: [
      "Dor ao mastigar, tensão na musculatura da face, aperto dentário, estalos na mandíbula e dores de cabeça tensionais podem estar associados ao bruxismo ou a Disfunções Temporomandibulares (DTM).",
      "Como diferentes alterações provocam sintomas semelhantes, o primeiro passo é identificar se o quadro é predominantemente muscular, articular ou associado ao desgaste oclusal.",
      "O tratamento é individualizado e vai muito além de confeccionar uma placa: envolve ajustes sequenciais, proteção dos dentes e abordagem multifatorial.",
    ],
    topicsHeading: "Sinais e sintomas que merecem atenção",
    topics: [
      { title: "Apertar ou ranger dentes", text: "Hábito diurno (vigília) ou noturno que sobrecarrega a musculatura e desgasta a estrutura dental." },
      { title: "Tensão, estalos e dor na mandíbula", text: "Desconforto ao mastigar, fadiga muscular ao acordar e estalos na articulação temporomandibular (ATM)." },
      { title: "Placa estabilizadora e acompanhamento", text: "Confecção de placa oclusal rígida ajustada periodicamente para equilibrar forças e proteger o sorriso." },
    ],
    stepsHeading: "Fluxo de diagnóstico e cuidado",
    steps: [
      { title: "Avaliação clínica e muscular", text: "Palpação muscular, medição da amplitude de abertura bucal e análise das facetas de desgaste." },
      { title: "Diagnóstico diferencial", text: "Diferenciação entre dor muscular, disfunção articular da ATM e sobrecarga oclusal." },
      { title: "Confecção e ajuste da placa", text: "Instalação de placa estabilizadora rígida sob medida e ajuste preciso dos contatos." },
      { title: "Acompanhamento e reavaliações", text: "Consultas de retorno para ajuste contínuo da placa e manejo dos fatores associados." },
    ],
    faq: [
      { question: "Quais são os principais sinais de bruxismo e DTM?", answer: "Apertamento ou ranger de dentes, dor ou cansaço na mandíbula, dor de cabeça associada à tensão muscular, estalos na ATM, desgastes e fraturas frequentes nos dentes e sensação de peso facial ao acordar." },
      { question: "A placa estabilizadora cura o bruxismo?", answer: "O bruxismo é uma condição neuromuscular de origem multifatorial. A placa estabilizadora protege os dentes contra desgastes e fraturas e alivia a sobrecarga muscular, mas exige acompanhamento e ajustes regulares." },
      { question: "Estalo na mandíbula é sinal de DTM?", answer: "O estalo articular pode indicar deslocamento do disco da ATM. Nem todo ruído exige intervenção invasiva, mas deve ser avaliado clinicamente para verificar estabilidade e presença de dor." },
    ],
    aftercareBody: [
      "Acompanhamento periódico para verificar o desgaste da placa, reajustar contatos e avaliar a remissão dos sintomas musculares e articulares.",
    ],
    related: [
      { title: "Reabilitação oral", href: "/reabilitacao-oral" },
      { title: "Facetas de resina", href: "/facetas-de-resina" },
      { title: "Toxina botulínica", href: "/botox" },
      { title: "Ortodontia", href: "/ortodontia" },
    ],
  },
  {
    slug: "tratamento-de-canal",
    title: "Tratamento de Canal | Endodontia",
    specialty: "Endodontia",
    variant: "process",
    lead: "dra-sara-michelon",
    description: "Tratamento especializado da polpa dentária com instrumentação mecanizada, localizador apical e planejamento integrado da restauração definitiva.",
    seoTitle: "Tratamento de Canal em Florianópolis | Endodontia",
    seoDescription: "Tratamento de canal em Florianópolis com avaliação, instrumentação moderna e planejamento da restauração do dente após a endodontia.",
    focusHeading: "Preservação do dente e controle de infecção interna",
    overview: "O tratamento de canal (endodontia) atua na parte interna do dente quando a polpa sofre inflamação irreversível ou necrose por cárie profunda, trauma ou fratura. O objetivo é desinfetar os canais, selar a raiz e preservar o dente.",
    introParagraphs: [
      "O tratamento de canal é indicado quando a polpa dental (nervo) apresenta inflamação, infecção bacteriana ou necrose.",
      "Utilizamos tecnologias como localizador apical eletrônico e instrumentação mecanizada e reciprocante, permitindo que muitos tratamentos sejam concluídos em sessão única com alto conforto.",
      "Depois de tratar os canais, a reabilitação da estrutura dental remanescente (com restauração direta, indireta ou coroa) é planejada para garantir resistência mecânica e evitar fraturas.",
    ],
    topicsHeading: "Aspectos do tratamento endodôntico",
    topics: [
      { title: "Tecnologia mecanizada e precisão", text: "Instrumentação moderna e localizadores apicais para máxima segurança e agilidade durante a desinfecção." },
      { title: "Retratamento de canal", text: "Nova intervenção especializada em dentes que apresentam alterações ou infecção persistente de tratamentos antigos." },
      { title: "Reconstrução protética pós-canal", text: "Planejamento imediato da restauração, pino de fibra ou coroa para proteger o dente contra fraturas." },
    ],
    stepsHeading: "Como funciona o tratamento endodôntico",
    steps: [
      { title: "Diagnóstico e exame radiográfico", text: "Testes de sensibilidade e radiografias para identificar a origem exata da dor ou infecção." },
      { title: "Desinfecção dos canais", text: "Acesso, remoção da polpa comprometida e desinfecção minuciosa com instrumentação mecanizada." },
      { title: "Obturação tridimensional", text: "Preenchimento e selamento hermético dos canais radiculares para impedir reinfecções." },
      { title: "Restauração definitiva", text: "Reconstrução estrutural do dente para devolver resistência e função mastigatória." },
    ],
    faq: [
      { question: "Tratamento de canal dói?", answer: "O procedimento é realizado sob anestesia local eficaz e com técnicas confortáveis. Sensibilidade residual nos primeiros dias após a sessão é comum e controlada com medicamentos orientados pela equipe." },
      { question: "O canal pode ser feito em sessão única?", answer: "Em muitos casos sim, especialmente com o uso de instrumentação mecanizada. Casos de infecção complexa ou alterações anatômicas podem exigir sessões adicionais com medicação intracanal." },
      { question: "Todo dente com dor precisa de canal?", answer: "Não. A dor pode ter diversas origens, como sensibilidade gengival, cáries iniciais ou sobrecarga oclusal. A indicação de canal é confirmada após testes clínicos e radiográficos." },
      { question: "Quando é necessário fazer um retratamento de canal?", answer: "O retratamento é indicado quando há persistência de bactérias, dor, lesão óssea na ponta da raiz ou infiltração de restaurações antigas em dentes já tratados anteriormente." },
      { question: "Por que o dente precisa ser restaurado logo após o canal?", answer: "Após o canal, o dente precisa de vedação definitiva imediata e reforço mecânico para evitar recontaminação bacteriana e fratura da estrutura dental remanescente." },
    ],
    aftercareBody: [
      "Evitar mastigar alimentos duros sobre o dente tratado até que a restauração ou coroa definitiva seja concluída, mantendo controle radiográfico de acompanhamento.",
    ],
    related: [
      { title: "Reabilitação oral", href: "/reabilitacao-oral" },
      { title: "Inlays e onlays", href: "/inlays-onlays" },
      { title: "Periodontia", href: "/periodontia" },
      { title: "Próteses dentárias", href: "/proteses-dentarias" },
    ],
  },
  {
    slug: "reabilitacao-oral",
    title: "Reabilitação Oral: Planejamento Integrado do Sorriso e da Função",
    specialty: "Reabilitação Oral",
    variant: "hub",
    lead: "dra-sara-michelon",
    description: "Diagnóstico global e sequência integrada de tratamentos para casos com dentes ausentes, desgastados, restaurações extensas ou desequilíbrio na mordida.",
    seoTitle: "Reabilitação Oral em Florianópolis | Planejamento Integrado",
    seoDescription: "Reabilitação oral em Florianópolis para casos com dentes ausentes, desgastados, próteses antigas ou múltiplas necessidades. Planejamento integrado da clínica.",
    focusHeading: "Quando existem múltiplos problemas, o primeiro passo é olhar para o conjunto",
    overview: "Dentes quebrados, ausentes ou desgastados, próteses antigas e dificuldade mastigatória não devem ser tratados de forma isolada. A reabilitação oral organiza o diagnóstico completo e estabelece a sequência lógica entre diferentes áreas da odontologia.",
    introParagraphs: [
      "Dentes fraturados, muito desgastados ou ausentes, próteses antigas desadaptadas e desconforto para mastigar exigem uma visão integrada do sorriso e da função.",
      "A Reabilitação Oral parte de uma avaliação completa de dentes, gengiva, mordida e articulações para estruturar um planejamento único com sequência clínica bem definida.",
      "Você não precisa saber previamente de quais tratamentos precisará: primeiro compreendemos a saúde bucal como um todo e organizamos as etapas necessárias para restabelecer conforto e estética duradouros.",
    ],
    topicsHeading: "Um planejamento pode envolver diferentes tratamentos",
    topics: [
      { title: "Implantes e prótese protocolo", text: "Reposição de dentes ausentes com raízes artificiais e próteses fixas sobre implantes.", href: "/implantes-dentarios" },
      { title: "Periodontia e suporte", text: "Saúde gengival e óssea como alicerce biológico obrigatório antes das fases restauradoras.", href: "/periodontia" },
      { title: "Endodontia e restaurações", text: "Tratamento de canal e recuperação de dentes com perda estrutural significativa.", href: "/tratamento-de-canal" },
      { title: "Ortodontia e alinhamento", text: "Movimentações dentárias para criar espaço e nivelar a mordida de forma conservadora.", href: "/ortodontia" },
      { title: "Facetas e lentes de porcelana", text: "Harmonização de cor, forma e proporção com materiais cerâmicos de alta estabilidade.", href: "/lentes-de-contato-dental" },
      { title: "Reorganização da mordida", text: "Recuperação da dimensão vertical e da guia mastigatória em dentes com desgaste severo." },
    ],
    stepsHeading: "Como é organizada a reabilitação oral em etapas",
    steps: [
      { title: "Diagnóstico e escaneamento", text: "Avaliação clínica completa, escaneamento intraoral 3D e tomografia computadorizada." },
      { title: "Fase biológica preliminar", text: "Controle de cáries, adequação periodontal e tratamento de canal para construir uma base saudável." },
      { title: "Fase funcional e provisórios", text: "Ajuste da mordida, instalação de implantes e uso de provisórios para restabelecer função." },
      { title: "Finalização restauradora", text: "Instalação das peças definitivas em cerâmica, zircônia ou resina com controle oclusal rigoroso." },
    ],
    faq: [
      { question: "Reabilitação oral é indicada somente para quem perdeu muitos dentes?", answer: "Não. A reabilitação também é indicada para quem possui todos os dentes, mas apresenta desgastes acentuados por bruxismo, restaurações extensas antigas, alterações na mordida ou necessidade de integrar estética e mastigação." },
      { question: "Tenho vários problemas nos dentes. Como saber por onde começar?", answer: "O primeiro passo é a avaliação global. O plano organiza o tratamento em etapas lógicas: primeiro eliminação de dor e infecção, depois base óssea/gengival, ajuste da mordida e, por fim, finalização estética." },
      { question: "Preciso fazer todos os tratamentos de uma só vez?", answer: "Não. O planejamento é global, mas a execução pode ser dividida em fases clínicas organizadas com provisórios confortáveis, respeitando o seu tempo." },
      { question: "Dentes muito desgastados podem ser recuperados?", answer: "Sim. A reabilitação restabelece a altura e proporção perdidas com o desgaste, utilizando restaurações indiretas, inlays/onlays, coroas ou facetas de porcelana." },
    ],
    aftercareBody: [
      "Após a conclusão da reabilitação, o acompanhamento preventivo regular monitora a estabilidade da mordida, a saúde peri-implantar e a integridade das restaurações ao longo dos anos.",
    ],
    related: [
      { title: "Implantes dentários", href: "/implantes-dentarios" },
      { title: "Prótese protocolo", href: "/protese-protocolo" },
      { title: "Lentes e facetas de porcelana", href: "/lentes-de-contato-dental" },
      { title: "Periodontia", href: "/periodontia" },
      { title: "Tratamento de canal", href: "/tratamento-de-canal" },
      { title: "Ortodontia", href: "/ortodontia" },
    ],
  },
  {
    slug: "harmonizacao-facial",
    title: "Harmonização Facial: Planejamento Facial Integrado",
    specialty: "Estética Orofacial",
    variant: "hub",
    lead: "dra-sara-michelon",
    description: "Análise global da face, proporções, dinâmica muscular e qualidade da pele para tratamentos naturais e planejados em etapas.",
    seoTitle: "Harmonização Facial em Florianópolis | Planejamento Natural",
    seoDescription: "Harmonização facial em Florianópolis com avaliação individual e foco em naturalidade. Entenda planejamento, Full Face, preenchimentos e limites da abordagem.",
    focusHeading: "O tratamento começa pela análise da face, não pela escolha do procedimento",
    overview: "Harmonização facial não é aplicar o mesmo conjunto de procedimentos para todos. O tratamento inicia com uma análise detalhada das proporções, movimentação muscular, firmeza da pele, volumes e contornos, visando valorizar a harmonia natural da face.",
    introParagraphs: [
      "Harmonização facial é uma abordagem médico-odontológica de planejamento global que analisa a face como um todo integrado.",
      "Avaliamos proporções, compartimentos de gordura, dinâmica muscular, qualidade dérmica e sinais de envelhecimento para identificar quais intervenções realmente têm indicação.",
      "O conceito de Full Face não significa preencher o rosto inteiro, mas entender a relação entre os diferentes terços faciais e aplicar recursos estratégicos em etapas planejadas.",
    ],
    topicsHeading: "Procedimentos que podem integrar o planejamento facial",
    topics: [
      { title: "Preenchimento facial", text: "Ácido hialurônico para suporte estrutural e definição de mandíbula, mento, malar e olheiras.", href: "/preenchimento-facial" },
      { title: "Preenchimento labial", text: "Proporção, contorno e hidratação labial em equilíbrio com o sorriso e o perfil.", href: "/preenchimento-labial" },
      { title: "Toxina botulínica (Botox)", text: "Suavização de rugas dinâmicas de expressão na testa, glabela e olhos.", href: "/botox" },
      { title: "Bioestimuladores de colágeno", text: "Estímulo progressivo de firmeza dérmica e melhora da qualidade da pele.", href: "/bioestimuladores-de-colageno" },
      { title: "Perfiloplastia", text: "Harmonização não cirúrgica das proporções entre nariz, lábios e mento.", href: "/perfiloplastia" },
    ],
    stepsHeading: "Como é organizado o planejamento em etapas",
    steps: [
      { title: "Análise facial e proporções", text: "Diagnóstico dos terços faciais, qualidade da pele e dinâmica muscular da face." },
      { title: "Planejamento personalizado", text: "Seleção criteriosa dos produtos e definição das etapas de aplicação prioritárias." },
      { title: "Execução precisa", text: "Aplicação com cânulas e microagulhas com dosagens balanceadas para total naturalidade." },
      { title: "Acompanhamento e evolução", text: "Avaliação do resultado após a acomodação tecidual e orientações de manutenção." },
    ],
    faq: [
      { question: "O que é planejamento Full Face?", answer: "É a avaliação da face como um conjunto para compreender a origem anatômica de cada queixa. Isso não significa preencher toda a face ou usar excesso de produto, mas tratar pontos estratégicos que restabelecem o suporte global." },
      { question: "Preenchimento facial deixa o rosto maior ou artificial?", answer: "Não quando planejado com respeito à anatomia e aos compartimentos de gordura faciais. O objetivo do preenchimento moderno é repor o suporte perdido e realçar contornos sem distorções." },
      { question: "Harmonização facial tem limites?", answer: "Sim. Procedimentos injetáveis são excelentes para suporte e qualidade da pele, mas não substituem cirurgias quando há excesso severo de pele ou flacidez profunda. Parte do diagnóstico ético é indicar a melhor conduta." },
      { question: "Quanto tempo duram os procedimentos?", answer: "A duração varia conforme a substância: a toxina botulínica atua por alguns meses, o ácido hialurônico é reabsorvido gradualmente e os bioestimuladores promovem regeneração progressiva de colágeno." },
    ],
    aftercareBody: [
      "Cuidados pós-procedimento imediatos e consultas de acompanhamento para avaliar a acomodação dos tecidos e programar as revisões preventivas.",
    ],
    related: [
      { title: "Preenchimento facial", href: "/preenchimento-facial" },
      { title: "Preenchimento labial", href: "/preenchimento-labial" },
      { title: "Toxina botulínica", href: "/botox" },
      { title: "Bioestimuladores de colágeno", href: "/bioestimuladores-de-colageno" },
      { title: "Perfiloplastia", href: "/perfiloplastia" },
    ],
  },
  {
    slug: "preenchimento-facial",
    title: "Preenchimento Facial com Ácido Hialurônico",
    specialty: "Estética Orofacial",
    variant: "editorial",
    lead: "dra-sara-michelon",
    description: "Reposição de volume, suporte estrutural e refinamento de contornos com ácido hialurônico, planejado a partir da anatomia individual.",
    seoTitle: "Preenchimento Facial em Florianópolis | Ácido Hialurônico",
    seoDescription: "Preenchimento facial em Florianópolis com ácido hialurônico quando indicado. Conheça regiões, objetivos, duração e como funciona o planejamento.",
    focusHeading: "Suporte estrutural e definição de contornos estratégicos",
    overview: "O preenchimento facial com ácido hialurônico é utilizado para reposição de volume, suporte dos tecidos e definição de contornos como região malar, mandíbula, mento, têmporas e olheiras.",
    introParagraphs: [
      "O preenchimento com ácido hialurônico atua na reposição de volume, melhora do suporte anatômico e definição de contornos em áreas estratégicas da face.",
      "A indicação não é definida apenas pela queixa isolada: muitas vezes, um sulco nasolabial ou sombra na olheira decorre da perda de sustentação na região malar superior.",
      "O procedimento pode ser realizado pontualmente ou integrar um planejamento facial Full Face mais amplo.",
    ],
    topicsHeading: "Regiões e possibilidades de tratamento",
    topics: [
      { title: "Regiões tratadas", text: "Têmporas, região malar (maçãs do rosto), olheiras, fossa piriforme, sulcos nasolabiais, mento e mandíbula." },
      { title: "Suporte e sustentação", text: "Tratamento da causa subjacente da perda de volume para efeito de sustentação natural." },
      { title: "Substância biocompatível", text: "Uso de ácido hialurônico de alta pureza, com integração tecidual suave e absorção previsível." },
    ],
    stepsHeading: "Como é realizado o preenchimento",
    steps: [
      { title: "Mapeamento facial", text: "Identificação dos vetores de sustentação e dos pontos exatos de aplicação." },
      { title: "Aplicação com cânulas", text: "Técnica delicada que reduz o risco de hematomas e proporciona aplicação homogênea." },
      { title: "Ajuste dos contornos", text: "Modelagem suave respeitando a mímica natural do paciente." },
      { title: "Revisão e controle", text: "Reavaliação após o período de acomodação do produto." },
    ],
    faq: [
      { question: "Quais regiões da face podem ser tratadas com preenchimento?", answer: "Têmporas, malar, olheiras, nariz, sulcos nasolabiais, fossa piriforme, lábios, mento e linha da mandíbula, sempre conforme diagnóstico individual." },
      { question: "Quanto tempo dura o preenchimento facial com ácido hialurônico?", answer: "A duração varia conforme a densidade do ácido hialurônico, a área tratada e o metabolismo de cada paciente, com reabsorção biológica gradual." },
      { question: "O preenchimento facial pode deixar o rosto largo ou artificial?", answer: "Não quando realizado com planejamento criterioso, dosagens equilibradas e respeito à anatomia facial. O foco é devolver sustentação e contornos elegantes." },
    ],
    aftercareBody: [
      "Evitar exposição solar intensa, massagens na área tratada e atividade física pesada nas primeiras 24 a 48 horas após a aplicação.",
    ],
    related: [
      { title: "Harmonização facial", href: "/harmonizacao-facial" },
      { title: "Preenchimento labial", href: "/preenchimento-labial" },
      { title: "Perfiloplastia", href: "/perfiloplastia" },
      { title: "Bioestimuladores de colágeno", href: "/bioestimuladores-de-colageno" },
    ],
  },
  {
    slug: "preenchimento-labial",
    title: "Preenchimento Labial com Planejamento Individual",
    specialty: "Estética Orofacial",
    variant: "editorial",
    lead: "dra-sara-michelon",
    description: "Contorno, proporção, hidratação e projeção labial com ácido hialurônico, planejados em equilíbrio com o sorriso e o perfil facial.",
    seoTitle: "Preenchimento Labial em Florianópolis | Dra. Sara Michelon",
    seoDescription: "Preenchimento labial em Florianópolis com planejamento individual. Entenda contorno, proporção, duração, técnica e relação dos lábios com o perfil facial.",
    focusHeading: "Lábios harmoniosos em relação ao sorriso e ao perfil",
    overview: "O preenchimento labial vai além do volume: busca contorno definido, simetria, projeção sutil, hidratação e equilíbrio proporcional entre o lábio superior e o inferior.",
    introParagraphs: [
      "O preenchimento labial pode ter objetivos diversos: contorno nítido, projeção, correção de assimetrias, hidratação ou reposição do volume que diminui com o tempo.",
      "A análise considera a proporção áurea entre lábio superior e inferior, a exposição dos dentes ao falar e sorrir e a relação com o mento e o nariz de perfil.",
      "A técnica prioriza a naturalidade, evitando projeções excessivas ou resultados artificiais.",
    ],
    topicsHeading: "Objetivos do planejamento labial",
    topics: [
      { title: "Definição do contorno e arco do cupido", text: "Realce suave das bordas labiais e sustentação do filtro e arco do cupido." },
      { title: "Proporção e simetria labial", text: "Harmonização proporcional entre lábio superior e inferior respeitando a anatomia natural." },
      { title: "Hidratação e volume natural", text: "Melhora da textura, suavização de linhas periorais e reposição volumétrica delicada." },
    ],
    stepsHeading: "Etapas da aplicação labial",
    steps: [
      { title: "Avaliação da dinâmica do sorriso", text: "Análise dos lábios em repouso e durante o sorriso e a fala." },
      { title: "Anestesia para conforto", text: "Uso de anestésicos tópicos ou bloqueio anestésico para procedimento tranquilo." },
      { title: "Aplicação e modelagem", text: "Injeção cuidadosa de ácido hialurônico específico para lábios com microagulha ou cânula." },
      { title: "Orientações pós-aplicação", text: "Cuidados para o período de cicatrização e revisão após desinchar." },
    ],
    faq: [
      { question: "O preenchimento labial fica sempre com volume exagerado?", answer: "Não. O volume é totalmente dosado e pode ter como objetivo apenas hidratação profunda, desenho do contorno ou discreta projeção, mantendo a expressividade natural." },
      { question: "Quanto tempo dura o preenchimento labial?", answer: "A durabilidade varia de acordo com o produto utilizado, o grau de movimentação da musculatura da boca e o metabolismo de cada organismo." },
      { question: "O procedimento é doloroso?", answer: "Com o uso de anestésicos eficazes e produtos que contêm lidocaína na composição, o procedimento é muito bem tolerado e confortável." },
    ],
    aftercareBody: [
      "Evitar manipular a região, aplicar compressas geladas nas primeiras horas para amenizar o inchaço e aguardar a acomodação final do produto.",
    ],
    related: [
      { title: "Harmonização facial", href: "/harmonizacao-facial" },
      { title: "Preenchimento facial", href: "/preenchimento-facial" },
      { title: "Perfiloplastia", href: "/perfiloplastia" },
    ],
  },
  {
    slug: "botox",
    title: "Toxina Botulínica (Botox) para Linhas de Expressão",
    specialty: "Estética Orofacial",
    variant: "editorial",
    lead: "dra-sara-michelon",
    description: "Tratamento de rugas dinâmicas na testa, glabela e ao redor dos olhos, suavizando marcas de expressão com preservação do movimento natural.",
    seoTitle: "Botox em Florianópolis | Toxina Botulínica e Linhas de Expressão",
    seoDescription: "Botox e toxina botulínica em Florianópolis para linhas de expressão, após avaliação individual da anatomia e movimentação facial. Saiba duração e cuidados.",
    focusHeading: "Movimentação facial e relaxamento muscular personalizado",
    overview: "A toxina botulínica reduz temporariamente a contração de músculos específicos da face, suavizando rugas dinâmicas e prevenindo que linhas de expressão se tornem vincos profundos em repouso.",
    introParagraphs: [
      "A toxina botulínica atua relaxando temporariamente músculos específicos da mímica facial.",
      "É indicada principalmente para o tratamento de rugas dinâmicas na testa (linhas frontais), entre as sobrancelhas (glabela) e ao redor dos olhos (pés de galinha).",
      "Os pontos e dosagens são calculados individualmente para preservar a expressão facial autêntica, evitando o aspecto engessado ou congelado.",
    ],
    topicsHeading: "Áreas tratadas e objetivos clínicos",
    topics: [
      { title: "Rugas dinâmicas da fronte e glabela", text: "Suavização das linhas horizontais da testa e do vinco de 'braveza' entre as sobrancelhas." },
      { title: "Região periorbital e nasal", text: "Atenuação de linhas perioculares ('pés de galinha') e rugas no dorso do nariz ('bunny lines')." },
      { title: "Ação preventiva e terapêutica", text: "Evita que a contração contínua quebre as fibras de colágeno da pele com o passar dos anos." },
    ],
    stepsHeading: "Como é realizada a aplicação",
    steps: [
      { title: "Mapeamento dinâmico", text: "Avaliação da contração muscular solicitando diferentes expressões faciais ao paciente." },
      { title: "Marcação dos pontos", text: "Definição milimétrica dos pontos de injeção e das unidades exatas de toxina botulínica." },
      { title: "Aplicação rápida", text: "Injeções delicadas com microagulhas ultrafinas, praticamente indolores." },
      { title: "Revisão e controle", text: "Consulta de retorno em 14 a 15 dias para checar a simetria e eventuais ajustes finos." },
    ],
    faq: [
      { question: "Quando começam a aparecer os efeitos da toxina botulínica?", answer: "Os primeiros efeitos iniciam entre 3 e 5 dias após a aplicação, com resultado pleno e estabilizado por volta de 14 a 15 dias." },
      { question: "Quanto tempo dura o efeito do Botox?", answer: "O efeito é temporário e costuma durar entre 3 e 5 meses, dependendo da força muscular, do metabolismo individual e da prática de atividade física intensa." },
      { question: "O rosto fica sem expressão ou congelado?", answer: "Não quando a aplicação é planejada por um profissional experiente que respeita os vetores musculares naturais e utiliza doses personalizadas para manter a expressividade." },
    ],
    aftercareBody: [
      "Não deitar nas primeiras 4 horas após a aplicação, não massagear os pontos injetados e evitar atividades físicas intensas no dia do procedimento.",
    ],
    related: [
      { title: "Harmonização facial", href: "/harmonizacao-facial" },
      { title: "Bioestimuladores de colágeno", href: "/bioestimuladores-de-colageno" },
      { title: "Preenchimento facial", href: "/preenchimento-facial" },
      { title: "Bruxismo", href: "/bruxismo" },
    ],
  },
  {
    slug: "bioestimuladores-de-colageno",
    title: "Bioestimulador de Colágeno para Firmeza da Pele",
    specialty: "Estética Orofacial",
    variant: "editorial",
    lead: "dra-sara-michelon",
    description: "Estímulo biológico progressivo para produção de novas fibras de colágeno, promovendo sustentação dérmica, textura e firmeza no rosto.",
    seoTitle: "Bioestimulador de Colágeno em Florianópolis | Dra. Sara",
    seoDescription: "Bioestimulador de colágeno em Florianópolis: entenda para que serve, quando aparece o efeito, número de sessões e como é definido o planejamento.",
    focusHeading: "Estímulo progressivo e regeneração da qualidade da pele",
    overview: "Os bioestimuladores de colágeno são substâncias biocompatíveis que incentivam o organismo a produzir novas fibras colágenas, melhorando a densidade, elasticidade e firmeza cutânea de forma natural.",
    introParagraphs: [
      "Quando o planejamento estético inclui o tratamento da flacidez e da qualidade da pele, os bioestimuladores de colágeno são indicados.",
      "Diferente de preenchedores volumizadores, seu foco principal é a regeneração tecidual, com efeitos graduais e prolongados ao longo dos meses.",
      "O produto, o número de sessões e os intervalos são determinados a partir da maturidade cutânea e do grau de flacidez observado na avaliação.",
    ],
    topicsHeading: "Benefícios dos bioestimuladores",
    topics: [
      { title: "Firmeza e melhora da espessura dérmica", text: "Recuperação da sustentação e do tônus da pele em áreas com perda de elasticidade." },
      { title: "Efeito progressivo e duradouro", text: "A produção de colágeno atinge seu pico nas semanas e meses posteriores à aplicação." },
      { title: "Protocolo individualizado de sessões", text: "Planejamento da quantidade de sessões de acordo com as necessidades biológicas da pele." },
    ],
    stepsHeading: "Etapas do tratamento com bioestimuladores",
    steps: [
      { title: "Avaliação dérmica", text: "Análise da flacidez, textura e áreas de perda de ancoragem tecidual." },
      { title: "Aplicação subdérmica", text: "Distribuição homogênea do bioestimulador com cânula sob anestesia local." },
      { title: "Massagem e orientações", text: "Massagem suave na clínica e instruções de cuidados domiciliares pós-aplicação." },
      { title: "Acompanhamento da neocolagênese", text: "Revisão dos resultados em 30 a 60 dias para acompanhamento da produção de colágeno." },
    ],
    faq: [
      { question: "Bioestimulador de colágeno dá volume ou deforma o rosto?", answer: "Não. O principal objetivo dos bioestimuladores é tratar a qualidade, espessura e firmeza da pele, sem volumização excessiva ou alteração dos traços fisionômicos." },
      { question: "Quantas sessões de bioestimulador são necessárias?", answer: "O número de sessões depende do grau de flacidez, da idade e da resposta biológica individual, sendo definido durante a avaliação clínica." },
      { question: "Quando os resultados começam a ser visíveis?", answer: "A síntese de colágeno é um processo biológico progressivo. As primeiras melhoras na firmeza e textura começam a ser notadas a partir de 30 a 60 dias após a aplicação." },
    ],
    aftercareBody: [
      "Seguir a orientação de massagens suaves nos primeiros dias conforme prescrito e manter hidratação e proteção solar diária para potencializar o estímulo de colágeno.",
    ],
    related: [
      { title: "Harmonização facial", href: "/harmonizacao-facial" },
      { title: "Toxina botulínica", href: "/botox" },
      { title: "Preenchimento facial", href: "/preenchimento-facial" },
    ],
  },
  {
    slug: "perfiloplastia",
    title: "Perfiloplastia: Equilíbrio entre Nariz, Lábios e Mento",
    specialty: "Estética Orofacial",
    variant: "editorial",
    lead: "dra-sara-michelon",
    description: "Harmonização não cirúrgica das proporções do perfil facial, equilibrando a relação tridimensional entre ângulo nasal, lábios e queixo.",
    seoTitle: "Perfiloplastia em Florianópolis | Harmonização do Perfil",
    seoDescription: "Perfiloplastia em Florianópolis para avaliação da relação entre nariz, lábios e mento. Entenda como funciona, indicações e possibilidades não cirúrgicas.",
    focusHeading: "O perfil analisado como uma relação harmônica entre estruturas",
    overview: "A perfiloplastia avalia a harmonia das linhas estéticas de perfil. Ajustes estratégicos com ácido hialurônico no queixo (mento), lábios ou nariz equilibram as proporções faciais sem cirurgia plástica invasiva.",
    introParagraphs: [
      "A perfiloplastia compreende a avaliação integrada das estruturas vistas de perfil, com foco especial na relação entre nariz, projeção labial e queixo (mento).",
      "Em muitos pacientes, pequenas intervenções em pontos anatômicos estratégicos modificam a percepção de todo o perfil sem necessidade de intervir em todas as áreas.",
      "A indicação é totalmente personalizada e baseada na análise das proporções estéticas individuais.",
    ],
    topicsHeading: "Pontos de análise no perfil facial",
    topics: [
      { title: "Projeção do mento (queixo)", text: "Estruturação e avanço sutil do queixo para alinhar o terço inferior e definir o contorno mandibular." },
      { title: "Projeção e curvatura labial", text: "Ajuste milimétrico do volume e projeção dos lábios em harmonia com a linha facial." },
      { title: "Rinomodelação quando indicada", text: "Refinamento não cirúrgico do dorso ou elevação suave da ponta nasal com ácido hialurônico." },
    ],
    stepsHeading: "Como funciona o planejamento do perfil",
    steps: [
      { title: "Fotografia e análise de perfil", text: "Registro fotográfico e medição das linhas e ângulos estéticos de perfil." },
      { title: "Planejamento dos pontos estratégicos", text: "Identificação do ponto de maior impacto para o equilíbrio do perfil." },
      { title: "Aplicação de ácido hialurônico", text: "Injeção estrutural precisa para sustentação e modelagem das proporções." },
      { title: "Revisão e acompanhamento", text: "Checagem do equilíbrio tridimensional após a acomodação do preenchedor." },
    ],
    faq: [
      { question: "O que é perfiloplastia?", answer: "É o planejamento e harmonização das relações do perfil da face, considerando de forma integrada a proporção entre o nariz, os lábios e o queixo (mento)." },
      { question: "A perfiloplastia não cirúrgica é permanente?", answer: "Não. Os procedimentos utilizam ácido hialurônico de alta sustentação, que é reabsorvido gradualmente pelo organismo e permite manutenções programadas." },
      { question: "É preciso tratar o nariz, lábios e queixo ao mesmo tempo?", answer: "Não. Frequentemente, a intervenção em apenas um ponto chave (como a projeção do mento) é suficiente para reequilibrar todo o perfil facial." },
    ],
    aftercareBody: [
      "Evitar apoiar peso sobre o queixo ou nariz nas primeiras 48h e seguir as orientações pós-procedimento para perfeita acomodação tecidual.",
    ],
    related: [
      { title: "Harmonização facial", href: "/harmonizacao-facial" },
      { title: "Preenchimento facial", href: "/preenchimento-facial" },
      { title: "Preenchimento labial", href: "/preenchimento-labial" },
    ],
  },
  {
    slug: "enxerto-osseo-dentario",
    title: "Enxerto Ósseo para Implante Dentário",
    specialty: "Implantodontia",
    variant: "process",
    lead: "dra-sara-michelon",
    description: "Reconstrução de volume e espessura óssea com biomateriais modernos para viabilizar a ancoragem segura de implantes dentários.",
    seoTitle: "Enxerto Ósseo para Implante em Florianópolis | Dra. Sara",
    seoDescription: "Enxerto ósseo para implante em Florianópolis: entenda quando pode ser indicado, exames, etapas, recuperação e relação com o implante dentário.",
    focusHeading: "Reconstrução de suporte ósseo para a longevidade do implante",
    overview: "Quando a perda dentária causa redução do volume ósseo, procedimentos de enxerto ósseo ou levantamento de seio maxilar restabelecem a base anatômica necessária para a instalação firme e duradoura de implantes.",
    introParagraphs: [
      "A perda de dentes e o tempo decorrido sem reposição frequentemente provocam a reabsorção fisiológica do osso alveolar.",
      "Quando a altura ou espessura óssea remanescente é insuficiente para fixar um implante, procedimentos de reconstrução óssea são indicados.",
      "Conforme o caso e o planejamento tomográfico, o enxerto pode ser realizado no mesmo momento da cirurgia do implante ou em uma etapa cirúrgica prévia.",
    ],
    topicsHeading: "Aspectos do procedimento de enxerto ósseo",
    topics: [
      { title: "Planejamento tomográfico 3D", text: "Avaliação milimétrica do volume e densidade óssea para escolha da técnica mais conservadora." },
      { title: "Enxerto imediato ou prévio", text: "Definição do momento cirúrgico ideal baseado na estabilidade e na extensão do defeito ósseo." },
      { title: "Levantamento de seio maxilar", text: "Técnica específica para ganho de altura óssea na região posterior superior da maxila." },
    ],
    stepsHeading: "Etapas da reconstrução óssea",
    steps: [
      { title: "Tomografia computadorizada", text: "Mapeamento tridimensional da anatomia óssea e das estruturas vizinhas." },
      { title: "Cirurgia de enxertia", text: "Aplicação do biomaterial com técnica asséptica rigorosa e opção de sedação planejada." },
      { title: "Fase de maturação óssea", text: "Período de integração e neoformação óssea monitorado radiograficamente." },
      { title: "Instalação do implante", text: "Posicionamento do implante sobre o osso neoformado com excelente estabilidade." },
    ],
    faq: [
      { question: "Todo implante precisa de enxerto ósseo?", answer: "Não. O enxerto só é indicado quando o volume ósseo existente não oferece espessura ou altura suficientes para ancorar o implante com segurança a longo prazo." },
      { question: "O enxerto pode ser feito junto com o implante?", answer: "Sim, em muitos casos em que o implante obtém estabilidade mecânica primária no osso nativo, o enxerto para complementação de volume é realizado no mesmo procedimento." },
      { question: "Quanto tempo leva a cicatrização do enxerto ósseo?", answer: "O tempo de maturação óssea varia de 4 a 8 meses, dependendo da técnica, do tipo de biomaterial e da resposta biológica individual." },
    ],
    aftercareBody: [
      "Seguir rigorosamente o repouso recomendado, evitar pressão na região enxertada e manter a medicação prescrita para garantir a cicatrização óssea ideal.",
    ],
    related: [
      { title: "Implantes dentários", href: "/implantes-dentarios" },
      { title: "Prótese protocolo", href: "/protese-protocolo" },
      { title: "Periodontia", href: "/periodontia" },
    ],
  },
  {
    slug: "extracao-de-siso",
    title: "Extração de Siso: Avaliação e Cirurgia",
    specialty: "Cirurgia Oral",
    variant: "symptom-led",
    lead: "dra-sara-michelon",
    description: "Avaliação clínica e por imagem para remoção segura de sisos inclusos, impactados ou inflamados, com acompanhamento pós-operatório dedicado.",
    seoTitle: "Extração de Siso em Florianópolis | Avaliação e Cirurgia",
    seoDescription: "Extração de siso em Florianópolis com avaliação clínica e por imagem. Entenda indicações, cirurgia, recuperação e sinais que pedem atendimento.",
    focusHeading: "Indicação cirúrgica individualizada e avaliação por imagem",
    overview: "Nem todo siso precisa ser extraído. A cirurgia é indicada quando há dor, inflamação recorrente, falta de espaço, dentes inclusos ou risco para estruturas próximas e dentes vizinhos.",
    introParagraphs: [
      "Os dentes do siso (terceiros molares) nem sempre precisam ser removidos. A decisão cirúrgica baseia-se na posição, espaço na arcada, higiene e presença de sintomas ou riscos associados.",
      "Sisos inclusos, parcialmente erupcionados ou mal posicionados podem provocar episódios de pericoronarite (inflamação gengival), cáries nos dentes vizinhos ou reabsorções radiculares.",
      "A avaliação inclui exame clínico e radiografia panorâmica, além de tomografia computadorizada quando há proximidade com o nervo alveolar inferior.",
    ],
    topicsHeading: "Quando a extração dos sisos é recomendada",
    topics: [
      { title: "Dor, inchaço ou pericoronarite", text: "Episódios recorrentes de dor ou inflamação ao redor do dente parcialmente erupcionado." },
      { title: "Sisos inclusos ou impactados", text: "Dentes retidos no osso ou inclinados contra as raízes dos segundos molares vizinhos." },
      { title: "Avaliação tridimensional por tomografia", text: "Exame complementar para garantir total segurança em raízes próximas ao canal mandibular." },
    ],
    stepsHeading: "Etapas da cirurgia de siso",
    steps: [
      { title: "Exame clínico e radiografia", text: "Análise da anatomia das raízes, posição do siso e estruturas vizinhas." },
      { title: "Planejamento cirúrgico", text: "Definição de técnica cirúrgica minimamente invasiva e possibilidade de sedação." },
      { title: "Procedimento cirúrgico", text: "Extração cuidadosa com preservação do tecido ósseo e sutura adequada." },
      { title: "Pós-operatório e remoção de pontos", text: "Prescrição de medicações, orientações de repouso e acompanhamento da cicatrização." },
    ],
    faq: [
      { question: "Todo dente do siso precisa ser extraído?", answer: "Não. Sisos que nasceram totalmente alinhados, possuem dente antagonista para mastigação e permitem boa higienização podem ser mantidos sob acompanhamento clínico regular." },
      { question: "Preciso fazer tomografia para tirar o siso?", answer: "A radiografia panorâmica é o exame inicial padrão. A tomografia é indicada em situações específicas, principalmente quando as raízes do siso inferior estão muito próximas do nervo alveolar." },
      { question: "Posso retirar os quatro sisos de uma vez?", answer: "Sim. Em muitos pacientes é viável e conveniente extrair os quatro sisos no mesmo procedimento. Em casos mais complexos, pode ser preferível dividir a cirurgia em duas etapas." },
      { question: "Quanto tempo demora a recuperação?", answer: "O repouso inicial costuma ser de 2 a 3 dias para atividades físicas mais intensas. O inchaço diminui gradualmente e os pontos são removidos em torno de 7 a 10 dias." },
    ],
    aftercareBody: [
      "Após a extração, repouso relativo, compressas frias nas primeiras 48h, alimentação fria/pastosa e uso correto das medicações prescritas asseguram uma recuperação rápida e confortável.",
    ],
    related: [
      { title: "Periodontia", href: "/periodontia" },
      { title: "Tratamento de canal", href: "/tratamento-de-canal" },
      { title: "Manutenção odontológica", href: "/manutencao-odontologica" },
    ],
  },
  {
    slug: "manutencao-odontologica",
    title: "Manutenção e Acompanhamento Odontológico",
    specialty: "Prevenção",
    variant: "hub",
    lead: "dra-sara-michelon",
    description: "Revisões periódicas ajudam a acompanhar dentes, gengiva, restaurações, próteses, implantes e hábitos ao longo do tempo.",
    seoTitle: "Manutenção e Acompanhamento Odontológico | Dra. Sara Michelon",
    seoDescription: "Manutenção odontológica nos Ingleses, Florianópolis, com acompanhamento de dentes, gengiva, restaurações, próteses, implantes e tratamentos estéticos.",
    focusHeading: "O acompanhamento faz parte do tratamento",
    overview: "A frequência de retorno não é igual para todos. Risco de cárie, condição periodontal, tipo de reabilitação, higiene e hábitos orientam o intervalo e os cuidados.",
    introParagraphs: [
      "A conclusão de um tratamento odontológico marca o início de uma nova fase: a manutenção da saúde, da função e da estética alcançadas.",
      "Revisões periódicas permitem avaliar precocemente pequenas alterações na gengiva, dentes, restaurações e implantes, evitando tratamentos mais extensos no futuro.",
      "O intervalo entre as consultas é personalizado conforme o perfil de risco, a qualidade da higienização e os procedimentos reabilitadores realizados.",
    ],
    topicsHeading: "Pilares da manutenção preventiva",
    topics: [
      { title: "Saúde bucal e gengival", text: "Exame clínico de dentes, gengiva, higiene e sinais precoces de desmineralização ou inflamação." },
      { title: "Controle dos trabalhos realizados", text: "Monitoramento de restaurações, facetas, lentes, próteses, implantes e contenções ortodônticas." },
      { title: "Orientações personalizadas", text: "Ajuste contínuo da rotina de escovação, uso de fio dental e controle de hábitos paraferais." },
    ],
    stepsHeading: "Como funciona a consulta de manutenção",
    steps: [
      { title: "Exame clínico detalhado", text: "Inspeção visual e tátil de todas as estruturas dentárias e tecidos moles." },
      { title: "Profilaxia e remoção de biofilme", text: "Limpeza profissional com ultrassom e polimento de dentes e restaurações." },
      { title: "Checagem oclusal", text: "Verificação dos contatos da mordida e adaptação de placas de bruxismo." },
      { title: "Planejamento do próximo retorno", text: "Definição do intervalo ideal para a próxima visita preventiva." },
    ],
    faq: [
      { question: "Com que frequência devo fazer a manutenção?", answer: "O intervalo varia de 3 a 6 meses conforme a necessidade clínica, o histórico periodontal e o tipo de reabilitação realizada." },
      { question: "Manutenção é apenas limpeza?", answer: "Não. A manutenção inclui exame clínico minucioso, diagnóstico precoce, verificação de próteses e implantes, checagem da mordida e profilaxia profissional." },
      { question: "Quem tem implantes precisa de manutenção?", answer: "Sim. A saúde dos tecidos ao redor dos implantes e o aperto dos parafusos protéticos necessitam de controle periódico para evitar peri-implantite." },
    ],
    aftercareBody: [
      "Manter a rotina de higiene diária com escovação adequada, fio dental e retornos periódicos conforme o cronograma preventivo estabelecido."
    ],
    related: [
      { title: "Limpeza dental", href: "/limpeza-dental" },
      { title: "Periodontia", href: "/periodontia" },
      { title: "Implantes dentários", href: "/implantes-dentarios" },
    ],
  },
  {
    slug: "limpeza-dental",
    title: "Limpeza Dentária e Profilaxia",
    specialty: "Prevenção",
    variant: "process",
    lead: "dra-sara-michelon",
    contentStatus: "partial",
    source: "matrix-supported",
    description: "A profilaxia profissional integra a prevenção e é indicada conforme presença de placa, cálculo, manchas e condição gengival.",
    seoTitle: "Limpeza Dental em Florianópolis | Profilaxia nos Ingleses",
    seoDescription: "Limpeza dental e profilaxia nos Ingleses, Florianópolis. Entenda avaliação, remoção de placa e cálculo e cuidados de manutenção.",
    focusHeading: "Limpeza profissional começa pela avaliação",
    overview: "O atendimento diferencia placa, cálculo, manchas e alterações gengivais para escolher os recursos necessários. A limpeza não substitui o diagnóstico periodontal.",
    introParagraphs: [
      "A profilaxia dental profissional remove a placa bacteriana calcificada (tártaro) e manchas superficiais que a escovação caseira não consegue eliminar.",
      "O procedimento é adaptado à sensibilidade e às características de cada paciente, utilizando ultrassom odontológico e pastas de polimento.",
      "Quando há sangramento ou bolsas periodontais, a profilaxia é integrada ao tratamento periodontal especializado."
    ],
    topicsHeading: "Focos do cuidado profilático",
    topics: [
      { title: "Remoção de placa e tártaro", text: "Eliminação criteriosa de depósitos bacterianos supra e subgengivais superficiais." },
      { title: "Polimento e remoção de manchas", text: "Suavização das superfícies dentais e remoção de pigmentações externas de café, chá e alimentos." },
      { title: "Orientações de higiene", text: "Instruções práticas sobre técnicas de escovação e uso adequado do fio dental." },
    ],
    stepsHeading: "Etapas da profilaxia profissional",
    steps: [
      { title: "Avaliação inicial", text: "Exame das condições gengivais e identificação de acúmulos de cálculo." },
      { title: "Ultrassom odontológico", text: "Desprendimento seguro e rápido do tártaro com água e vibração ultrassônica." },
      { title: "Polimento coronário", text: "Aplicação de pasta profilática para deixar a superfície lisa e brilhante." },
      { title: "Aplicação tópica preventiva", text: "Aplicação de flúor ou agentes dessensibilizantes quando indicados." },
    ],
    faq: [
      { question: "Limpeza dental e tratamento periodontal são iguais?", answer: "Não. A limpeza preventiva atua na remoção de tártaro superficial em gengivas saudáveis. O tratamento periodontal é indicado para tratar infecções ativas e bolsas gengivais profundas." },
      { question: "A limpeza clareia os dentes?", answer: "A profilaxia remove manchas superficiais e devolve a cor natural do esmalte, mas não altera a tonalidade intrínseca do dente como faz o clareamento dental." },
    ],
    aftercareBody: [
      "Manter a higiene oral rigorosa após a limpeza para prolongar a sensação de dentes lisos e prevenir a formação rápida de novo tártaro."
    ],
    related: [
      { title: "Manutenção odontológica", href: "/manutencao-odontologica" },
      { title: "Periodontia", href: "/periodontia" },
      { title: "Clareamento dental", href: "/clareamento-dental" },
    ],
  },
  {
    slug: "proteses-dentarias",
    title: "Próteses Dentárias: Opções Fixas e Removíveis",
    specialty: "Reabilitação Oral",
    variant: "hub",
    lead: "dra-sara-michelon",
    contentStatus: "partial",
    source: "matrix-supported",
    description: "Próteses podem repor dentes ou recuperar estruturas comprometidas; a escolha depende do suporte disponível, da função e do plano de manutenção.",
    seoTitle: "Próteses Dentárias em Florianópolis | Fixas e Removíveis",
    seoDescription: "Próteses dentárias fixas e removíveis em Florianópolis, com avaliação do suporte, mordida, estética, adaptação e manutenção.",
    focusHeading: "A prótese é definida pelo que precisa ser reabilitado",
    overview: "Número de dentes, condição dos dentes remanescentes, gengiva, osso, mordida e possibilidade de implantes mudam as alternativas. A indicação final depende dessa avaliação integrada.",
    introParagraphs: [
      "A perda de dentes compromete a mastigação, a musculatura facial e a digestão.",
      "As próteses dentárias restabelecem a função mastigatória e a harmonia estética, podendo ser fixas (sobre dentes ou implantes) ou removíveis parciais e totais.",
      "Cada caso é planejado considerando o suporte biológico remanescente, o equilíbrio da mordida e o conforto diário do paciente."
    ],
    topicsHeading: "Tipos de reabilitação protética",
    topics: [
      { title: "Coroas e pontes fixas", text: "Restauração de dentes severamente destruídos ou reposição de dentes ausentes apoiados em dentes vizinhos ou implantes." },
      { title: "Próteses sobre implantes", text: "Excelente retenção e estabilidade mastigatória sem apoios móveis na mucosa." },
      { title: "Próteses removíveis", text: "Soluções convencionais planejadas com adaptação anatômica rigorosa e distribuição de cargas." },
    ],
    stepsHeading: "Etapas da reabilitação protética",
    steps: [
      { title: "Avaliação do suporte", text: "Exame clínico e radiográfico das raízes, gengiva e osso remanescentes." },
      { title: "Preparo e moldagem/escaneamento", text: "Preparo cuidadoso dos pilares e registro digital das arcadas." },
      { title: "Provas estéticas e funcionais", text: "Ajuste milimétrico de oclusão, altura da mordida, formato e tonalidade." },
      { title: "Instalação e acompanhamento", text: "Fixação definitiva ou entrega com instruções de adaptação e higienização." },
    ],
    faq: [
      { question: "Qual é a melhor prótese dentária?", answer: "Não existe uma única prótese ideal para todos. A escolha entre fixa, sobre implantes ou removível depende da quantidade de dentes ausentes, da estrutura óssea e das condições clínicas individuais." },
      { question: "Prótese dentária precisa de manutenção?", answer: "Sim. Próteses fixas e removíveis necessitam de revisões regulares para checagem da adaptação, da gengiva de suporte e da mordida." },
    ],
    aftercareBody: [
      "Higiene diária minuciosa e consultas periódicas para controle da saúde dos tecidos e verificação dos contatos oclusais."
    ],
    related: [
      { title: "Reabilitação oral", href: "/reabilitacao-oral" },
      { title: "Implantes dentários", href: "/implantes-dentarios" },
      { title: "Prótese protocolo", href: "/protese-protocolo" },
    ],
  },
  {
    slug: "clareamento-dental",
    title: "Clareamento Dental Supervisionado",
    specialty: "Odontologia estética",
    variant: "editorial",
    lead: "dra-sara-michelon",
    contentStatus: "partial",
    source: "matrix-supported",
    description: "O clareamento é planejado depois de avaliar dentes, restaurações, gengiva, sensibilidade e a origem das alterações de cor.",
    seoTitle: "Clareamento Dental em Florianópolis | Avaliação Supervisionada",
    seoDescription: "Clareamento dental supervisionado em Florianópolis. Avaliação de cor, sensibilidade, restaurações e opções de tratamento conforme o caso.",
    focusHeading: "Cor, saúde e sensibilidade precisam ser avaliadas",
    overview: "O clareamento atua sobre dentes naturais e não modifica da mesma forma restaurações ou próteses. A avaliação identifica limitações e organiza a técnica e o acompanhamento.",
    introParagraphs: [
      "O clareamento dental é um procedimento seguro e eficaz para clarear os dentes naturais por meio de agentes oxidantes que quebram moléculas de pigmento no esmalte e na dentina.",
      "A indicação exige avaliação prévia para certificar a ausência de cáries ativas, trincas ou problemas gengivais que possam causar sensibilidade acentuada.",
      "Pode ser realizado com moldeiras personalizadas para uso supervisionado em casa, no consultório ou em protocolo combinado, conforme a rotina do paciente."
    ],
    topicsHeading: "Critérios do clareamento supervisionado",
    topics: [
      { title: "Dentes naturais vs Restaurações", text: "Restaurações em resina e porcelanas não clareiam e podem requerer substituição após a estabilização da cor." },
      { title: "Controle de sensibilidade", text: "Protocolo individualizado com géis dessensibilizantes antes e durante o tratamento." },
      { title: "Clareamento antes de facetas", text: "Uniformização prévia do substrato dental para viabilizar facetas mais finas e conservadoras." },
    ],
    stepsHeading: "Como é realizado o clareamento",
    steps: [
      { title: "Avaliação inicial e profilaxia", text: "Registro da cor inicial com escala odontológica e limpeza profissional prévia." },
      { title: "Definição do protocolo", text: "Escolha da concentração ideal do gel clareador e confecção de moldeiras sob medida." },
      { title: "Aplicação e acompanhamento", text: "Uso do gel com monitoramento periódico da evolução da cor e da sensibilidade." },
      { title: "Estabilização da cor", text: "Avaliação final após 14 dias do término para verificar a fixação da nova tonalidade." },
    ],
    faq: [
      { question: "Clareamento dental muda a cor de restaurações e facetas?", answer: "Não. Os agentes clareadores atuam apenas sobre a estrutura mineral do dente natural. Restaurações antigas podem ser trocadas após o clareamento para harmonizar a cor." },
      { question: "Clareamento dental causa sensibilidade?", answer: "Sensibilidade transitória pode ocorrer durante o tratamento. Utilizamos protocolos personalizados e agentes dessensibilizantes modernos para proporcionar máximo conforto." },
    ],
    aftercareBody: [
      "Evitar alimentos com corantes intensos nos primeiros dias após o procedimento e manter a higiene diária para prolongar a luminosidade do sorriso."
    ],
    related: [
      { title: "Facetas de resina", href: "/facetas-de-resina" },
      { title: "Lentes de contato dental", href: "/lentes-de-contato-dental" },
      { title: "Limpeza dental", href: "/limpeza-dental" },
    ],
  },
  {
    slug: "inlays-onlays",
    title: "Inlays e Onlays: Restaurações Indiretas em Porcelana",
    specialty: "Dentística",
    variant: "process",
    lead: "dra-sara-michelon",
    contentStatus: "partial",
    source: "matrix-supported",
    description: "Restaurações indiretas podem ser consideradas quando a perda de estrutura exige reconstrução planejada fora da boca.",
    seoTitle: "Inlays e Onlays em Florianópolis | Restaurações Indiretas",
    seoDescription: "Inlays e onlays em Florianópolis: entenda quando restaurações indiretas podem ser indicadas para recuperar estrutura, forma e função dental.",
    focusHeading: "Preservar estrutura dental e recuperar a função mastigatória",
    overview: "Extensão da perda, resistência remanescente, mordida, material e possibilidade de adesão orientam a escolha entre restauração direta, indireta ou outra reabilitação.",
    introParagraphs: [
      "Inlays, onlays e overlays são restaurações indiretas parciais confeccionadas em porcelana ou resina laboratorial para reconstruir dentes posteriores com perdas moderadas a severas de estrutura.",
      "Diferente das coroas totais, que exigem desgaste de toda a circunferência do dente, as restaurações indiretas preservam todas as cúspides e paredes saudáveis restantes.",
      "Proporcionam excelente vedação marginal, resistência mastigatória superior e alta durabilidade estética."
    ],
    topicsHeading: "Indicações de restaurações indiretas",
    topics: [
      { title: "Preservação máxima de cúspides", text: "Reconstrução precisa da anatomia oclusal mantendo a estrutura dental sadia remanescente." },
      { title: "Cerâmica de alta resistência", text: "Material vítreo que não desgasta facilmente e distribui forças mastigatórias com segurança." },
      { title: "Dentes tratados endodonticamente", text: "Proteção ideal contra fraturas em dentes posteriores após tratamento de canal." },
    ],
    stepsHeading: "Etapas da restauração indireta",
    steps: [
      { title: "Preparo conservador e escaneamento", text: "Remoção de cárie ou restauração antiga e captura digital 3D do dente preparado." },
      { title: "Confecção laboratorial precisa", text: "Escultura da peça em cerâmica odontológica com ajuste milimétrico dos contatos." },
      { title: "Cimentação adesiva", text: "Fixação da peça com cimento resinoso sob isolamento absoluto para vedamento hermético." },
      { title: "Ajuste oclusal e polimento", text: "Checagem minuciosa dos contatos da mordida e acabamento das margens." },
    ],
    faq: [
      { question: "Qual a diferença entre uma restauração comum e um inlay/onlay?", answer: "A restauração comum é feita diretamente na boca com resina composta. O inlay/onlay é uma peça cerâmica esculpida fora da boca com precisão laboratorial, oferecendo maior resistência mecânica em perdas estruturais extensas." },
      { question: "Inlay/onlay é a mesma coisa que coroa?", answer: "Não. A coroa recobre o dente inteiro. O inlay/onlay é uma restauração parcial que preserva as paredes e cúspides saudáveis do dente, sendo muito mais conservador." },
    ],
    aftercareBody: [
      "Manter a higienização com escova e fio dental nas margens da restauração e consultas de revisão para monitorar a integridade adesiva."
    ],
    related: [
      { title: "Reabilitação oral", href: "/reabilitacao-oral" },
      { title: "Tratamento de canal", href: "/tratamento-de-canal" },
      { title: "Próteses dentárias", href: "/proteses-dentarias" },
    ],
  },
  {
    slug: "fechamento-de-diastemas",
    title: "Fechamento de Diastemas: Opções para Dentes Separados",
    specialty: "Odontologia estética",
    variant: "image-led",
    lead: "dra-sara-michelon",
    contentStatus: "partial",
    source: "matrix-supported",
    description: "Espaços entre dentes podem ser tratados com ortodontia, resina ou cerâmica, conforme causa, proporções, mordida e saúde gengival.",
    seoTitle: "Fechamento de Diastema em Florianópolis | Opções de Tratamento",
    seoDescription: "Fechamento de diastema em Florianópolis: conheça opções com ortodontia, resina ou cerâmica e os critérios para planejar dentes separados.",
    focusHeading: "Primeiro é preciso entender a causa do espaço entre os dentes",
    overview: "Tamanho e posição dos dentes, freio labial, gengiva, mordida e estabilidade interferem na escolha. Fechar o espaço sem avaliar essas relações pode comprometer proporção ou manutenção.",
    introParagraphs: [
      "Diastema é o espaço ou espaçamento visível entre dois ou mais dentes, frequentemente encontrado nos dentes anteriores centrais.",
      "As causas podem envolver desproporção entre tamanho dos dentes e tamanho do arco ósseo, inserção baixa do freio labial, ausências dentárias ou hábitos de pressão lingual.",
      "O tratamento pode ser conduzido por movimentação ortodôntica (fechamento dos espaços), acréscimo de resina composta direta ou lentes de contato cerâmicas."
    ],
    topicsHeading: "Abordagens para fechamento de diastemas",
    topics: [
      { title: "Ortodontia e alinhadores", text: "Aproximação dos dentes e redistribuição proporcional dos espaços quando indicado." },
      { title: "Resina composta direta", text: "Acréscimo estético conservador sem preparo dental para fechamento imediato do espaço." },
      { title: "Lentes de porcelana", text: "Harmonização de forma, largura e proporção com estabilidade cerâmica em múltiplos dentes." },
    ],
    stepsHeading: "Como é definido o tratamento do diastema",
    steps: [
      { title: "Diagnóstico causal", text: "Investigação da origem do espaço (freio labial, mordida, tamanho dental e oclusão)." },
      { title: "Análise de proporção estética", text: "Medição da largura dental para garantir que o fechamento resulte em dentes com formato natural." },
      { title: "Execução da técnica indicada", text: "Movimentação com alinhadores ou escultura restauradora com resina/cerâmica." },
      { title: "Estabilização e acompanhamento", text: "Uso de contenção ou acompanhamento periodontal para evitar a reabertura do espaço." },
    ],
    faq: [
      { question: "Todo diastema precisa ser fechado?", answer: "Não. Se o diastema não compromete a fonética, a mastigação ou a saúde periodontal, e faz parte da identidade do sorriso do paciente, ele pode ser mantido." },
      { question: "Fechar diastema com resina desgasta os dentes?", answer: "Na quase totalidade dos casos, o fechamento de diastema com resina é realizado sem nenhum desgaste dental, apenas acrescentando material nas laterais dos dentes." },
    ],
    aftercareBody: [
      "Uso de fio dental diário com técnica correta para evitar acúmulo de placa nas margens cervicais e revisões preventivas regulares."
    ],
    related: [
      { title: "Facetas de resina", href: "/facetas-de-resina" },
      { title: "Ortodontia", href: "/ortodontia" },
      { title: "Lentes de contato dental", href: "/lentes-de-contato-dental" },
    ],
  },
];

export const fallbackTreatments = Object.fromEntries(treatmentSeeds.map((seed) => [seed.slug, createTreatment(seed)])) as Record<string, Treatment>;

export const fallbackPages: Record<string, InstitutionalPage> = {
  home: {
    contentType: "page",
    slug: "home",
    eyebrow: "Odontologia Estética – Ingleses - Florianópolis",
    title: "Dentista nos Ingleses: Odontologia Estética e planejamento individual",
    description: "Clínica odontológica nos Ingleses, Norte da Ilha de Florianópolis, com mais de 20 anos de experiência em Odontologia. Do cuidado com a saúde bucal à estética do sorriso e da face, cada tratamento é definido a partir de uma avaliação cuidadosa, considerando suas necessidades e prioridades.",
    image: "/images/real/sara/sara-home-hero-17.webp",
    imageAlt: "Dra. Sara Michelon em consultório odontológico",
    seo: {
      title: "Dentista nos Ingleses: Odontologia Estética | Dra. Sara Michelon",
      description: "Clínica odontológica nos Ingleses, Florianópolis, com mais de 20 anos de experiência em Odontologia. Conheça a clínica da Dra. Sara Michelon e agende sua avaliação.",
      canonical: "/",
      index: true,
    },
  },
  clinica: {
    contentType: "page", slug: "clinica", eyebrow: "A clínica", title: "Uma clínica organizada para avaliar, planejar e acompanhar", description: "Ambientes nos Ingleses, Norte da Ilha, conectados a uma experiência de atendimento clara e individual.", image: "/images/real/clinica/clinic-consultorio-1-novo.webp", imageAlt: "Consultório 1 com nova cadeira odontológica anatômica e mesa de atendimento", seo: { title: "Clínica Odontológica nos Ingleses | Dra. Sara Michelon", description: "Conheça os ambientes da clínica odontológica da Dra. Sara Michelon nos Ingleses, Florianópolis.", canonical: "/clinica", index: true },
    sections: [
      {
        _key: "clinic-pillars",
        _type: "cardGrid",
        heading: "Estrutura, Tecnologia e Biossegurança a Serviço do Seu Cuidado",
        items: [
          { title: "Estrutura & Conforto", text: "Ambientes privativos, climatizados e com acústica planejada na Torre Comercial do Ingleses Saúde & Office. Acessibilidade total e estacionamento rotativo." },
          { title: "Tecnologia & Precisão", text: "Integração de diagnóstico digital, escaneamento intraoral e tomografia computadorizada para intervenções minimamente invasivas." },
          { title: "Biossegurança Rigorosa", text: "Processos hospitalares de assepsia, esterilização monitorada em autoclave e rastreabilidade sanitária total para sua segurança." }
        ]
      }
    ],
  },
  equipe: {
    contentType: "page", slug: "equipe", eyebrow: "Equipe odontológica", title: "Especialistas conectados ao planejamento integrado", description: "Cada caso pode envolver diferentes necessidades. A equipe organiza essas relações em um plano único, com responsabilidades clínicas claras.", image: "/images/real/equipe/team-main.webp", imageAlt: "Equipe da clínica da Dra. Sara Michelon", seo: { title: "Equipe de Dentistas em Florianópolis | Dra. Sara Michelon", description: "Conheça a equipe odontológica da clínica da Dra. Sara Michelon nos Ingleses, Florianópolis.", canonical: "/equipe", index: true },
  },
  odontologia: {
    contentType: "page", slug: "odontologia", eyebrow: "Odontologia", title: "Tratamentos odontológicos nos Ingleses, Florianópolis", description: "Prevenção, estética do sorriso, reabilitação, cirurgia e ortodontia organizadas a partir de um planejamento integrado.", image: "/images/real/tecnologia/planning-digital-scan.webp", imageAlt: "Planejamento odontológico digital e escaneamento", seo: { title: "Odontologia nos Ingleses e Florianópolis | Dra. Sara Michelon", description: "Tratamentos odontológicos nos Ingleses, Florianópolis, organizados por necessidade e com planejamento individual.", canonical: "/odontologia", index: true },
    linkGroups: [
      { title: "Estética do sorriso", items: [{ title: "Facetas de resina", href: "/facetas-de-resina", description: "Forma, proporção e cor com planejamento conservador." }, { title: "Lentes e facetas de porcelana", href: "/lentes-de-contato-dental", description: "Planejamento digital, mock-up e material cerâmico." }, { title: "Clareamento dental", href: "/clareamento-dental", description: "Avaliação supervisionada de cor, sensibilidade e restaurações." }, { title: "Fechamento de diastemas", href: "/fechamento-de-diastemas", description: "Ortodontia, resina ou cerâmica conforme a causa do espaço." }] },
      { title: "Implantes e reabilitação", items: [{ title: "Implantes dentários", href: "/implantes-dentarios", description: "Reposição de um ou mais dentes dentro do plano protético." }, { title: "Prótese protocolo", href: "/protese-protocolo", description: "Reabilitação fixa sobre implantes para perdas extensas." }, { title: "Enxerto ósseo", href: "/enxerto-osseo-dentario", description: "Reconstrução de suporte quando indicada pelo planejamento." }, { title: "Próteses dentárias", href: "/proteses-dentarias", description: "Opções fixas e removíveis conforme o suporte disponível." }, { title: "Inlays e onlays", href: "/inlays-onlays", description: "Restaurações indiretas para recuperar estrutura e função." }, { title: "Reabilitação oral", href: "/reabilitacao-oral", description: "Integração de diferentes necessidades e etapas clínicas." }] },
      { title: "Ortodontia", items: [{ title: "Aparelhos e alinhadores", href: "/ortodontia", description: "Movimentações definidas a partir do diagnóstico." }, { title: "Invisalign", href: "/invisalign", description: "Alinhadores transparentes com planejamento digital." }] },
      { title: "Saúde bucal, gengiva e dor", items: [{ title: "Manutenção odontológica", href: "/manutencao-odontologica", description: "Revisões e prevenção depois do tratamento." }, { title: "Limpeza dental", href: "/limpeza-dental", description: "Profilaxia conforme placa, cálculo e condição gengival." }, { title: "Periodontia", href: "/periodontia", description: "Avaliação da gengiva e dos tecidos de suporte." }, { title: "Cirurgia gengival", href: "/cirurgia-gengival", description: "Contorno gengival e procedimentos periodontais indicados." }, { title: "Tratamento de canal", href: "/tratamento-de-canal", description: "Cuidado da parte interna do dente quando necessário." }, { title: "Extração de siso", href: "/extracao-de-siso", description: "Avaliação e cirurgia somente quando indicadas." }, { title: "Bruxismo e DTM", href: "/bruxismo", description: "Entrada por dor, tensão, apertamento e função." }] },
    ],
  },
  "estetica-orofacial": {
    contentType: "page", slug: "estetica-orofacial", eyebrow: "Estética Orofacial", title: "Estética Orofacial com planejamento individual em Florianópolis", description: "Naturalidade e análise facial antes da escolha do procedimento.", image: "/images/real/sara/sara-estetica-orofacial.webp", imageAlt: "Dra. Sara Michelon em avaliação facial", seo: { title: "Estética Orofacial em Florianópolis | Dra. Sara Michelon", description: "Estética orofacial em Florianópolis com análise de proporções, movimento, pele e contornos antes da indicação.", canonical: "/estetica-orofacial", index: true },
    linkGroups: [{ title: "Planejamento da face", items: [{ title: "Harmonização facial", href: "/harmonizacao-facial", description: "A face analisada como um conjunto." }, { title: "Preenchimento facial", href: "/preenchimento-facial", description: "Suporte, volume e contorno conforme anatomia." }, { title: "Preenchimento labial", href: "/preenchimento-labial", description: "Contorno, proporção e relação com o perfil." }, { title: "Botox e linhas de expressão", href: "/botox", description: "Movimentação muscular e avaliação individual." }, { title: "Bioestimuladores de colágeno", href: "/bioestimuladores-de-colageno", description: "Planejamento progressivo para características da pele." }, { title: "Perfiloplastia", href: "/perfiloplastia", description: "Relação entre nariz, lábios e mento." }] }],
  },
  "dra-sara-michelon": {
    contentType: "page",
    slug: "dra-sara-michelon",
    eyebrow: "Dra. Sara Michelon · CRO-SC 10632",
    title: "Dra. Sara Michelon",
    description: "Odontologia Estética e Estética Orofacial conduzidas com mais de 20 anos de experiência clínica e formação multidisciplinar.",
    image: "/images/real/sara/sara-profile-2026.webp",
    imageAlt: "Retrato da Dra. Sara Michelon",
    seo: {
      title: "Dra. Sara Michelon | Odontologia Estética em Florianópolis",
      description: "Conheça a formação, currículo e abordagem clínica da Dra. Sara Michelon (CRO-SC 10632) nos Ingleses, Florianópolis.",
      canonical: "/dra-sara-michelon",
      index: true,
    },
    sections: [
      {
        _key: "sara-approach",
        _type: "richText",
        heading: "Uma visão integrada da Odontologia e da Estética Facial",
        body: [
          "A experiência em diferentes áreas da Odontologia permite avaliar cada caso de forma mais ampla, considerando saúde, função, sorriso e face antes de definir qualquer tratamento.",
          "Com graduação concluída em 2003, a Dra. Sara Michelon consolidou sua prática em mais de duas décadas de atuação: especialista em Dentística Restauradora (Odontologia Estética) desde 2005, especialista em Endodontia desde 2007, especialista em Ortodontia desde 2012 e atuando em Harmonização Facial desde 2015.",
          "Esse percurso acadêmico e clínico permite que cada plano de tratamento seja estruturado com clareza, prioridades bem definidas e respeito às características biológicas e anatômicas de cada paciente.",
        ],
      },
      {
        _key: "sara-credentials",
        _type: "cardGrid",
        heading: "Formação Acadêmica & Especialidades",
        items: [
          { title: "Graduação em Odontologia", text: "Concluída em 2003 · Mais de 20 anos de experiência clínica continuada." },
          { title: "Dentística Restauradora", text: "Especialista desde 2005 · Foco em Odontologia Estética e preservação dental." },
          { title: "Endodontia", text: "Especialista desde 2007 · Diagnóstico e tratamento de canais radiculares." },
          { title: "Ortodontia", text: "Especialista desde 2012 · Alinhadores transparentes e ortodontia corretiva." },
          { title: "Harmonização Facial", text: "Atuação desde 2015 · Proporções faciais, contorno e naturalidade." },
          { title: "Instagram Profissional", text: "@drasaramichelon · Acompanhe casos clínicos e orientações no Instagram.", href: "https://www.instagram.com/drasaramichelon" },
        ],
      },
      {
        _key: "sara-areas",
        _type: "cardGrid",
        heading: "Áreas conectadas pela mesma abordagem",
        items: [
          { title: "Odontologia", text: "Prevenção, estética do sorriso e reabilitação organizadas por necessidade.", href: "/odontologia" },
          { title: "Estética Orofacial", text: "Análise facial, naturalidade e indicação individual.", href: "/estetica-orofacial" },
        ],
      },
    ],
  },
  conteudos: { contentType: "page", slug: "conteudos", eyebrow: "Conteúdos e orientações", title: "Conteúdos sobre odontologia, prevenção e estética", description: "Respostas clínicas úteis escritas ou revisadas pela equipe e conectadas aos tratamentos relacionados.", image: "/images/real/clinica/clinic-consultorio-1-novo.webp", imageAlt: "Consultório da clínica da Dra. Sara Michelon", seo: { title: "Conteúdos sobre Odontologia e Estética | Dra. Sara Michelon", description: "Conteúdos sobre odontologia, prevenção e estética, com autoria e revisão clínica identificadas.", canonical: "/conteudos", index: true } },
  contato: { contentType: "page", slug: "contato", eyebrow: "Contato e localização", title: "Clínica Odontológica nos Ingleses, Florianópolis", description: "Atendimento com hora marcada no complexo Ingleses Saúde & Office. Conecte-se com nossa equipe via WhatsApp, telefone ou trace sua rota direta via Waze, Uber ou Google Maps.", image: "/images/real/clinica/clinic-recepcao-nova.webp", imageAlt: "Recepção da clínica da Dra. Sara Michelon nos Ingleses", seo: { title: "Contato e Localização | Dra. Sara Michelon — Ingleses", description: "Localização, rotas no Waze e Uber, telefone e WhatsApp da clínica odontológica da Dra. Sara Michelon nos Ingleses, Florianópolis.", canonical: "/contato", index: true } },
  "politica-de-privacidade": { contentType: "page", slug: "politica-de-privacidade", eyebrow: "Privacidade", title: "Política de Privacidade", description: "Esta política explica como dados enviados voluntariamente e dados técnicos do site são tratados.", seo: { title: "Política de Privacidade | Dra. Sara Michelon", description: "Política de privacidade do site da Dra. Sara Michelon.", canonical: "/politica-de-privacidade", index: false }, sections: [{ _key: "privacy", _type: "richText", heading: "Tratamento responsável de dados", body: ["O site só deve coletar dados necessários para responder a solicitações, operar com segurança e, quando houver consentimento, medir o uso das páginas.", "Dados de contato não são vendidos. Solicitações sobre acesso, correção ou exclusão devem ser encaminhadas pelo canal oficial publicado no site.", "Ferramentas analíticas permanecem desativadas até que a pessoa visitante registre sua escolha no aviso de privacidade."] }] },
  "politica-de-cookies": { contentType: "page", slug: "politica-de-cookies", eyebrow: "Privacidade", title: "Política de Cookies", description: "Esta política descreve o uso de armazenamento essencial e, mediante consentimento, de medição de audiência.", seo: { title: "Política de Cookies | Dra. Sara Michelon", description: "Política de cookies e preferências de medição do site da Dra. Sara Michelon.", canonical: "/politica-de-cookies", index: false }, sections: [{ _key: "cookies", _type: "richText", heading: "Preferências sob controle da pessoa visitante", body: ["O armazenamento estritamente necessário mantém escolhas de privacidade e funções básicas do site.", "Medição de audiência só é carregada depois de consentimento explícito e pode ser recusada sem impedir o acesso ao conteúdo.", "A preferência pode ser alterada apagando os dados locais do navegador e fazendo uma nova escolha."] }] },
  "odontopediatria-dentista-nos-ingleses-norte-da-ilha": { contentType: "page", slug: "odontopediatria-dentista-nos-ingleses-norte-da-ilha", eyebrow: "Conteúdo histórico", title: "Odontopediatria", description: "Informações gerais sobre cuidado odontológico infantil e a importância de avaliação individual em cada fase do desenvolvimento.", seo: { title: "Odontopediatria | Dra. Sara Michelon", description: "Informações gerais sobre acompanhamento odontológico infantil e prevenção em diferentes fases do desenvolvimento.", canonical: "/odontopediatria-dentista-nos-ingleses-norte-da-ilha", index: false } },
};

const sara = professionalBySlug["dra-sara-michelon"];

export const fallbackArticles: Record<string, Article> = {
  "como-escovar-os-dentes": {
    contentType: "article", slug: "como-escovar-os-dentes", path: "/como-escovar-os-dentes", title: "Como escovar os dentes corretamente", excerpt: "Técnicas de escovação precisam considerar idade, coordenação motora, gengiva e necessidades individuais.",
    seo: { title: "Como Escovar os Dentes Corretamente | Dra. Sara Michelon", description: "Conheça técnicas de escovação para crianças, adultos e pessoas com retração gengival, além de cuidados com fio dental e aparelhos.", canonical: "/como-escovar-os-dentes", index: true },
    author: sara, reviewer: sara, publishedAt: "2018-01-01", categories: ["Prevenção", "Saúde bucal"],
    sections: [
      { _key: "article-intro", _type: "richText", heading: "A técnica precisa respeitar cada pessoa", body: ["Existem diferentes técnicas para o controle da placa. Coordenação motora, idade e condições gengivais devem ser consideradas para adaptar os movimentos.", "Na consulta, mostrar como a escovação é feita ajuda o profissional a orientar ajustes adequados."] },
      { _key: "article-techniques", _type: "cardGrid", heading: "Técnicas descritas no conteúdo original", items: [{ title: "Fones", text: "Indicada no material para crianças: movimentos circulares nas faces externas, internas e de mastigação." }, { title: "Bass modificada", text: "Descrita para adultos sem retração: cerdas em torno de 45 graus, movimentos vibratórios curtos e varredura suave." }, { title: "Stillman modificada", text: "Descrita para adultos com retração: posicionamento sem introduzir as cerdas no sulco e movimentos suaves de vibração e varredura." }] },
      { _key: "article-tips", _type: "richText", heading: "Cuidados que complementam a escovação", body: ["Use escova de cabeça compatível com a boca e cerdas macias ou extramacias. Evite força excessiva e alcance todas as superfícies com movimentos controlados.", "A higiene também inclui língua e espaços entre os dentes com fio ou fita dental. A troca da escova depende do desgaste das cerdas e das orientações recebidas."] },
      { _key: "article-braces", _type: "richText", heading: "Escovação durante o tratamento ortodôntico", body: ["Aparelhos podem aumentar a retenção de alimentos e exigem mais atenção à higiene. O tipo de aparelho e as necessidades individuais orientam os recursos auxiliares e a técnica."] },
    ],
    relatedTreatments: [{ title: "Periodontia", href: "/periodontia", description: "Saúde da gengiva e dos tecidos de suporte." }, { title: "Ortodontia", href: "/ortodontia", description: "Cuidados durante o uso de aparelhos e alinhadores." }],
  },
  "faceta-de-resina-desgasta-o-dente": {
    contentType: "article", slug: "faceta-de-resina-desgasta-o-dente", path: "/conteudos/faceta-de-resina-desgasta-o-dente", title: "Faceta de resina desgasta o dente?", excerpt: "A necessidade de preparo depende da posição, forma, cor e condição de cada dente — não é uma regra do material.",
    seo: { title: "Faceta de Resina Desgasta o Dente? | Dra. Sara", description: "Entenda quando uma faceta de resina pode exigir preparo e por que estrutura dental, posição, mordida e objetivo precisam ser avaliados.", canonical: "/conteudos/faceta-de-resina-desgasta-o-dente", index: true }, author: sara, reviewer: sara, categories: ["Odontologia estética"],
    sections: [{ _key: "resina-resposta", _type: "richText", heading: "O preparo não é automático", body: ["Faceta de resina descreve uma técnica restauradora, mas não determina sozinha se haverá desgaste. Dentes projetados, escurecidos, restaurados ou com alterações de forma podem pedir abordagens diferentes.", "O planejamento conservador busca preservar estrutura, respeitar a mordida e evitar volume excessivo. A decisão só pode ser tomada depois do exame."] }, { _key: "resina-criterios", _type: "cardGrid", heading: "O que muda a indicação", items: [{ title: "Posição do dente", text: "Espaço disponível e alinhamento interferem no volume necessário." }, { title: "Estrutura e cor", text: "Condição do esmalte, restaurações e alteração de cor mudam o plano." }, { title: "Mordida", text: "Contatos e hábitos influenciam resistência e manutenção." }] }],
    relatedTreatments: [{ title: "Facetas de resina", href: "/facetas-de-resina" }, { title: "Ortodontia", href: "/ortodontia" }],
  },
  "quando-e-necessario-enxerto-osseo-para-implante": {
    contentType: "article", slug: "quando-e-necessario-enxerto-osseo-para-implante", path: "/conteudos/quando-e-necessario-enxerto-osseo-para-implante", title: "Quando é necessário enxerto ósseo para implante?", excerpt: "O enxerto pode ser indicado quando o suporte disponível não permite posicionar o implante conforme o plano protético e anatômico.",
    seo: { title: "Quando é Necessário Enxerto Ósseo para Implante?", description: "Saiba como exames, volume ósseo, posição do implante e estruturas próximas entram na indicação de enxerto ósseo.", canonical: "/conteudos/quando-e-necessario-enxerto-osseo-para-implante", index: true }, author: fallbackProfessionals[1], reviewer: fallbackProfessionals[1], categories: ["Implantodontia"],
    sections: [{ _key: "enxerto-criterio", _type: "richText", heading: "O implante é planejado a partir da futura prótese", body: ["O volume ósseo é analisado em relação à posição necessária para o implante e às estruturas anatômicas próximas. Por isso, a indicação não depende apenas de uma medida isolada.", "Exame clínico e imagem ajudam a definir se o enxerto é dispensável, simultâneo ao implante ou realizado em uma etapa anterior."] }, { _key: "enxerto-decisoes", _type: "cardGrid", heading: "Decisões do planejamento", items: [{ title: "Sem enxerto", text: "Quando existe suporte compatível com o plano." }, { title: "Junto do implante", text: "Possível em situações selecionadas." }, { title: "Antes do implante", text: "Quando a reconstrução precisa cicatrizar previamente." }] }],
    relatedTreatments: [{ title: "Enxerto ósseo dentário", href: "/enxerto-osseo-dentario" }, { title: "Implantes dentários", href: "/implantes-dentarios" }],
  },
  "gengiva-sangrando-e-normal": {
    contentType: "article", slug: "gengiva-sangrando-e-normal", path: "/conteudos/gengiva-sangrando-e-normal", title: "Gengiva sangrando é normal?", excerpt: "Sangramento recorrente merece avaliação: ele pode acompanhar inflamação, acúmulo de placa ou outras condições que precisam ser diferenciadas.",
    seo: { title: "Gengiva Sangrando é Normal? | Periodontia", description: "Entenda por que sangramento gengival recorrente merece avaliação e como higiene, inflamação e saúde periodontal são investigadas.", canonical: "/conteudos/gengiva-sangrando-e-normal", index: true }, author: fallbackProfessionals[3], reviewer: fallbackProfessionals[3], categories: ["Periodontia"],
    sections: [{ _key: "gengiva-sinal", _type: "richText", heading: "Sangramento é um sinal, não um diagnóstico", body: ["A frequência, o local e a presença de inchaço, dor, retração ou mobilidade ajudam a entender o contexto. Interromper a higiene por medo de sangrar pode favorecer o acúmulo de placa.", "A avaliação periodontal identifica a origem, orienta a técnica de higiene e define se há necessidade de tratamento além da profilaxia."] }, { _key: "gengiva-alertas", _type: "cardGrid", heading: "O que observar", items: [{ title: "Frequência", text: "Sangramento repetido ao escovar ou espontâneo pede atenção." }, { title: "Outros sinais", text: "Inchaço, retração, mau hálito persistente ou mobilidade devem ser relatados." }, { title: "Implantes", text: "Sangramento ao redor de implantes também precisa de avaliação." }] }],
    relatedTreatments: [{ title: "Periodontia", href: "/periodontia" }, { title: "Limpeza dental", href: "/limpeza-dental" }],
  },
  "bruxismo-principais-sintomas": {
    contentType: "article", slug: "bruxismo-principais-sintomas", path: "/conteudos/bruxismo-principais-sintomas", title: "Bruxismo: principais sintomas e quando avaliar", excerpt: "Apertamento ou ranger dos dentes pode se relacionar a desgaste, fadiga muscular e desconforto, mas sintomas parecidos têm outras causas.",
    seo: { title: "Bruxismo: Principais Sintomas e Quando Avaliar", description: "Conheça sinais associados ao bruxismo e entenda por que desgaste, dor, tensão e sono precisam de avaliação individual.", canonical: "/conteudos/bruxismo-principais-sintomas", index: true }, author: sara, reviewer: sara, categories: ["DTM e Dor Orofacial"],
    sections: [{ _key: "bruxismo-sintomas", _type: "richText", heading: "Os sinais precisam ser relacionados ao contexto", body: ["Desgaste dentário, fraturas, marcas na língua, fadiga muscular ou relato de ranger durante o sono podem participar da investigação. Nenhum sinal isolado confirma a causa.", "Dor na face ou na articulação, limitação de abertura e alterações do sono exigem avaliação mais ampla para diferenciar bruxismo, DTM e outras condições."] }, { _key: "bruxismo-conduta", _type: "cardGrid", heading: "A avaliação pode incluir", items: [{ title: "Dentes e mordida", text: "Desgastes, trincas, restaurações e contatos são examinados." }, { title: "Músculos e articulações", text: "Dor, movimento e função são relacionados aos sintomas." }, { title: "Hábitos e sono", text: "Rotina, apertamento em vigília e qualidade do sono ajudam a orientar o cuidado." }] }],
    relatedTreatments: [{ title: "Bruxismo, DTM e dor orofacial", href: "/bruxismo" }, { title: "Reabilitação oral", href: "/reabilitacao-oral" }],
  },
};

export const fallbackLandingPages: Record<string, LandingPage> = {
  "avaliacao-estetica-facial": {
    contentType: "landingPage", slug: "avaliacao-estetica-facial", eyebrow: "Avaliação e planejamento", title: "Avaliação estética facial personalizada", description: "Análise de proporções, movimento muscular, pele, volumes e contornos antes de qualquer indicação.", image: "/images/real/sara/sara-estetica-orofacial.webp", imageAlt: "Dra. Sara Michelon em avaliação estética facial", ctaLabel: "Agendar avaliação",
    seo: { title: "Avaliação Estética Facial em Florianópolis | Dra. Sara Michelon", description: "Avaliação estética facial em Florianópolis com análise individual, naturalidade e planejamento antes da indicação.", canonical: "/avaliacao-estetica-facial", index: false },
    sections: [{ _key: "landing-how", _type: "steps", heading: "Como funciona a avaliação", items: [{ title: "Escuta", text: "Objetivos, histórico e percepções são reunidos." }, { title: "Análise", text: "Proporções, movimento, pele e perfil são observados em conjunto." }, { title: "Plano", text: "Possibilidades e limites são discutidos sem uma indicação automática." }, { title: "Decisão", text: "Os próximos passos são definidos de forma individual." }] }, { _key: "landing-approach", _type: "imageText", heading: "Naturalidade como critério de planejamento", body: ["A avaliação não funciona como catálogo de procedimentos. Ela organiza o que faz sentido para a anatomia e os objetivos de cada pessoa."], image: "/images/real/sara/sara-autoridade-2025.webp", imageAlt: "Retrato profissional da Dra. Sara Michelon", imagePosition: "right" }, { _key: "landing-local", _type: "localBlock", heading: "Avaliação estética facial nos Ingleses" }],
    faq: [{ question: "A avaliação já define um procedimento?", answer: "Não necessariamente. Ela pode indicar possibilidades, prioridades, limites ou mesmo que nenhuma intervenção seja adequada." }, { question: "O atendimento considera a face inteira?", answer: "A análise observa relações entre proporções, movimento, pele, volumes e perfil, mesmo quando a queixa é localizada." }],
  },
};

export const fallbackProfessionalPaths = fallbackProfessionals
  .filter((professional) => professional.profileHref?.startsWith("/equipe/"))
  .map((professional) => professional.profileHref!);

export const fallbackSitemapPaths = [
  "",
  ...Object.values(fallbackPages).filter((page) => page.slug !== "home" && page.seo.index !== false).map((page) => `/${page.slug}`),
  ...Object.keys(fallbackTreatments).map((slug) => `/${slug}`),
  ...Object.values(fallbackArticles).filter((article) => article.seo.index !== false).map((article) => article.path),
  ...fallbackProfessionalPaths,
].filter((path, index, paths) => paths.indexOf(path) === index);
