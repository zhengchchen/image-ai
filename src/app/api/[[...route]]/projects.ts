import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { projectInsertSchema, projects, users } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .patch(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "json",
      projectInsertSchema
        .omit({
          id:true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial()
    ),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if(!auth.token?.id){
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .update(projects)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id.toString())))
        .returning();

      if (!data[0]) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      return c.json({ data: data[0] });
    }
  )
  .get(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        // @ts-ignore
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (!data[0]) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data: data[0] });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      projectInsertSchema.pick({
        name: true,
        json: true,
        height: true,
        width: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { name, json, height, width } = c.req.valid("json");
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const data = await db
        .insert(projects)
        // @ts-ignore
        .values({
          name,
          json,
          height,
          width,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!data[0]) {
        return c.json({ error: "Something went wrong" }, 400);
      }
      return c.json({ data: data[0] });
    }
  );

export default app;
