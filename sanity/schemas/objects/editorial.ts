import {defineArrayMember, defineField, defineType} from 'sanity'

export const portableText = defineType({
  name: 'portableText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({name: 'href', title: 'URL', type: 'url', validation: (Rule) => Rule.required().uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']})}),
              defineField({name: 'newWindow', title: 'Open in new window', type: 'boolean', initialValue: false}),
            ],
          },
        ],
      },
    }),
    defineArrayMember({type: 'controlledImage'}),
  ],
})

export const linkItem = defineType({
  name: 'linkItem',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'href', title: 'URL or path', type: 'string', validation: (Rule) => Rule.required().custom((value) => !value || value.startsWith('/') || /^https:\/\//.test(value) || /^mailto:/.test(value) ? true : 'Use a root-relative path, HTTPS URL, or mailto link.')}),
    defineField({name: 'external', title: 'External link', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'href', title: 'URL or path', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'analyticsKey', title: 'Analytics key', type: 'string', validation: (Rule) => Rule.regex(/^[a-z0-9_-]+$/).warning('Use lowercase letters, numbers, hyphens, and underscores only.')}),
  ],
})

export const citation = defineType({
  name: 'citation',
  title: 'Evidence / citation',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Source label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'url', title: 'Source URL', type: 'url', validation: (Rule) => Rule.uri({scheme: ['https']})}),
    defineField({name: 'accessedAt', title: 'Accessed date', type: 'date'}),
    defineField({name: 'internalEvidenceNote', title: 'Internal evidence note', type: 'text', rows: 3}),
    defineField({
      name: 'verificationStatus',
      title: 'Verification status',
      type: 'string',
      options: {list: [
        {title: 'Unverified', value: 'unverified'},
        {title: 'Under review', value: 'review'},
        {title: 'Verified', value: 'verified'},
        {title: 'Rejected', value: 'rejected'},
      ]},
      initialValue: 'unverified',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'object',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'answer', title: 'Answer', type: 'portableText', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'question'}},
})
