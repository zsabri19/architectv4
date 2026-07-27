import {defineField, defineType} from 'sanity'
import {hasApprovedRights, publicDocumentFields} from '../helpers'

export const institution = defineType({
  name: 'institution',
  title: 'Institution',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'relationshipLabel', title: 'Relationship label', type: 'string', description: 'State the exact relationship; never imply endorsement.', validation: (Rule) => Rule.required()}),
    defineField({name: 'approvedWording', title: 'Approved public wording', type: 'text', rows: 3}),
    defineField({name: 'logo', title: 'Logo', type: 'controlledImage'}),
    defineField({name: 'trademarkOwner', title: 'Trademark owner', type: 'string'}),
    defineField({name: 'relationshipVerified', title: 'Relationship verified', type: 'boolean', initialValue: false}),
    defineField({name: 'proofSource', title: 'Proof source', type: 'citation'}),
    defineField({name: 'displayOrder', title: 'Display order', type: 'number', validation: (Rule) => Rule.integer().min(1)}),
    defineField({name: 'logoPubliclyApproved', title: 'Logo approved for public display', type: 'boolean', initialValue: false}),
    ...publicDocumentFields,
  ],
  validation: (Rule) => Rule.custom((value) => {
    if (!value) return true
    if (value.visibility === 'public' && (!value.relationshipVerified || !value.approvedWording)) return 'Verify the relationship and approve public wording before release.'
    if (value.visibility === 'public' && value.logo && (!value.logoPubliclyApproved || !hasApprovedRights(value.logo))) return 'Logo display requires explicit approval and approved rights metadata.'
    return true
  }),
  preview: {select: {title: 'name', subtitle: 'relationshipLabel', media: 'logo.image'}},
})
