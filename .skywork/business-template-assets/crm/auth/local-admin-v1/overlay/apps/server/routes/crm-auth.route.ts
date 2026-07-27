import { Hono } from "hono";
import { z } from "zod";
import { apiFailure, apiSuccess } from "@repo/shared/http";
import { bootstrapCrmAdmin, getCrmBootstrapStatus } from "../services/crm-auth/bootstrap";

const BootstrapSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  password: z.string().min(10).max(128)
});

export const isPublic = true;
export const crmAuthRouter = new Hono();

crmAuthRouter.get("/status", async (c) => c.json(apiSuccess(await getCrmBootstrapStatus()), 200));

crmAuthRouter.post("/bootstrap", async (c) => {
  const parsed = BootstrapSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json(apiFailure("INVALID_INPUT", "Name, email, and a password of at least 10 characters are required"), 400);

  const result = await bootstrapCrmAdmin(parsed.data, c.req.raw.headers);
  const headers = new Headers({ "content-type": "application/json" });
  if (result.token) headers.set("set-auth-token", result.token);
  return new Response(JSON.stringify(result.body), { status: result.status, headers });
});
