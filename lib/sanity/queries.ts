const seoProjection = `"seo": {
  "title": seo.title,
  "description": seo.description,
  "canonical": seo.canonical,
  "index": coalesce(seo.index, true),
  "ogImage": seo.ogImage->asset.asset->url
}`;

const professionalProjection = `{
  name,
  "slug": slug.current,
  "role": coalesce(specialties[0]->name, "Equipe clínica"),
  "image": portrait->asset.asset->url,
  summary,
  "bio": bio[]{ "text": pt::text(@) }.text,
  "profileHref": select(slug.current == "dra-sara-michelon" => "/dra-sara-michelon", defined(slug.current) => "/equipe/" + slug.current),
  ${seoProjection},
  "relatedTreatments": relatedTreatments[]->{title, "href": "/" + slug.current, "description": shortDescription}
}`;

const sectionsProjection = `contentSections[]{
  _key,
  "_type": select(
    _type == "richTextSection" => "richText",
    _type == "imageTextSection" => "imageText",
    _type == "stepsSection" => "steps",
    _type == "cardGridSection" => "cardGrid",
    _type == "comparisonSection" => "comparison",
    _type == "quoteSection" => "quote",
    _type == "ctaSection" => "cta",
    _type == "localBlockSection" => "localBlock",
    _type
  ),
  heading,
  "body": content[]{ "text": pt::text(@) }.text,
  "image": image->asset.asset->url,
  "imageAlt": image->alt,
  imagePosition,
  items[]{title, text, href},
  columns[]{title, items},
  quote,
  attribution,
  text,
  label,
  href
}`;

export const entryQuery = `*[
  _type in ["treatment", "page", "landingPage", "article"] &&
  slug.current == $slug &&
  coalesce(publishStatus, "published") == "published"
][0]{
  _type == "treatment" => {
    "contentType": "treatment", title, "slug": slug.current,
    "eyebrow": specialty->name, shortDescription,
    "heroImage": heroImage->asset.asset->url, "heroImageAlt": heroImage->alt,
    "specialty": specialty->name, variant,
    "clinicalLead": clinicalLead->${professionalProjection},
    ${seoProjection}, "sections": ${sectionsProjection},
    "faq": faq[]->{question, "answer": pt::text(answer)},
    "relatedTreatments": relatedTreatments[]->{title, "href": "/" + slug.current, "description": shortDescription},
    "aftercare": select(length(aftercare) > 0 => {"body": aftercare[]{ "text": pt::text(@) }.text, "href": "/manutencao-odontologica", "label": "Conhecer a manutenção odontológica"}),
    "contentStatus": coalesce(contentStatus, "final"),
    "source": coalesce(contentSource, "docx-clinical")
  },
  _type == "page" => {
    "contentType": "page", "slug": slug.current, eyebrow, title, description,
    "image": heroImage->asset.asset->url, "imageAlt": heroImage->alt,
    ${seoProjection}, "sections": ${sectionsProjection}, linkGroups
  },
  _type == "landingPage" => {
    "contentType": "landingPage", "slug": slug.current, eyebrow, title, description,
    "image": heroImage->asset.asset->url, "imageAlt": heroImage->alt, ctaLabel,
    ${seoProjection}, "sections": ${sectionsProjection},
    "faq": faq[]->{question, "answer": pt::text(answer)}
  },
  _type == "article" => {
    "contentType": "article", "slug": slug.current,
    "path": coalesce(routePath, "/conteudos/" + slug.current),
    title, excerpt, ${seoProjection},
    "author": author->${professionalProjection}, "reviewer": reviewer->${professionalProjection},
    publishedAt, updatedAt, "categories": categories[]->name,
    "sections": ${sectionsProjection},
    "relatedTreatments": relatedTreatments[]->{title, "href": "/" + slug.current, "description": shortDescription}
  }
}`;

export const professionalsQuery = `*[_type == "professional" && coalesce(publishStatus, "published") == "published"] | order(order asc, name asc) ${professionalProjection}`;

export const professionalQuery = `*[_type == "professional" && slug.current == $slug && coalesce(publishStatus, "published") == "published"][0] ${professionalProjection}`;

export const articlesQuery = `*[_type == "article" && coalesce(publishStatus, "published") == "published"] | order(coalesce(publishedAt, _createdAt) desc){
  "contentType": "article", "slug": slug.current,
  "path": coalesce(routePath, "/conteudos/" + slug.current),
  title, excerpt, ${seoProjection},
  "author": author->${professionalProjection}, "reviewer": reviewer->${professionalProjection},
  publishedAt, updatedAt, "categories": categories[]->name,
  "sections": ${sectionsProjection},
  "relatedTreatments": relatedTreatments[]->{title, "href": "/" + slug.current, "description": shortDescription}
}`;

export const settingsQuery = `*[_type == "siteSettings"][0]{
  clinicName, legalName, "phone": phones[0], whatsapp, email,
  "streetAddress": address.street,
  "locality": coalesce(locality, select(defined(address.district) => address.district + ", " + address.city + " — " + address.region)),
  region, openingHours,
  "geo": select(defined(geo) => {"latitude": geo.lat, "longitude": geo.lng}),
  socialLinks, siteUrl, trackingIds
}`;

export const sitemapQuery = `*[
  _type in ["treatment", "page", "article", "professional"] &&
  defined(slug.current) && coalesce(publishStatus, "published") == "published" &&
  coalesce(seo.index, true) == true
]{
  "path": select(
    _type == "article" => coalesce(routePath, "/conteudos/" + slug.current),
    _type == "professional" && slug.current != "dra-sara-michelon" => "/equipe/" + slug.current,
    "/" + slug.current
  )
}`;
