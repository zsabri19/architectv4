import {defineArrayMember, defineField, defineType} from 'sanity'
import {publicDocumentFields} from '../helpers'

export const bookChapter = defineType({
  name: 'bookChapter',
  title: 'Book Chapter',
  type: 'document',
  fields: [
    defineField({name: 'chapterNumber', title: 'Chapter number', type: 'number', validation: (Rule) => Rule.required().integer().min(1).max(15)}),
    defineField({name: 'title', title: 'Chapter title', type: 'string', description: 'Never publish a placeholder or unconfirmed manuscript title.', validation: (Rule) => Rule.required().custom((value) => !value || /pending|tbd|placeholder/i.test(value) ? 'Placeholder chapter titles are prohibited.' : true)}),
    defineField({name: 'titleApprovalStatus', title: 'Title approval status', type: 'string', initialValue: 'pending', options: {list: [
      {title: 'Pending manuscript confirmation', value: 'pending'},
      {title: 'Confirmed by manuscript owner', value: 'confirmed'},
      {title: 'Withdrawn', value: 'withdrawn'},
    ], layout: 'radio'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'titleConfirmedBy', title: 'Title confirmed by', type: 'string', hidden: ({document}) => document?.titleApprovalStatus !== 'confirmed'}),
    defineField({name: 'titleConfirmedAt', title: 'Title confirmed at', type: 'datetime', hidden: ({document}) => document?.titleApprovalStatus !== 'confirmed'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: (doc) => doc.titleApprovalStatus === 'confirmed' && typeof doc.title === 'string' ? doc.title : '', maxLength: 96}, validation: (Rule) => Rule.required().custom((value, context) => {
      const document = context.document as {titleApprovalStatus?: string} | undefined
      if (document?.titleApprovalStatus !== 'confirmed') return 'Do not assign a public slug until the chapter title is confirmed.'
      return value?.current && !/pending|tbd|placeholder/i.test(value.current) ? true : 'Use a confirmed, non-placeholder slug.'
    })}),
    defineField({name: 'part', title: 'Book part', type: 'reference', to: [{type: 'bookPart'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'summary', title: 'Approved summary', type: 'text', rows: 4}),
    defineField({name: 'keyLesson', title: 'Key lesson', type: 'text', rows: 3}),
    defineField({name: 'body', title: 'Approved excerpt / body', type: 'portableText'}),
    defineField({name: 'excerptPermission', title: 'Excerpt permission', type: 'string', initialValue: 'notGranted', options: {list: [
      {title: 'Not granted', value: 'notGranted'},
      {title: 'Approved excerpt only', value: 'approvedExcerpt'},
      {title: 'Full chapter approved', value: 'fullChapter'},
    ]}, validation: (Rule) => Rule.required()}),
    defineField({name: 'primaryFramework', title: 'Primary framework', type: 'reference', to: [{type: 'framework'}]}),
    defineField({name: 'relatedArticles', title: 'Related articles', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'article'}]})], validation: (Rule) => Rule.unique()}),
    defineField({name: 'relatedService', title: 'Related service', type: 'reference', to: [{type: 'program'}]}),
    defineField({name: 'cta', title: 'Call to action', type: 'cta'}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((rawValue) => {
    if (!rawValue) return true
    const value = rawValue as {
      visibility?: string
      titleApprovalStatus?: string
      titleConfirmedBy?: string
      titleConfirmedAt?: string
      seo?: {noIndex?: boolean}
      body?: unknown[]
      excerptPermission?: string
    }
    if (value.visibility === 'public' && value.titleApprovalStatus !== 'confirmed') return 'Only chapters with confirmed manuscript titles may be public.'
    if (value.visibility === 'public' && (!value.titleConfirmedBy || !value.titleConfirmedAt)) return 'Record who confirmed the chapter title and when before public release.'
    if (value.visibility === 'public' && value.seo?.noIndex) return 'A public chapter must be indexable. Keep the chapter private until it is ready.'
    if (value.body?.length && value.excerptPermission === 'notGranted') return 'Remove chapter body content or record excerpt permission.'
    return true
  }),
  preview: {select: {title: 'title', number: 'chapterNumber', approval: 'titleApprovalStatus', visibility: 'visibility'}, prepare: ({title, number, approval, visibility}) => ({title: `${number}. ${title}`, subtitle: `${approval} · ${visibility}`} )},
})
