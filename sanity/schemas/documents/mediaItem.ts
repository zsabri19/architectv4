import {defineField, defineType} from 'sanity'
import {hasApprovedRights, publicDocumentFields} from '../helpers'

export const mediaItem = defineType({
  name: 'mediaItem',
  title: 'Media Item',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'outlet', title: 'Outlet / platform', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'date', title: 'Publication / appearance date', type: 'date'}),
    defineField({name: 'mediaType', title: 'Type', type: 'string', options: {list: ['podcast', 'article', 'video', 'interview', 'pressRelease', 'reel', 'other']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'externalUrl', title: 'Verified URL', type: 'url', validation: (Rule) => Rule.required().uri({scheme: ['https']})}),
    defineField({name: 'embedAllowed', title: 'Embed permission confirmed', type: 'boolean', initialValue: false}),
    defineField({name: 'embedUrl', title: 'Embed URL', type: 'url', hidden: ({document}) => !document?.embedAllowed, validation: (Rule) => Rule.uri({scheme: ['https']})}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'controlledImage'}),
    defineField({name: 'transcriptExcerpt', title: 'Transcript excerpt', type: 'text', rows: 5}),
    defineField({name: 'caption', title: 'Caption', type: 'text', rows: 3}),
    defineField({name: 'verifiedAppearance', title: 'Appearance verified', type: 'boolean', initialValue: false}),
    defineField({name: 'relatedPerson', title: 'Related person', type: 'reference', to: [{type: 'person'}]}),
    defineField({name: 'relatedService', title: 'Related service', type: 'reference', to: [{type: 'program'}]}),
    defineField({name: 'relatedEvent', title: 'Related event', type: 'reference', to: [{type: 'event'}]}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => {
    if (!value) return true
    if (value.visibility === 'public' && !value.verifiedAppearance) return 'Verify the appearance before public release.'
    if (value.visibility === 'public' && value.thumbnail && !hasApprovedRights(value.thumbnail)) return 'A public thumbnail must have approved rights.'
    if (value.embedUrl && !value.embedAllowed) return 'Do not store an embed URL without confirmed embed permission.'
    return true
  }),
  preview: {select: {title: 'title', subtitle: 'outlet', media: 'thumbnail.image'}},
})
