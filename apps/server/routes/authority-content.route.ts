import { Hono, type Context } from "hono";
import { apiSuccess } from "@repo/shared/http";

// Public: content endpoint is read-only and must not require a session.
export const isPublic = true;

export const authorityContentRouter = new Hono();

type AuthorityContentPayload = {
  source: "sanity" | "static-fallback";
  frameworks: unknown[];
  articles: unknown[];
  chapters: unknown[];
  newsletterIssues: unknown[];
};

const PUBLIC_DOCUMENT_FILTER = `visibility == "public" && coalesce(seo.noIndex, false) == false`;
const CONFIRMED_CHAPTER_FILTER = `${PUBLIC_DOCUMENT_FILTER} && titleApprovalStatus == "confirmed" && !(_id in path("drafts.**"))`;

const frameworksQuery = `*[_type == "framework" && ${PUBLIC_DOCUMENT_FILTER} && !(_id in path("drafts.**"))] | order(displayOrder asc) { _id, title, "slug": slug.current, shortDefinition, category, impactStatement, seo }`;
const articlesQuery = `*[_type == "article" && ${PUBLIC_DOCUMENT_FILTER} && !(_id in path("drafts.**"))] | order(publishedAt desc) { _id, title, "slug": slug.current, summary, publishedAt, updatedAt, featured, seo }`;
const chaptersQuery = `*[_type == "bookChapter" && ${CONFIRMED_CHAPTER_FILTER}] | order(chapterNumber asc) { _id, chapterNumber, title, "slug": slug.current, summary, keyLesson, seo }`;
const newsletterIssuesQuery = `*[_type == "newsletterIssue" && ${PUBLIC_DOCUMENT_FILTER} && !(_id in path("drafts.**"))] | order(issueNumber desc) { _id, issueNumber, title, "slug": slug.current, summary, publishedAt, seo }`;

const staticFallback: AuthorityContentPayload = {
  source: "static-fallback",
  frameworks: [],
  articles: [],
  chapters: [],
  newsletterIssues: []
};

async function querySanityWithTimeout(
  projectId: string,
  dataset: string,
  query: string,
  apiVersion: string
): Promise<unknown[] | null> {
  const encoded = encodeURIComponent(query);
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encoded}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    const body = (await response.json()) as { result?: unknown[] };
    return body.result ?? [];
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function loadSanityContent(): Promise<AuthorityContentPayload | null> {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const apiVersion = process.env.SANITY_API_VERSION ?? "2026-07-27";

  if (!projectId || !dataset) {
    return null;
  }

  const [frameworks, articles, chapters, newsletterIssues] = await Promise.all([
    querySanityWithTimeout(projectId, dataset, frameworksQuery, apiVersion),
    querySanityWithTimeout(projectId, dataset, articlesQuery, apiVersion),
    querySanityWithTimeout(projectId, dataset, chaptersQuery, apiVersion),
    querySanityWithTimeout(projectId, dataset, newsletterIssuesQuery, apiVersion)
  ]);

  if (frameworks === null || articles === null || chapters === null || newsletterIssues === null) {
    return null;
  }

  return {
    source: "sanity",
    frameworks,
    articles,
    chapters,
    newsletterIssues
  };
}

const serveAuthorityContent = async (c: Context) => {
  const content = await loadSanityContent();
  return c.json(apiSuccess(content ?? staticFallback), 200);
};

authorityContentRouter.get("/", serveAuthorityContent);
authorityContentRouter.get("", serveAuthorityContent);
authorityContentRouter.get("/*", serveAuthorityContent);
