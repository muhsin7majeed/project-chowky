import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { protectedProcedure } from "@/lib/trpc";
import { getAllCategoriesZodSchema } from "@/lib/zod-schema/categories";

type CategoryWithChildren = {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number | null;
  imageUrl: string | null;
  priority: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  subCategories?: CategoryWithChildren[];
};

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

const orderColumns = {
  name: categories.name,
  priority: categories.priority,
  createdAt: categories.createdAt,
} as const;

// Helper function to build nested category tree
const buildCategoryTree = (
  allCategories: CategoryWithChildren[],
  parentId: number | null = null,
): CategoryWithChildren[] => {
  const children = allCategories.filter((category) => category.parentId === parentId);

  return children.map((category) => ({
    ...category,
    subCategories: buildCategoryTree(allCategories, category.id),
  }));
};

const getCategoriesController = protectedProcedure.input(getAllCategoriesZodSchema).query(async ({ input }) => {
  try {
    const { parentId, status, limit, offset, search, orderBy, includeChildren } = input ?? {};

    // Doing this for easier filtering in the frontend
    const isActive = status === "active" ? true : status === "inactive" ? false : undefined;

    if (includeChildren) {
      // When includeChildren is true, fetch all categories and build tree
      const filters = [eq(categories.isActive, isActive ?? true)];

      if (search) {
        filters.push(ilike(categories.name, `%${search}%`));
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

      // Fetch all categories (no limit/offset when building tree)
      const allCategories = await query;

      // Build nested tree structure starting from root categories (parentId is null)
      const rootCategories = buildCategoryTree(allCategories as CategoryWithChildren[], parentId ?? null);

      // Apply pagination to root categories only
      const paginatedRoots = rootCategories.slice(
        offset ?? DEFAULT_OFFSET,
        (offset ?? DEFAULT_OFFSET) + (limit ?? DEFAULT_LIMIT),
      );

      return {
        rows: paginatedRoots,
        total: rootCategories.length,
      };
    }

    // When includeChildren is false, return flat list as before
    const filters = [eq(categories.isActive, isActive ?? true)];

    if (search) {
      filters.push(ilike(categories.name, `%${search}%`));
    }

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

    query.limit(limit ?? DEFAULT_LIMIT).offset(offset ?? DEFAULT_OFFSET);

    const response = await query;

    return {
      rows: response,
      total: response.length,
    };
  } catch (_error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch categories",
    });
  }
});

export default getCategoriesController;
