import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../db";
import { todo } from "../db/schema/todo";
import { protectedProcedure, router } from "../lib/trpc";

export const todoRouter = router({
  getAll: protectedProcedure.query(async () => {
    return await db.select().from(todo);
  }),

  create: protectedProcedure.input(z.object({ text: z.string().min(1) })).mutation(async ({ input }) => {
    return await db.insert(todo).values({
      text: input.text,
    });
  }),

  toggle: protectedProcedure.input(z.object({ id: z.number(), completed: z.boolean() })).mutation(async ({ input }) => {
    return await db.update(todo).set({ completed: input.completed }).where(eq(todo.id, input.id));
  }),

  delete: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    return await db.delete(todo).where(eq(todo.id, input.id));
  }),
});
