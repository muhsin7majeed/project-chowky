# Backend Development Guide

The backend uses **tRPC** for type-safe APIs with **Drizzle ORM** for database operations.

## Creating a New API

### 1. Create Database Schema

First, create the database schema in `apps/server/src/db/schema/`:

```typescript
// apps/server/src/db/schema/product.ts
import { pgTable, text, serial, decimal, timestamp } from "drizzle-orm/pg-core";

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

### 2. Create tRPC Router

Create a new router file in `apps/server/src/routers/`:

```typescript
// apps/server/src/routers/product.ts
import z from "zod";
import { router, publicProcedure, protectedProcedure } from "../lib/trpc";
import { product } from "../db/schema/product";
import { eq } from "drizzle-orm";
import { db } from "../db";

export const productRouter = router({
  // Get all products (public)
  getAll: publicProcedure.query(async () => {
    return await db.select().from(product);
  }),

  // Get product by ID (public)
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(product)
        .where(eq(product.id, input.id))
        .limit(1);
      
      return result[0] || null;
    }),

  // Create product (protected - requires authentication)
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      price: z.string().regex(/^\d+\.?\d{0,2}$/), // Price validation
    }))
    .mutation(async ({ input }) => {
      return await db.insert(product).values({
        name: input.name,
        description: input.description,
        price: input.price,
      });
    }),

  // Update product (protected)
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      description: z.string().optional(),
      price: z.string().regex(/^\d+\.?\d{0,2}$/).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      return await db
        .update(product)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(product.id, id));
    }),

  // Delete product (protected)
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.delete(product).where(eq(product.id, input.id));
    }),
});
```

### 3. Register Router

Add your new router to the main app router in `apps/server/src/routers/index.ts`:

```typescript
import { productRouter } from "./product";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  todo: todoRouter,
  product: productRouter, // Add your new router here
});
```

### 4. Update Database Schema

After creating your schema, push the changes to your database:

```bash
bun db:push
```

## Best Practices

### Backend Development
- Use Zod for input validation
- Implement proper error handling
- Use `protectedProcedure` for authenticated endpoints
- Use `publicProcedure` for public endpoints
- Follow REST-like naming conventions (getAll, getById, create, update, delete)
- Add proper TypeScript types
- Use database transactions for complex operations

### Database Best Practices
- Use meaningful column names
- Add proper constraints (notNull, unique, etc.)
- Include timestamps (createdAt, updatedAt) for auditing
- Use appropriate data types for each field
- Consider indexing for frequently queried columns

### Error Handling
- Use appropriate HTTP status codes
- Provide meaningful error messages
- Log errors for debugging
- Handle edge cases gracefully

### Security
- Always validate input data
- Use authentication for sensitive operations
- Implement proper authorization checks
- Sanitize data before database operations