import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

export default handle(app);
