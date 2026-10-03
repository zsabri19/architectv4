import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageSeo } from "./PageSeo";

describe("PageSeo", () => {
  it("marks every route noindex, follow and uses the live canonical", async () => {
    render(
      <PageSeo
        title="From Exile to Transformation | The Book"
        description="Memoir"
        path="/book"
        indexable
      />,
    );

    await waitFor(() => {
      expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex, follow");
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
        "https://global-mkts.com/memoir/index.html",
      );
      expect(document.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(
        "https://global-mkts.com/memoir/index.html",
      );
    });
  });

  it("canonicalizes an unknown path to the live homepage", async () => {
    render(<PageSeo title="Missing" description="Missing" path="/book/chapter-02-pending" />);

    await waitFor(() => {
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://global-mkts.com/");
      expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex, follow");
    });
  });
});
