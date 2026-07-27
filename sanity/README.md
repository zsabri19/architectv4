# Sanity CMS workspace

This directory is an isolated Sanity Studio and schema foundation for the authority platform. It does not store lead submissions and does not contain browser or API secrets.

## Configure

1. Create or select a Sanity project and dataset.
2. Copy `.env.example` to `.env`.
3. Set the public identifiers `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`.
4. Optionally set `SANITY_STUDIO_HOSTNAME` for Studio deployment.
5. From this directory, install and run:

```sh
pnpm install
pnpm typecheck
pnpm dev
```

## Public read model

`lib/publicClient.ts` creates a tokenless client with `perspective: "published"`. It deliberately has no token parameter. Public site reads require:

- a public/readable production dataset in Sanity project settings;
- CORS origins limited to `https://architect.global-mkts.com` and explicitly required local-development origins;
- public queries that require `visibility == "public"`, exclude drafts, and respect `seo.noIndex`;
- no write token, preview token, management token, or webhook secret in browser variables.

`lib/queries.ts` contains safe examples. Chapter queries additionally require `titleApprovalStatus == "confirmed"`, so placeholder or unconfirmed chapter records cannot enter public navigation, pages, or sitemap output.

## Chapter publication controls

A chapter cannot validate as public unless:

- its title is confirmed and contains no pending/TBD/placeholder wording;
- a non-placeholder slug exists;
- the confirmer and confirmation timestamp are recorded;
- excerpt/body permission is recorded when body content exists;
- it is not marked `seo.noIndex`.

The public GROQ layer repeats the title-confirmation check as defense in depth. Sanity publishing itself remains an editorial action, so project roles and review workflows should restrict publish permission to approved editors.

## Asset rights controls

All modeled images and files use `controlledImage` or `controlledFile`, which attach reusable `assetMetadata`. Public document validation blocks key image/file uses unless rights are `owned`, `licensed`, or `publicDomain`. Institution logos require an additional explicit public-display approval.

## Content relationships

The model connects:

- Book → six Book Parts → Book Chapters;
- Chapters → Framework, Articles, Service;
- Frameworks → Lead Magnet, Chapter, Articles, Service, Case Studies;
- Articles → Framework, Chapter, Lead Magnet, Service, Author;
- Media → Person, Service, Event;
- Institutions → Cases and Events;
- Events → Host Institution and Service.

No `Form Submission`, lead, consent-record, or CRM document exists. Lead records belong in a secure server-side form/email/CRM endpoint.

## Live values still required

- Sanity project ID.
- Dataset name and public/private read decision (the supplied example defaults to `production`).
- Sanity organization/project ownership and editor roles.
- Studio hostname, if deploying Sanity Studio.
- Production and local-development CORS allowlist.
- Preview/draft architecture, if authorized preview is later required (server-side token only).
- Webhook destination and signing secret for deploy/revalidation (server/deployment secret only).
- Final analytics/consent public IDs; these are content values, not secrets.

Never commit tokens or credentials to this workspace.
