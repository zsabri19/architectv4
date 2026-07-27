import { useEffect } from "react";
import { siteIdentity, type RouteMeta } from "@/content/site";

/* @section: route-level-seo */
type PageSeoProps = RouteMeta & {
  type?: "website" | "article";
};

function ensureMeta(selector: string, attribute: "name" | "property", key: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  return element;
}

export function PageSeo({ title, description, path, indexable = true, type = "website" }: PageSeoProps) {
  useEffect(() => {
    const canonical = `${siteIdentity.canonicalOrigin}${path === "/" ? "/" : path}`;
    document.title = title;

    ensureMeta('meta[name="description"]', "name", "description").content = description;
    ensureMeta('meta[name="robots"]', "name", "robots").content = indexable
      ? "index, follow, max-image-preview:large"
      : "noindex, nofollow";
    ensureMeta('meta[property="og:title"]', "property", "og:title").content = title;
    ensureMeta('meta[property="og:description"]', "property", "og:description").content = description;
    ensureMeta('meta[property="og:type"]', "property", "og:type").content = type;
    ensureMeta('meta[property="og:url"]', "property", "og:url").content = canonical;
    ensureMeta('meta[name="twitter:title"]', "name", "twitter:title").content = title;
    ensureMeta('meta[name="twitter:description"]', "name", "twitter:description").content = description;

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
  }, [description, indexable, path, title, type]);

  return null;
}
