import {defineField, defineType} from 'sanity'
import {publicDocumentFields} from '../helpers'

export const newsletterIssue = defineType({
  name: 'newsletterIssue',
  title: 'Newsletter Issue',
  type: 'document',
  fields: [
    defineField({name: 'issueNumber', title: 'Issue number', type: 'number', validation: (Rule) => Rule.required().integer().positive()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'date', title: 'Issue date', type: 'date', validation: (Rule) => Rule.required()}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'portableText', validation: (Rule) => Rule.required()}),
    defineField({name: 'pattern', title: 'One pattern', type: 'text', rows: 3}),
    defineField({name: 'decision', title: 'One decision', type: 'text', rows: 3}),
    defineField({name: 'nextStep', title: 'One next step', type: 'text', rows: 3}),
    defineField({name: 'relatedArticle', title: 'Related article', type: 'reference', to: [{type: 'article'}]}),
    defineField({name: 'relatedFramework', title: 'Related framework', type: 'reference', to: [{type: 'framework'}]}),
    defineField({name: 'relatedService', title: 'Related service', type: 'reference', to: [{type: 'program'}]}),
    defineField({name: 'cta', title: 'CTA', type: 'cta'}),
    defineField({name: 'archiveVisible', title: 'Visible in archive', type: 'boolean', initialValue: false}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => value?.visibility === 'public' && !value.archiveVisible ? 'A public newsletter issue must be visible in the archive.' : true),
  preview: {select: {title: 'title', number: 'issueNumber', date: 'date'}, prepare: ({title, number, date}) => ({title: `Issue ${String(number).padStart(2, '0')}: ${title}`, subtitle: date})},
})
