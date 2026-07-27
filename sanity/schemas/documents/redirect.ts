import {defineField, defineType} from 'sanity'

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({name: 'fromPath', title: 'From path', type: 'string', validation: (Rule) => Rule.required().regex(/^\/(?!\/)(?!.*[?#]).*$/, {name: 'root-relative path', invert: false})}),
    defineField({name: 'toPath', title: 'To path', type: 'string', validation: (Rule) => Rule.required().regex(/^\/(?!\/)(?!.*[?#]).*$/, {name: 'root-relative path', invert: false})}),
    defineField({name: 'statusCode', title: 'Status code', type: 'number', initialValue: 301, options: {list: [{title: '301 Permanent', value: 301}, {title: '302 Temporary', value: 302}, {title: '307 Temporary', value: 307}, {title: '308 Permanent', value: 308}]}, validation: (Rule) => Rule.required()}),
    defineField({name: 'reason', title: 'Reason', type: 'string'}),
    defineField({name: 'active', title: 'Active', type: 'boolean', initialValue: true}),
  ],
  validation: (Rule) => Rule.custom((value) => value?.fromPath && value.fromPath === value.toPath ? 'A redirect cannot point to itself.' : true),
  preview: {select: {from: 'fromPath', to: 'toPath', status: 'statusCode'}, prepare: ({from, to, status}) => ({title: `${from} → ${to}`, subtitle: String(status)})},
})
