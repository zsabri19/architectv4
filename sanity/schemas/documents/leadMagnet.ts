import {defineField, defineType} from 'sanity'
import {hasApprovedRights, publicDocumentFields} from '../helpers'

export const leadMagnet = defineType({
  name: 'leadMagnet',
  title: 'Lead Magnet',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'format', title: 'Format', type: 'string', options: {list: ['pdf', 'canvas', 'checklist', 'assessment', 'playbook', 'guide', 'other']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'download', title: 'Download file', type: 'controlledFile'}),
    defineField({name: 'previewImage', title: 'Preview image', type: 'controlledImage'}),
    defineField({name: 'emailGated', title: 'Email gated', type: 'boolean', initialValue: true}),
    defineField({name: 'deliveryCopy', title: 'Delivery copy', type: 'portableText'}),
    defineField({name: 'consentText', title: 'Consent text', type: 'text', rows: 3}),
    defineField({name: 'relatedFramework', title: 'Related framework', type: 'reference', to: [{type: 'framework'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'relatedService', title: 'Related service', type: 'reference', to: [{type: 'program'}]}),
    defineField({name: 'analyticsKey', title: 'Analytics key', type: 'string', validation: (Rule) => Rule.required().regex(/^[a-z0-9_-]+$/)}),
    defineField({name: 'assetReady', title: 'Finished asset approved for release', type: 'boolean', initialValue: false}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => {
    if (!value) return true
    if (value.visibility === 'public' && !value.assetReady) return 'The resource concept cannot be public until the finished asset is approved.'
    if (value.visibility === 'public' && (!value.download || !hasApprovedRights(value.download))) return 'A public download must have a file with approved rights.'
    if (value.emailGated && !value.consentText) return 'Email-gated resources require explicit consent copy.'
    return true
  }),
  preview: {select: {title: 'title', subtitle: 'format', media: 'previewImage.image'}},
})
