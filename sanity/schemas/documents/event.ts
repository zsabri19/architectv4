import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasApprovedRights, publicDocumentFields} from '../helpers'

export const event = defineType({
  name: 'event',
  title: 'Event / Speaking Engagement',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'startDate', title: 'Start date', type: 'datetime', validation: (Rule) => Rule.required()}),
    defineField({name: 'endDate', title: 'End date', type: 'datetime'}),
    defineField({name: 'city', title: 'City', type: 'string'}),
    defineField({name: 'country', title: 'Country', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'host', title: 'Host institution', type: 'reference', to: [{type: 'institution'}]}),
    defineField({name: 'role', title: 'Role', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'portableText'}),
    defineField({name: 'media', title: 'Event media', type: 'array', of: [defineArrayMember({type: 'controlledImage'})]}),
    defineField({name: 'externalUrl', title: 'Verified event URL', type: 'url', validation: (Rule) => Rule.uri({scheme: ['https']})}),
    defineField({name: 'proofAsset', title: 'Proof asset', type: 'controlledFile'}),
    defineField({name: 'hostAndDateVerified', title: 'Host and date verified', type: 'boolean', initialValue: false}),
    defineField({name: 'attendeeConsentReviewed', title: 'Attendee image consent reviewed', type: 'boolean', initialValue: false}),
    defineField({name: 'relatedService', title: 'Related service', type: 'reference', to: [{type: 'program'}]}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => {
    if (!value) return true
    if (value.visibility === 'public' && !value.hostAndDateVerified) return 'Verify the host and event date before public release.'
    if (value.visibility === 'public' && value.proofAsset && !hasApprovedRights(value.proofAsset)) return 'A public proof asset must have approved rights.'
    return true
  }),
  preview: {select: {title: 'title', subtitle: 'startDate', media: 'media.0.image'}},
})
