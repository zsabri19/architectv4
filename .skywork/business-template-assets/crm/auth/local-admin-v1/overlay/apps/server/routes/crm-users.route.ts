import { Hono, type Context } from "hono";
import { z } from "zod";
import { apiFailure, apiSuccess } from "@repo/shared/http";
import { adminRoute } from "../_core/route-helpers";
import {
  CrmUserAdminError,
  createCrmUser,
  listCrmUsers,
  setCrmUserRole,
  setCrmUserStatus
} from "../services/crm-auth/admin-users";

const CreateSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  password: z.string().min(10).max(128),
  role: z.enum(["admin", "member"]).default("member")
});
const UpdateSchema = z.object({
  role: z.enum(["admin", "member"]).optional(),
  status: z.enum(["active", "disabled"]).optional()
}).refine((value) => value.role !== undefined || value.status !== undefined);

export const crmUsersRouter = new Hono();

function errorResponse(error: unknown) {
  if (error instanceof CrmUserAdminError) {
    return new Response(JSON.stringify(apiFailure(error.code, error.message)), {
      status: error.status,
      headers: { "content-type": "application/json" }
    });
  }
  throw error;
}

crmUsersRouter.get("", adminRoute, async (c) => c.json(apiSuccess({ users: await listCrmUsers() }), 200));
crmUsersRouter.get("/", adminRoute, async (c) => c.json(apiSuccess({ users: await listCrmUsers() }), 200));

const createUserHandler = async (c: Context) => {
  const parsed = CreateSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json(apiFailure("INVALID_INPUT", "Valid name, email, password, and role are required"), 400);
  try {
    return c.json(apiSuccess({ user: await createCrmUser(c.var.currentUser.id, parsed.data, c.req.raw.headers) }), 201);
  } catch (error) {
    return errorResponse(error);
  }
};

crmUsersRouter.post("", adminRoute, createUserHandler);
crmUsersRouter.post("/", adminRoute, createUserHandler);

crmUsersRouter.patch("/:id", adminRoute, async (c) => {
  const parsed = UpdateSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json(apiFailure("INVALID_INPUT", "Role or status is required"), 400);
  try {
    if (parsed.data.role) await setCrmUserRole(c.var.currentUser.id, c.req.param("id"), parsed.data.role);
    if (parsed.data.status) await setCrmUserStatus(c.var.currentUser.id, c.req.param("id"), parsed.data.status);
    return c.json(apiSuccess({ updated: true }), 200);
  } catch (error) {
    return errorResponse(error);
  }
});
