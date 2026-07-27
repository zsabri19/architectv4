import {defineQuery} from 'groq'

const publicDocumentFilter = `visibility == "public" && coalesce(seo.noIndex, false) == false`
const confirmedChapterFilter = `${publicDocumentFilter} && titleApprovalStatus == "confirmed" && !(_id in path("drafts.**"))`

export const publicSiteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteTitle,
    canonicalOrigin,
    defaultDescription,
    defaultShareImage,
    navigation[]{label, href, external},
    footerLinks[]{label, href, external},
    contactEmail,
    socialLinks[]{label, href, external},
    bookingUrl,
    newsletterTitle,
    newsletterDescription,
    defaultSeo
  }
`)

export const publicChapterIndexQuery = defineQuery(`
  *[_type == "bookChapter" && ${confirmedChapterFilter}]
  | order(chapterNumber asc){
    _id,
    chapterNumber,
    title,
    "slug": slug.current,
    summary,
    keyLesson,
    "part": part->{number, title, "slug": slug.current},
    "primaryFramework": primaryFramework->{title, "slug": slug.current},
    seo
  }
`)

export const publicChapterBySlugQuery = defineQuery(`
  *[_type == "bookChapter" && slug.current == $slug && ${confirmedChapterFilter}][0]{
    _id,
    chapterNumber,
    title,
    "slug": slug.current,
    summary,
    keyLesson,
    body,
    "part": part->{number, title, "slug": slug.current},
    "primaryFramework": primaryFramework->{title, "slug": slug.current},
    "relatedArticles": relatedArticles[]->{title, "slug": slug.current, summary},
    "relatedService": relatedService->{title, "slug": slug.current, shortDescription},
    cta,
    seo
  }
`)

export const publicArticlesQuery = defineQuery(`
  *[_type == "article" && ${publicDocumentFilter} && !(_id in path("drafts.**"))]
  | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    summary,
    publishedAt,
    updatedAt,
    featured,
    heroImage,
    "author": author->{name, "slug": slug.current},
    "relatedFramework": relatedFramework->{title, "slug": slug.current},
    seo
  }
`)

export const publicFrameworksQuery = defineQuery(`
  *[_type == "framework" && ${publicDocumentFilter} && !(_id in path("drafts.**"))]
  | order(displayOrder asc){
    _id,
    title,
    "slug": slug.current,
    shortDefinition,
    category,
    impactStatement,
    "leadMagnet": leadMagnet->{title, "slug": slug.current, format, emailGated},
    seo
  }
`)

export const publicSitemapQuery = defineQuery(`
  *[
    _type in ["book", "bookChapter", "framework", "article", "leadMagnet", "program", "newsletterIssue", "mediaItem", "event"] &&
    ${publicDocumentFilter} &&
    !(_id in path("drafts.**")) &&
    (_type != "bookChapter" || titleApprovalStatus == "confirmed")
  ]{
    _type,
    "slug": slug.current,
    _updatedAt
  }
`)
