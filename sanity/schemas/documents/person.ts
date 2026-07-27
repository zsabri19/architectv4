import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasApprovedRights, publicDocumentFields} from '../helpers'

export const person = defineType({
  name: 'person',
  title: 'Person / Author',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name', maxLength: 96}, validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Role / positioning', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'shortBio', title: 'Short bio', type: 'text', rows: 4, validation: (Rule) => Rule.required().max(400)}),
    defineField({name: 'longBio', title: 'Long bio', type: 'portableText'}),
    defineField({name: 'portrait', title: 'Portrait', type: 'controlledImage'}),
    defineField({name: 'credentials', title: 'Credentials', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'sameAs', title: 'Verified profile URLs', type: 'array', of: [defineArrayMember({type: 'url', validation: (Rule) => Rule.uri({scheme: ['https']})})]}),
    defineField({name: 'evidence', title: 'Evidence register', type: 'array', of: [defineArrayMember({type: 'citation'})]}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => value?.visibility === 'public' && value.portrait && !hasApprovedRights(value.portrait) ? 'A public portrait must have owned, licensed, or public-domain rights.' : true),
  preview: {select: {title: 'name', subtitle: 'role', media: 'portrait.image'}},
})
