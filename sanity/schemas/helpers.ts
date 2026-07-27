import {defineField, type FieldDefinition} from 'sanity'

export const visibilityField = defineField({
  name: 'visibility',
  title: 'Public visibility',
  type: 'string',
  initialValue: 'private',
  options: {
    list: [
      {title: 'Private / internal only', value: 'private'},
      {title: 'Public', value: 'public'},
      {title: 'Archived', value: 'archived'},
    ],
    layout: 'radio',
  },
  validation: (Rule) => Rule.required(),
})

export const seoField = defineField({name: 'seo', title: 'SEO', type: 'seo'})

export const publicDocumentFields: FieldDefinition[] = [visibilityField, seoField]

export function hasApprovedRights(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false
  const metadata = (value as {metadata?: {rightsStatus?: string}}).metadata
  return metadata?.rightsStatus === 'owned' || metadata?.rightsStatus === 'licensed' || metadata?.rightsStatus === 'publicDomain'
}
