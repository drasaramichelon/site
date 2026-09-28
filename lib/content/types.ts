export type Seo = {
  title: string;
  description: string;
  canonical?: string;
  index?: boolean;
  ogImage?: string;
};

export type SupportStaff = {
  name: string;
  role: string;
  registrations?: string[];
  image?: string;
  description?: string;
};

export type Professional = {
  name: string;
  slug: string;
  role: string;
  cro?: string;
  graduation?: string;
  graduationYear?: number;
  qualifications?: string[];
  image?: string;
  summary?: string;
  profileHref?: string;
  bio?: string[];
  seo?: Seo;
  relatedTreatments?: RelatedTreatment[];
};

export type SiteSettings = {
  clinicName: string;
  legalName: string;
  locality: string;
  region: string;
  phone: string | null;
  whatsapp: string | null;
  commercialPhone?: string | null;
  email: string | null;
  streetAddress: string | null;
  openingHours: string[];
  geo: {latitude: number; longitude: number} | null;
  socialLinks: string[];
  siteUrl: string;
  trackingIds: {
    ga4: string | null;
    gtm: string | null;
    googleAds: string | null;
    googleAdsConversionLabel: string | null;
    metaPixel: string | null;
    clarity: string | null;
  };
};

export type NavigationItem = {
  label: string;
  href: string;
  groups?: {label: string; items: {label: string; href: string}[]}[];
};

export type ContentSection =
  | {_key: string; _type: "richText"; heading?: string; body: string[]}
  | {_key: string; _type: "imageText"; heading: string; body: string[]; image: string; imageAlt: string; imagePosition?: "left" | "right"}
  | {_key: string; _type: "steps"; heading: string; items: {title: string; text: string}[]}
  | {_key: string; _type: "cardGrid"; heading: string; items: {title: string; text: string; href?: string}[]}
  | {_key: string; _type: "comparison"; heading: string; columns: {title: string; items: string[]}[]}
  | {_key: string; _type: "quote"; quote: string; attribution?: string}
  | {_key: string; _type: "cta"; heading: string; text: string; label: string; href: string}
  | {_key: string; _type: "localBlock"; heading?: string};

export type TreatmentVariant = "image-led" | "process" | "symptom-led" | "hub" | "editorial";

export type RelatedTreatment = {title: string; href: string; description?: string};

export type Treatment = {
  contentType: "treatment";
  title: string;
  slug: string;
  eyebrow: string;
  shortDescription: string;
  heroImage?: string;
  heroImageAlt?: string;
  specialty: string;
  variant: TreatmentVariant;
  clinicalLead?: Professional;
  seo: Seo;
  sections: ContentSection[];
  faq: {question: string; answer: string}[];
  relatedTreatments: RelatedTreatment[];
  aftercare?: {body: string[]; href?: string; label?: string};
  contentStatus: "final" | "partial";
  source: "docx-clinical" | "matrix-supported";
};

export type PageLink = {title: string; href: string; description: string};
export type PageLinkGroup = {title: string; items: PageLink[]};

export type InstitutionalPage = {
  contentType: "page";
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  seo: Seo;
  sections?: ContentSection[];
  linkGroups?: PageLinkGroup[];
};

export type Article = {
  contentType: "article";
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  seo: Seo;
  author: Professional;
  reviewer?: Professional;
  publishedAt?: string;
  updatedAt?: string;
  categories: string[];
  sections: ContentSection[];
  relatedTreatments: RelatedTreatment[];
};

export type LandingPage = {
  contentType: "landingPage";
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  ctaLabel: string;
  seo: Seo;
  sections: ContentSection[];
  faq: {question: string; answer: string}[];
};
