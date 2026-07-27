import {defineArrayMember, defineField, defineType} from 'sanity'
import {publicDocumentFields} from '../helpers'

export const framework = defineType({
  name: 'framework',
  title: 'Framework',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Canonical title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'namingLocked', title: 'Canonical name approved / locked', type: 'boolean', initialValue: false}),
    defineField({name: 'slug', title: 'Canonical slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'displayOrder', title: 'Display order', type: 'number', validation: (Rule) => Rule.required().integer().min(1).max(14)}),
    defineField({name: 'shortDefinition', title: 'Short definition', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
    defineField({name: 'category', title: 'Category', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'parameters', title: 'Parameters / dimensions', type: 'array', of: [defineArrayMember({type: 'object', fields: [
      defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
      defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    ], preview: {select: {title: 'name', subtitle: 'description'}}})]}),
    defineField({name: 'body', title: 'Framework body', type: 'portableText'}),
    defineField({name: 'impactStatement', title: 'Impact statement', type: 'text', rows: 4}),
    defineField({name: 'claimStatus', title: 'Claim status', type: 'string', initialValue: 'qualitativeOnly', options: {list: [
      {title: 'Qualitative language only', value: 'qualitativeOnly'},
      {title: 'Quantitative claims under review', value: 'underReview'},
      {title: 'Evidence approved', value: 'approved'},
    ]}, validation: (Rule) => Rule.required()}),
    defineField({name: 'evidence', title: 'Evidence references', type: 'array', of: [defineArrayMember({type: 'citation'})]}),
    defineField({name: 'leadMagnet', title: 'Primary lead magnet', type: 'reference', to: [{type: 'leadMagnet'}]}),
    defineField({name: 'relatedChapter', title: 'Related book chapter', type: 'reference', to: [{type: 'bookChapter'}]}),
    defineField({name: 'relatedArticles', title: 'Related articles', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'article'}]})], validation: (Rule) => Rule.unique()}),
    defineField({name: 'relatedService', title: 'Related service', type: 'reference', to: [{type: 'program'}]}),
    defineField({name: 'caseStudies', title: 'Case studies / testimonials', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'caseStudy'}]})], validation: (Rule) => Rule.unique()}),
    defineField({name: 'faq', title: 'FAQs', type: 'array', of: [defineArrayMember({type: 'faqItem'})]}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => value?.visibility === 'public' && !value.namingLocked ? 'Lock the canonical framework name before public release.' : true),
  preview: {select: {title: 'title', subtitle: 'category'}},
})
