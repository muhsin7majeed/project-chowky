import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, ilike, type SQLWrapper } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { protectedProcedure, router } from "../../lib/trpc";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

const orderColumns = {
  name: categories.name,
  priority: categories.priority,
  createdAt: categories.createdAt,
} as const;

const getAllZodSchema = z
  .object({
    parentId: z.number().optional(),
    isActive: z.boolean().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().optional(),
    includeChildren: z.boolean().optional(),
    orderBy: z
      .object({
        column: z.enum(["name", "priority", "createdAt"]),
        direction: z.enum(["asc", "desc"]).optional(),
      })
      .optional(),
  })
  .optional();

export const appCategoryRouter = router({
  // App category routes accessible to all authenticated users
  getAll: protectedProcedure.input(getAllZodSchema).query(async ({ input }) => {
    try {
      const { parentId, isActive, limit, offset, search, orderBy, includeChildren } = input ?? {};

      const filters = [eq(categories.isActive, isActive ?? true), ilike(categories.name, `%${search}%`)];

      if (parentId !== undefined) {
        filters.push(eq(categories.parentId, parentId));
      }

      // biome-ignore lint/suspicious/noExplicitAny: No idea how to type this!
      let orderClause: any;

      if (orderBy) {
        const column = orderColumns[orderBy.column];

        orderClause = orderBy.direction === "asc" ? asc(column) : desc(column);
      }

      const query = db
        .select()
        .from(categories)
        .where(and(...filters));

      if (orderClause) {
        query.orderBy(orderClause);
      }

      if (includeChildren) {
        query.leftJoin(categories, eq(categories.parentId, categories.id));
      }

      query.limit(limit ?? DEFAULT_LIMIT).offset(offset ?? DEFAULT_OFFSET);

      return await query;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch categories",
      });
    }
  }),
});
