import {defineArrayMember, defineField, defineType} from 'sanity'
import {publicDocumentFields} from '../helpers'

export const bookPart = defineType({
  name: 'bookPart',
  title: 'Book Part',
  type: 'document',
  fields: [
    defineField({name: 'number', title: 'Part number', type: 'number', validation: (Rule) => Rule.required().integer().min(1).max(6)}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'book', title: 'Book', type: 'reference', to: [{type: 'book'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'pillarSummary', title: 'Content-pillar summary', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'keywordTheme', title: 'Keyword theme', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'primaryLeadMagnet', title: 'Primary lead magnet', type: 'reference', to: [{type: 'leadMagnet'}]}),
    defineField({name: 'chapters', title: 'Ordered chapters', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'bookChapter'}]})], validation: (Rule) => Rule.unique()}),
    ...publicDocumentFields,
  ],
  preview: {select: {title: 'title', number: 'number'}, prepare: ({title, number}) => ({title: `Part ${number}: ${title}`})},
})
