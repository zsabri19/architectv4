import {defineField, defineType} from 'sanity'

export const assetMetadata = defineType({
  name: 'assetMetadata',
  title: 'Asset metadata and rights',
  type: 'object',
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return 'Asset metadata is required.'
      if (!value.altText && !value.decorative) return 'Provide alt text or mark the asset decorative.'
      if (!value.rightsStatus) return 'Select a rights status.'
      return true
    }),
  fields: [
    defineField({name: 'altText', title: 'Alternative text', type: 'string', validation: (Rule) => Rule.max(240)}),
    defineField({name: 'decorative', title: 'Decorative asset (empty alt)', type: 'boolean', initialValue: false}),
    defineField({name: 'caption', title: 'Caption', type: 'text', rows: 2}),
    defineField({name: 'credit', title: 'Credit line', type: 'string'}),
    defineField({name: 'copyrightOwner', title: 'Copyright / trademark owner', type: 'string'}),
    defineField({name: 'sourceUrl', title: 'Source URL', type: 'url', validation: (Rule) => Rule.uri({scheme: ['https']})}),
    defineField({
      name: 'rightsStatus',
      title: 'Rights status',
      type: 'string',
      options: {
        list: [
          {title: 'Unverified — blocked from public use', value: 'unverified'},
          {title: 'Permission requested', value: 'permissionRequested'},
          {title: 'Licensed / permission confirmed', value: 'licensed'},
          {title: 'Owned', value: 'owned'},
          {title: 'Public domain', value: 'publicDomain'},
          {title: 'Expired / revoked — blocked', value: 'blocked'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permittedPlacements',
      title: 'Permitted placements',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Website', value: 'website'},
          {title: 'Social media', value: 'social'},
          {title: 'Press kit', value: 'pressKit'},
          {title: 'Email', value: 'email'},
          {title: 'Paid media', value: 'paidMedia'},
          {title: 'Print', value: 'print'},
        ],
      },
    }),
    defineField({name: 'reviewOrExpiryDate', title: 'Rights review / expiry date', type: 'date'}),
    defineField({name: 'evidenceNote', title: 'Permission or evidence note', type: 'text', rows: 3}),
  ],
})

export const controlledImage = defineType({
  name: 'controlledImage',
  title: 'Image with rights metadata',
  type: 'object',
  validation: (Rule) =>
    Rule.custom((rawValue) => {
      if (!rawValue) return true
      const value = rawValue as {metadata?: {rightsStatus?: string}}
      const rightsStatus = value.metadata?.rightsStatus
      if (!rightsStatus) return 'Rights metadata is required when an image is selected.'
      return true
    }),
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required()}),
    defineField({name: 'metadata', title: 'Metadata and rights', type: 'assetMetadata', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'metadata.altText', subtitle: 'metadata.rightsStatus', media: 'image'}},
})

export const controlledFile = defineType({
  name: 'controlledFile',
  title: 'File with rights metadata',
  type: 'object',
  fields: [
    defineField({name: 'file', title: 'File', type: 'file', validation: (Rule) => Rule.required()}),
    defineField({name: 'metadata', title: 'Metadata and rights', type: 'assetMetadata', validation: (Rule) => Rule.required()}),
    defineField({name: 'version', title: 'Version label', type: 'string'}),
  ],
  preview: {select: {title: 'metadata.caption', subtitle: 'metadata.rightsStatus'}},
})
