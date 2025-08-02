# project-chowky

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Router, Hono, TRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Email & password authentication with Better Auth
- **Biome** - Linting and formatting
- **PWA** - Progressive Web App support
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```
## Database Setup

This project uses PostgreSQL with Drizzle ORM. You can set up the database using Docker for easy development.

### Option 1: Using Docker (Recommended)

The project includes a Docker Compose configuration for PostgreSQL in `apps/server/docker-compose.yml`.

#### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed

#### Quick Start

1. **Start the PostgreSQL database:**
   ```bash
   cd apps/server
   docker compose up -d
   ```
   This will:
   - Pull the PostgreSQL image if not already present
   - Create and start a PostgreSQL container named `project-chowky-postgres`
   - Expose the database on port `5432`
   - Create a persistent volume for data storage

2. **Configure environment variables:**
   Update your `apps/server/.env` file with the Docker database connection details:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/project-chowky"
   ```

3. **Apply the schema to your database:**
   ```bash
   # From the project root
   bun db:push
   ```

4. **Verify the connection:**
   ```bash
   bun db:studio
   ```
   This opens Drizzle Studio to view and manage your database.

#### Docker Management Commands

```bash
# Start the database (from apps/server directory)
docker compose up -d

# Stop the database
docker compose down

# View database logs
docker compose logs postgres

# Stop and remove all data (destructive!)
docker compose down -v

# Restart the database
docker compose restart postgres

# Check database status
docker compose ps
```

#### Database Configuration

The Docker setup uses these default values:
- **Database**: `project-chowky`
- **Username**: `postgres`
- **Password**: `password`
- **Host**: `localhost`
- **Port**: `5432`

#### Data Persistence

Your database data is stored in a Docker volume named `project-chowky_postgres_data`. This means your data will persist even when you stop and restart the containers.

To reset the database completely:
```bash
cd apps/server
docker compose down -v  # This deletes all data!
docker compose up -d
bun db:push  # Reapply schema
```

### Option 2: Local PostgreSQL Installation

If you prefer not to use Docker:

1. Install PostgreSQL on your system
2. Create a database named `project-chowky`
3. Update your `apps/server/.env` file with your PostgreSQL connection details
4. Apply the schema: `bun db:push`

### Troubleshooting

#### Connection Issues
- Ensure Docker is running: `docker --version`
- Check if the container is running: `docker compose ps`
- View logs for errors: `docker compose logs postgres`

#### Port Conflicts
If port 5432 is already in use, you can change it in `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Use port 5433 instead
```
Then update your `DATABASE_URL` accordingly.

#### Resetting the Database
To start fresh with a clean database:
```bash
cd apps/server
docker compose down -v
docker compose up -d
bun db:push
```


Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

```
project-chowky/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   └── server/      # Backend API (Hono, TRPC)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI
- `bun check`: Run Biome formatting and linting
- `cd apps/web && bun generate-pwa-assets`: Generate PWA assets

## Development Guide

### Creating a New Page (Frontend)

The frontend uses **TanStack Router** with file-based routing. Each route file corresponds to a URL path.

#### 1. Create a New Route File

Create a new file in `apps/web/src/routes/` with the desired path name:

```typescript
// apps/web/src/routes/products.tsx
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/products")({
  component: ProductsComponent,
});

function ProductsComponent() {
  // Example: Fetch data using tRPC
  const products = useQuery(trpc.product.getAll.queryOptions());

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      {products.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {products.data?.map((product) => (
            <div key={product.id} className="border rounded p-4">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

#### 2. Nested Routes

For nested routes, create folders:

```
apps/web/src/routes/
├── products/
│   ├── index.tsx        # /products
│   ├── $id.tsx         # /products/123 (dynamic route)
│   └── create.tsx      # /products/create
```

Example dynamic route (`$id.tsx`):

```typescript
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetailComponent,
});

function ProductDetailComponent() {
  const { id } = Route.useParams();
  const product = useQuery(
    trpc.product.getById.queryOptions({ id: Number(id) })
  );

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      {product.data ? (
        <div>
          <h1>{product.data.name}</h1>
          <p>{product.data.description}</p>
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
}
```

#### 3. Using Components and Styling

- Import UI components from `@/components/ui/`
- Use TailwindCSS for styling
- Follow the existing patterns for responsive design

### Creating a New API (Backend)

The backend uses **tRPC** for type-safe APIs with **Drizzle ORM** for database operations.

#### 1. Create Database Schema

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

#### 2. Create tRPC Router

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

#### 3. Register Router

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

#### 4. Update Database Schema

After creating your schema, push the changes to your database:

```bash
bun db:push
```

### Best Practices

#### Frontend
- Use TypeScript for all components
- Implement proper loading and error states
- Use React Query for data fetching with tRPC
- Follow existing UI patterns with shadcn/ui components
- Use responsive design with TailwindCSS
- Add proper form validation

#### Backend
- Use Zod for input validation
- Implement proper error handling
- Use `protectedProcedure` for authenticated endpoints
- Use `publicProcedure` for public endpoints
- Follow REST-like naming conventions (getAll, getById, create, update, delete)
- Add proper TypeScript types
- Use database transactions for complex operations

#### Database
- Use meaningful column names
- Add proper constraints (notNull, unique, etc.)
- Include timestamps (createdAt, updatedAt) for auditing
- Use appropriate data types for each field
- Consider indexing for frequently queried columns
