import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { LIVE_HOME, liveCanonical, liveCanonicalByPath } from "./live-canonical";

const expected: Record<string, string> = {
  "/": "https://global-mkts.com/",
  "/the-architect": "https://global-mkts.com/the-architect",
  "/clarityos": "https://global-mkts.com/clarityos",
  "/book": "https://global-mkts.com/memoir/index.html",
  "/frameworks": "https://global-mkts.com/frameworks",
  "/services": "https://global-mkts.com/services",
  "/insights": "https://global-mkts.com/insights",
  "/media": "https://global-mkts.com/media",
  "/newsletter": "https://global-mkts.com/newsletter",
  "/contact": "https://global-mkts.com/connect",
  "/book/chapter-01-born-between-worlds": "https://global-mkts.com/memoir/ch-01-born-between-worlds.html",
  "/book/chapter-09-the-pyramid-a-framework-for-everything": "https://global-mkts.com/memoir/ch-07-the-pyramid.html",
  "/frameworks/exile-resilience-framework": "https://global-mkts.com/frameworks/exile-resilience",
  "/frameworks/cultural-ecosystem-mapping": "https://global-mkts.com/frameworks/cultural-ecosystem-mapping",
  "/frameworks/identity-preservation-under-change": "https://global-mkts.com/frameworks/identity-preservation",
  "/frameworks/constraint-based-innovation": "https://global-mkts.com/frameworks/constraint-based-innovation",
  "/frameworks/governance-as-accelerator": "https://global-mkts.com/frameworks/governance-as-accelerator",
  "/frameworks/market-volatility-navigation": "https://global-mkts.com/frameworks/market-volatility-navigation",
  "/frameworks/crisis-as-audit": "https://global-mkts.com/frameworks/crisis-as-audit",
  "/frameworks/the-pyramid-framework": "https://global-mkts.com/frameworks/pyramid-framework",
  "/frameworks/function-reframing": "https://global-mkts.com/frameworks/function-reframing",
  "/frameworks/cross-cultural-authority": "https://global-mkts.com/frameworks/cross-cultural-authority",
  "/frameworks/super-labor-framework": "https://global-mkts.com/frameworks/super-labor",
  "/frameworks/digital-nation-building": "https://global-mkts.com/frameworks/digital-nation-building",
  "/frameworks/ai-governance-integration": "https://global-mkts.com/frameworks/ai-governance-integration",
  "/frameworks/character-compass": "https://global-mkts.com/frameworks/character-compass",
  "/insights/the-investment-paradox": "https://global-mkts.com/insights/the-investment-paradox",
  "/insights/ai-adoption-vs-human-readiness": "https://global-mkts.com/insights/ai-adoption-vs-human-readiness",
  "/insights/foundation-before-scale": "https://global-mkts.com/insights/foundation-before-scale",
  "/insights/what-crisis-reveals-before-the-dashboard-does": "https://global-mkts.com/insights/what-crisis-reveals-before-the-dashboard-does",
  "/insights/cross-cultural-authority-in-the-gcc": "https://global-mkts.com/insights/cross-cultural-authority-in-the-gcc",
  "/insights/governance-as-an-accelerator": "https://global-mkts.com/insights/governance-as-an-accelerator",
};

describe("liveCanonical", () => {
  it("maps every mirror page that has a live equivalent", () => {
    expect(liveCanonicalByPath).toEqual(expected);
    for (const [path, canonical] of Object.entries(expected)) {
      expect(liveCanonical(path)).toBe(canonical);
      expect(canonical.startsWith("https://global-mkts.com")).toBe(true);
      expect(canonical).not.toContain("github.io");
    }
  });

  it("sends paths without a live equivalent to the homepage", () => {
    expect(liveCanonical("/book/chapter-02-pending")).toBe(LIVE_HOME);
    expect(liveCanonical("/missing")).toBe(LIVE_HOME);
    expect(liveCanonical("/frameworks/not-a-framework")).toBe(LIVE_HOME);
  });

  it("ignores trailing slashes and query strings", () => {
    expect(liveCanonical("/book/")).toBe(expected["/book"]);
    expect(liveCanonical("/insights/the-investment-paradox?utm=1")).toBe(
      expected["/insights/the-investment-paradox"],
    );
  });
});

describe("static deindex files", () => {
  const clientRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

  it("puts noindex and the live homepage canonical on every HTML document", () => {
    for (const file of ["index.html", "public/404.html"]) {
      const html = readFileSync(resolve(clientRoot, file), "utf8");
      expect(html).toContain('<meta name="robots" content="noindex, follow" />');
      expect(html).toContain('<link rel="canonical" href="https://global-mkts.com/" />');
      expect(html).not.toContain('rel="canonical" href="https://zsabri19.github.io');
    }
  });

  it("does not list mirror URLs in sitemap.xml and does not disallow crawling", () => {
    const sitemap = readFileSync(resolve(clientRoot, "public/sitemap.xml"), "utf8");
    const robots = readFileSync(resolve(clientRoot, "public/robots.txt"), "utf8");
    expect(sitemap).not.toContain("<loc>");
    expect(sitemap).not.toContain("github.io");
    expect(robots.toLowerCase()).not.toContain("disallow");
  });
});
