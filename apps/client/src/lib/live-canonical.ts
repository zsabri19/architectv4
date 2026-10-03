/** Preferred origin for the published site. The GitHub Pages host is a mirror. */
export const LIVE_ORIGIN = "https://global-mkts.com";

export const LIVE_HOME = `${LIVE_ORIGIN}/`;

/**
 * Mirror path → live URL, only where an equivalent page exists.
 * Paths that are absent here canonicalize to the live homepage.
 * Equivalence was checked against https://global-mkts.com (same path, a
 * shortened slug with the same title, or a 301 from the mirror path).
 */
export const liveCanonicalByPath: Record<string, string> = {
  "/": LIVE_HOME,
  "/the-architect": `${LIVE_ORIGIN}/the-architect`,
  "/clarityos": `${LIVE_ORIGIN}/clarityos`,
  "/book": `${LIVE_ORIGIN}/memoir/index.html`,
  "/frameworks": `${LIVE_ORIGIN}/frameworks`,
  "/services": `${LIVE_ORIGIN}/services`,
  "/insights": `${LIVE_ORIGIN}/insights`,
  "/media": `${LIVE_ORIGIN}/media`,
  "/newsletter": `${LIVE_ORIGIN}/newsletter`,
  "/contact": `${LIVE_ORIGIN}/connect`,
  "/book/chapter-01-born-between-worlds": `${LIVE_ORIGIN}/memoir/ch-01-born-between-worlds.html`,
  "/book/chapter-09-the-pyramid-a-framework-for-everything": `${LIVE_ORIGIN}/memoir/ch-07-the-pyramid.html`,
  "/frameworks/exile-resilience-framework": `${LIVE_ORIGIN}/frameworks/exile-resilience`,
  "/frameworks/cultural-ecosystem-mapping": `${LIVE_ORIGIN}/frameworks/cultural-ecosystem-mapping`,
  "/frameworks/identity-preservation-under-change": `${LIVE_ORIGIN}/frameworks/identity-preservation`,
  "/frameworks/constraint-based-innovation": `${LIVE_ORIGIN}/frameworks/constraint-based-innovation`,
  "/frameworks/governance-as-accelerator": `${LIVE_ORIGIN}/frameworks/governance-as-accelerator`,
  "/frameworks/market-volatility-navigation": `${LIVE_ORIGIN}/frameworks/market-volatility-navigation`,
  "/frameworks/crisis-as-audit": `${LIVE_ORIGIN}/frameworks/crisis-as-audit`,
  "/frameworks/the-pyramid-framework": `${LIVE_ORIGIN}/frameworks/pyramid-framework`,
  "/frameworks/function-reframing": `${LIVE_ORIGIN}/frameworks/function-reframing`,
  "/frameworks/cross-cultural-authority": `${LIVE_ORIGIN}/frameworks/cross-cultural-authority`,
  "/frameworks/super-labor-framework": `${LIVE_ORIGIN}/frameworks/super-labor`,
  "/frameworks/digital-nation-building": `${LIVE_ORIGIN}/frameworks/digital-nation-building`,
  "/frameworks/ai-governance-integration": `${LIVE_ORIGIN}/frameworks/ai-governance-integration`,
  "/frameworks/character-compass": `${LIVE_ORIGIN}/frameworks/character-compass`,
  "/insights/the-investment-paradox": `${LIVE_ORIGIN}/insights/the-investment-paradox`,
  "/insights/ai-adoption-vs-human-readiness": `${LIVE_ORIGIN}/insights/ai-adoption-vs-human-readiness`,
  "/insights/foundation-before-scale": `${LIVE_ORIGIN}/insights/foundation-before-scale`,
  "/insights/what-crisis-reveals-before-the-dashboard-does": `${LIVE_ORIGIN}/insights/what-crisis-reveals-before-the-dashboard-does`,
  "/insights/cross-cultural-authority-in-the-gcc": `${LIVE_ORIGIN}/insights/cross-cultural-authority-in-the-gcc`,
  "/insights/governance-as-an-accelerator": `${LIVE_ORIGIN}/insights/governance-as-an-accelerator`,
};

export function normalizeMirrorPath(path: string): string {
  const withoutHash = path.split("#", 1)[0] ?? "";
  const withoutQuery = withoutHash.split("?", 1)[0] ?? "";
  if (!withoutQuery || withoutQuery === "/") return "/";
  const withSlash = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

/** Canonical URL on global-mkts.com for a mirror path, or the live homepage. */
export function liveCanonical(path: string): string {
  return liveCanonicalByPath[normalizeMirrorPath(path)] ?? LIVE_HOME;
}

/** Homepage Open Graph image. Confirmed 200 on the live site. */
export const DEFAULT_OG_IMAGE = `${LIVE_ORIGIN}/assets/hero.jpg`;

/**
 * Share image for a mirror path. Uses the live page's og:image when that
 * file returns 200. The mirror's local recovered images are not on the live
 * host, so every other path uses the live default.
 */
export const liveOgImageByPath: Record<string, string> = {
  "/": DEFAULT_OG_IMAGE,
  "/the-architect": `${LIVE_ORIGIN}/assets/origin.jpg`,
  "/clarityos": `${LIVE_ORIGIN}/assets/cover.jpg`,
  "/book": `${LIVE_ORIGIN}/memoir/assets/photos/cover-headshot.jpeg`,
  "/media": `${LIVE_ORIGIN}/assets/banner-decode.jpg`,
  "/newsletter": `${LIVE_ORIGIN}/assets/portrait-6.jpg`,
  "/contact": `${LIVE_ORIGIN}/assets/portrait-3.jpg`,
  "/book/chapter-01-born-between-worlds": `${LIVE_ORIGIN}/memoir/assets/photos/cover-headshot.jpeg`,
  "/book/chapter-09-the-pyramid-a-framework-for-everything": `${LIVE_ORIGIN}/memoir/assets/photos/cover-headshot.jpeg`,
};

export function liveOgImage(path: string): string {
  return liveOgImageByPath[normalizeMirrorPath(path)] ?? DEFAULT_OG_IMAGE;
}
