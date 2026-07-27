import {defineField, defineType} from 'sanity'

const canonicalOrigin = process.env.SANITY_STUDIO_CANONICAL_ORIGIN ?? 'https://architect.global-mkts.com'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      description: 'Aim for 60 characters or fewer.',
      validation: (Rule) => Rule.max(60).warning('Search titles are normally truncated after 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Aim for 155 characters or fewer.',
      validation: (Rule) => Rule.max(155).warning('Search descriptions are normally truncated after 155 characters.'),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL override',
      type: 'url',
      description: `Leave blank for the generated ${canonicalOrigin} canonical. External canonicals require editorial review.`,
      validation: (Rule) =>
        Rule.uri({scheme: ['https']}).custom((value) => {
          if (!value) return true
          return value.startsWith(`${canonicalOrigin}/`) || value === canonicalOrigin
            ? true
            : 'Canonical overrides must use the approved website origin.'
        }),
    }),
    defineField({name: 'noIndex', title: 'Exclude from search indexes', type: 'boolean', initialValue: false}),
    defineField({name: 'noFollow', title: 'Do not follow page links', type: 'boolean', initialValue: false}),
    defineField({name: 'openGraphTitle', title: 'OpenGraph title', type: 'string', validation: (Rule) => Rule.max(70)}),
    defineField({name: 'openGraphDescription', title: 'OpenGraph description', type: 'text', rows: 3, validation: (Rule) => Rule.max(200)}),
    defineField({name: 'openGraphImage', title: 'OpenGraph image', type: 'controlledImage'}),
    defineField({name: 'twitterImage', title: 'Twitter card image', type: 'controlledImage'}),
    defineField({
      name: 'structuredDataEligibility',
      title: 'Structured-data eligibility',
      type: 'string',
      initialValue: 'notReviewed',
      options: {
        list: [
          {title: 'Not reviewed', value: 'notReviewed'},
          {title: 'Eligible', value: 'eligible'},
          {title: 'Not eligible', value: 'notEligible'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
