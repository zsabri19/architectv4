import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasApprovedRights, publicDocumentFields} from '../helpers'

export const book = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'status', title: 'Publication status', type: 'string', options: {list: ['announced', 'forthcoming', 'preorder', 'published', 'outOfPrint']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'publicationDisplayText', title: 'Publication display text', type: 'string', description: 'Time-sensitive wording such as “Forthcoming”; verify before publishing.'}),
    defineField({name: 'publicationDate', title: 'Publication date', type: 'date'}),
    defineField({name: 'synopsis', title: 'Synopsis', type: 'portableText', validation: (Rule) => Rule.required()}),
    defineField({name: 'cover', title: 'Cover artwork', type: 'controlledImage'}),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'person'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'parts', title: 'Ordered book parts', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'bookPart'}]})], validation: (Rule) => Rule.required().length(6).unique()}),
    defineField({name: 'waitlistCta', title: 'Waitlist / preorder CTA', type: 'cta'}),
    defineField({name: 'pressAssets', title: 'Press assets', type: 'array', of: [defineArrayMember({type: 'controlledFile'})]}),
    defineField({name: 'structuredDataReviewed', title: 'Book schema evidence reviewed', type: 'boolean', initialValue: false}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => value?.visibility === 'public' && value.cover && !hasApprovedRights(value.cover) ? 'A public book cover must have owned, licensed, or public-domain rights.' : true),
  preview: {select: {title: 'title', subtitle: 'status', media: 'cover.image'}},
})
