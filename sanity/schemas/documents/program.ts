import {defineArrayMember, defineField, defineType} from 'sanity'
import {publicDocumentFields} from '../helpers'

export const program = defineType({
  name: 'program',
  title: 'Program / Service',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'serviceType', title: 'Service type', type: 'string', options: {list: ['personalSession', 'enterpriseProgram', 'advisory', 'speaking', 'training', 'facilitation', 'other']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'shortDescription', title: 'Short description', type: 'text', rows: 3, validation: (Rule) => Rule.required()}),
    defineField({name: 'audience', title: 'Audience', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'problem', title: 'Problem addressed', type: 'portableText'}),
    defineField({name: 'scope', title: 'Scope', type: 'portableText'}),
    defineField({name: 'deliverables', title: 'Deliverables', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'duration', title: 'Duration', type: 'string'}),
    defineField({name: 'priceDisplay', title: 'Price display', type: 'string', description: 'Use only commercially approved public wording.'}),
    defineField({name: 'pricingMode', title: 'Pricing mode', type: 'string', options: {list: ['fixed', 'range', 'proposal', 'contact', 'notPublic']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'status', title: 'Offer status', type: 'string', options: {list: ['draft', 'active', 'paused', 'retired']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'commercialApproval', title: 'Commercial terms approved', type: 'boolean', initialValue: false}),
    defineField({name: 'process', title: 'Process', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}), defineField({name: 'description', type: 'text', rows: 2})]})]}),
    defineField({name: 'qualificationCriteria', title: 'Qualification criteria', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'cta', title: 'Primary CTA', type: 'cta'}),
    defineField({name: 'relatedFrameworks', title: 'Related frameworks', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'framework'}]})], validation: (Rule) => Rule.unique()}),
    defineField({name: 'relatedArticles', title: 'Related articles', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'article'}]})], validation: (Rule) => Rule.unique()}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => value?.visibility === 'public' && (!value.commercialApproval || value.status !== 'active') ? 'Public services must be active and have approved commercial terms.' : true),
  preview: {select: {title: 'title', type: 'serviceType', status: 'status'}, prepare: ({title, type, status}) => ({title, subtitle: `${type} · ${status}`})},
})
