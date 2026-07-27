import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {singletonActions, singletonTemplates, structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'

if (!projectId) {
  throw new Error('SANITY_STUDIO_PROJECT_ID is required. Copy .env.example to .env and set the public project ID.')
}

export default defineConfig({
  name: 'default',
  title: 'Zeeshan Sabri Authority Platform',
  projectId,
  dataset,
  plugins: [structureTool({structure}), visionTool({defaultApiVersion: '2026-07-27'})],
  schema: {
    types: schemaTypes,
    templates: singletonTemplates,
  },
  document: {
    actions: singletonActions,
  },
})
