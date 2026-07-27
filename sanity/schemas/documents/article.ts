import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasApprovedRights, publicDocumentFields} from '../helpers'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(400)}),
    defineField({name: 'body', title: 'Body', type: 'portableText', validation: (Rule) => Rule.required()}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'controlledImage'}),
    defineField({name: 'category', title: 'Category', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'tags', title: 'Tags', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'publishedAt', title: 'Publish date', type: 'datetime', validation: (Rule) => Rule.required()}),
    defineField({name: 'updatedAt', title: 'Updated date', type: 'datetime'}),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'person'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
    defineField({name: 'citations', title: 'Citations', type: 'array', of: [defineArrayMember({type: 'citation'})]}),
    defineField({name: 'relatedFramework', title: 'Related framework', type: 'reference', to: [{type: 'framework'}]}),
    defineField({name: 'relatedChapter', title: 'Related book chapter', type: 'reference', to: [{type: 'bookChapter'}]}),
    defineField({name: 'relatedLeadMagnet', title: 'Related lead magnet', type: 'reference', to: [{type: 'leadMagnet'}]}),
    defineField({name: 'relatedService', title: 'Related service', type: 'reference', to: [{type: 'program'}]}),
    defineField({name: 'newsletterExcerpt', title: 'Newsletter excerpt', type: 'text', rows: 3}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => value?.visibility === 'public' && value.heroImage && !hasApprovedRights(value.heroImage) ? 'A public hero image must have approved rights.' : true),
  preview: {select: {title: 'title', subtitle: 'publishedAt', media: 'heroImage.image'}},
})
