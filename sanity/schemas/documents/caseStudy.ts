import {defineArrayMember, defineField, defineType} from 'sanity'
import {publicDocumentFields} from '../helpers'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Testimonial / Case Study',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'recordType', title: 'Record type', type: 'string', options: {list: ['testimonial', 'caseStudy', 'combined']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'quote', title: 'Approved quote', type: 'text', rows: 5}),
    defineField({name: 'attribution', title: 'Attribution name', type: 'string'}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'organization', title: 'Organization', type: 'reference', to: [{type: 'institution'}]}),
    defineField({name: 'challenge', title: 'Challenge', type: 'portableText'}),
    defineField({name: 'intervention', title: 'Intervention', type: 'portableText'}),
    defineField({name: 'outcome', title: 'Outcome', type: 'portableText'}),
    defineField({name: 'methodology', title: 'Methodology used', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'framework'}]})]}),
    defineField({name: 'timeframe', title: 'Timeframe', type: 'string'}),
    defineField({name: 'permissionStatus', title: 'Publication permission', type: 'string', initialValue: 'notGranted', options: {list: ['notGranted', 'requested', 'granted', 'revoked']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'evidenceStatus', title: 'Evidence status', type: 'string', initialValue: 'unverified', options: {list: ['unverified', 'review', 'verified', 'rejected']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'evidence', title: 'Evidence references', type: 'array', of: [defineArrayMember({type: 'citation'})]}),
    defineField({name: 'anonymized', title: 'Anonymized case', type: 'boolean', initialValue: false}),
    defineField({name: 'relatedService', title: 'Related service', type: 'reference', to: [{type: 'program'}]}),
    defineField({name: 'relatedFramework', title: 'Related framework', type: 'reference', to: [{type: 'framework'}]}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => value?.visibility === 'public' && (value.permissionStatus !== 'granted' || value.evidenceStatus !== 'verified') ? 'Public case studies and testimonials require granted permission and verified evidence.' : true),
  preview: {select: {title: 'title', subtitle: 'recordType'}},
})
