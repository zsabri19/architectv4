import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', title: 'Site title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'canonicalOrigin', title: 'Canonical origin', type: 'url', initialValue: 'https://architect.global-mkts.com', validation: (Rule) => Rule.required().custom((value) => value === 'https://architect.global-mkts.com' ? true : 'Use https://architect.global-mkts.com as the canonical origin.')}),
    defineField({name: 'defaultDescription', title: 'Default description', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(155)}),
    defineField({name: 'defaultShareImage', title: 'Default share image', type: 'controlledImage'}),
    defineField({name: 'navigation', title: 'Primary navigation', type: 'array', of: [defineArrayMember({type: 'linkItem'})]}),
    defineField({name: 'footerLinks', title: 'Footer links', type: 'array', of: [defineArrayMember({type: 'linkItem'})]}),
    defineField({name: 'contactEmail', title: 'Public contact email', type: 'string', validation: (Rule) => Rule.required().email()}),
    defineField({name: 'socialLinks', title: 'Verified social links', type: 'array', of: [defineArrayMember({type: 'linkItem'})]}),
    defineField({name: 'bookingUrl', title: 'Verified booking URL', type: 'url', validation: (Rule) => Rule.uri({scheme: ['https']})}),
    defineField({name: 'newsletterTitle', title: 'Newsletter title', type: 'string', initialValue: 'The Clarity Dispatch'}),
    defineField({name: 'newsletterDescription', title: 'Newsletter description', type: 'text', rows: 3}),
    defineField({name: 'analyticsMeasurementId', title: 'Public analytics measurement ID', type: 'string', description: 'Public GA4/GTM identifier only. Never enter API secrets or tokens.'}),
    defineField({name: 'consentProviderId', title: 'Public consent configuration ID', type: 'string', description: 'Public identifier only; no secret keys.'}),
    defineField({name: 'defaultSeo', title: 'Default SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Site Settings', subtitle: 'Global configuration'})},
})
