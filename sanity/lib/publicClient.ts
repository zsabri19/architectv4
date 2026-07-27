import {createClient, type SanityClient} from '@sanity/client'

export type PublicSanityConfig = {
  projectId: string
  dataset: string
  apiVersion?: string
  useCdn?: boolean
}

/**
 * Creates a public, read-only client. This function intentionally accepts no token.
 * The dataset must be configured for public reads in manage.sanity.io, and CORS must
 * allow only the deployed website and trusted local development origins.
 */
export function createPublicSanityClient({
  projectId,
  dataset,
  apiVersion = '2026-07-27',
  useCdn = true,
}: PublicSanityConfig): SanityClient {
  if (!projectId || !dataset) {
    throw new Error('Sanity projectId and dataset are required for public reads.')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
  })
}
