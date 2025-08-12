import { and, asc, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from "@/constants/common";
import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { products } from "@/db/schema/product";
import { protectedProcedure } from "@/lib/trpc";
import { getProductsInputZodSchema } from "@/lib/zod-schema/products";

const orderColumns = {
  name: products.name,
  price: products.price,
  stock: products.stock,
  createdAt: products.createdAt,
  updatedAt: products.updatedAt,
  sku: products.sku,
  status: products.status,
} as const;

const getProductsController = protectedProcedure.input(getProductsInputZodSchema).query(async ({ input }) => {
  const { status, limit, offset, search, categoryId, orderBy } = input ?? {};

  const filters: SQL[] = [];

  if (status) {
    filters.push(eq(products.status, status));
  }

  if (search) {
    const searchTerm = `%${search}%`;
    const searchTermForSku = `%${search}%`;

    const searchFilters = or(ilike(products.name, searchTerm), ilike(products.sku, searchTermForSku));

    if (searchFilters) {
      filters.push(searchFilters);
    }
  }

  if (categoryId) {
    filters.push(eq(products.categoryId, categoryId));
  }

  let orderClause: SQL | undefined;

  if (orderBy) {
    const column = orderColumns[orderBy.column];
    orderClause = orderBy.direction === "asc" ? asc(column) : desc(column);
  }

  const query = db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      stock: products.stock,
      cost: products.cost,
      slug: products.slug,
      sku: products.sku,
      description: products.description,
      imagePaths: products.imagePaths,
      status: products.status,
      isNew: products.isNew,
      isBestSeller: products.isBestSeller,
      isFeatured: products.isFeatured,
      width: products.width,
      height: products.height,
      weight: products.weight,
      length: products.length,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      category: {
        label: categories.name,
        value: categories.id,
        isActive: categories.isActive,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(...filters));

  if (orderClause) {
    query.orderBy(orderClause);
  }

  query.limit(limit ?? DEFAULT_PAGINATION_LIMIT).offset(offset ?? DEFAULT_PAGINATION_OFFSET);

  const response = await query;

  return {
    rows: response,
    total: response.length,
  };
});

export default getProductsController;
