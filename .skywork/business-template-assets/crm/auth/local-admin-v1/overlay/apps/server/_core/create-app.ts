import { Hono } from "hono";
import { cors } from "hono/cors";
import { apiFailure } from "@repo/shared/http";
import { routeEntries } from "./route-registry";
import { withSession } from "../middlewares/with-session";
import { notFound } from "../middlewares/not-found";
import { onError } from "../middlewares/on-error";
import { getAuth } from "./auth";
import { isDatabaseConfigured } from "./db";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: (origin) => origin || "*",
    exposeHeaders: ["set-auth-token"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  })
);

app.options("/api/auth/*", (c) => c.body(null, 204));
app.on(["GET", "POST"], "/api/auth/*", (c) => {
  if (!isDatabaseConfigured()) {
    return c.json(apiFailure("DATABASE_UNCONFIGURED", "Skybase database runtime env is not configured"), 503);
  }

  const pathname = new URL(c.req.url).pathname;
  if (c.req.method === "POST" && pathname === "/api/auth/sign-up/email") {
    return c.json(
      apiFailure("REGISTRATION_CLOSED", "Use the CRM bootstrap page or ask an administrator to create your account"),
      403
    );
  }

  return getAuth().handler(c.req.raw);
});
app.use("/api/*", withSession);

for (const { path, router } of routeEntries) app.route(path, router);

app.onError(onError);
app.notFound(notFound);

export default app;
