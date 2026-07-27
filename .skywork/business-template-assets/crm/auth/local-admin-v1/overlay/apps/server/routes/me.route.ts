import { Hono } from "hono";
import { apiSuccess } from "@repo/shared/http";
import { protectedRoute } from "../_core/route-helpers";

export const meRouter = new Hono();

meRouter.get("/profile", protectedRoute, (c) => {
  const user = c.var.currentUser;
  return c.json(apiSuccess({ profile: user }), 200);
});
