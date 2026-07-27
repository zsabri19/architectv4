import type {DocumentActionsResolver, TemplateResolver} from 'sanity'
import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['siteSettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Authority Platform')
    .items([
      S.listItem().title('Site Settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem().title('Book').child(S.documentTypeList('book')),
      S.listItem().title('Book Parts').child(S.documentTypeList('bookPart')),
      S.listItem().title('Book Chapters').child(S.documentTypeList('bookChapter')),
      S.divider(),
      S.listItem().title('Frameworks').child(S.documentTypeList('framework')),
      S.listItem().title('Articles').child(S.documentTypeList('article')),
      S.listItem().title('Lead Magnets').child(S.documentTypeList('leadMagnet')),
      S.listItem().title('Newsletter Issues').child(S.documentTypeList('newsletterIssue')),
      S.divider(),
      S.listItem().title('Programs & Services').child(S.documentTypeList('program')),
      S.listItem().title('Media').child(S.documentTypeList('mediaItem')),
      S.listItem().title('Events & Speaking').child(S.documentTypeList('event')),
      S.listItem().title('Cases & Testimonials').child(S.documentTypeList('caseStudy')),
      S.divider(),
      S.listItem().title('People & Authors').child(S.documentTypeList('person')),
      S.listItem().title('Institutions').child(S.documentTypeList('institution')),
      S.listItem().title('Redirects').child(S.documentTypeList('redirect')),
    ])

export const singletonActions: DocumentActionsResolver = (prev, context) =>
  singletonTypes.has(context.schemaType)
    ? prev.filter((action) => action.action !== 'duplicate' && action.action !== 'delete')
    : prev

export const singletonTemplates: TemplateResolver = (prev) =>
  prev.filter((template) => !singletonTypes.has(template.schemaType))
