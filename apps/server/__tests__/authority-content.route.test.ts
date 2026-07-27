// Endpoint verification for the public authority content API.
// The current deployment has no configured Sanity project, so the route
// must return the safe static fallback and never expose a token or crash.

import { beforeAll, describe, expect, it } from "vitest";
import app from "../_core/create-app";
import { applyMigrations } from "../_test/helpers";

beforeAll(async () => {
  await applyMigrations();
});

describe("authority-content.route: public read endpoint", () => {
  it("GET /api/authority-content returns 200 with static fallback", async () => {
    const res = await app.fetch(new Request("http://localhost/api/authority-content"));
    expect(res.status).toBe(200);

    const body = (await res.json()) as {
      ok: boolean;
      data?: {
        source: string;
        frameworks: unknown[];
        articles: unknown[];
        chapters: unknown[];
        newsletterIssues: unknown[];
      };
    };

    expect(body.ok).toBe(true);
    expect(body.data?.source).toBe("static-fallback");
    expect(body.data?.frameworks).toEqual([]);
    expect(body.data?.articles).toEqual([]);
    expect(body.data?.chapters).toEqual([]);
    expect(body.data?.newsletterIssues).toEqual([]);
  });

  it("GET /api/authority-content/ returns 200 with static fallback", async () => {
    const res = await app.fetch(new Request("http://localhost/api/authority-content/"));
    expect(res.status).toBe(200);

    const body = (await res.json()) as {
      ok: boolean;
      data?: { source: string };
    };

    expect(body.ok).toBe(true);
    expect(body.data?.source).toBe("static-fallback");
  });
});
