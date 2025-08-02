# Frontend Development Guide

The frontend uses **TanStack Router** with file-based routing. Each route file corresponds to a URL path.

## Creating a New Page

### 1. Create a New Route File

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

### 2. Nested Routes

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

### 3. Using Components and Styling

- Import UI components from `@/components/ui/`
- Use TailwindCSS for styling
- Follow the existing patterns for responsive design

## Best Practices

### Frontend Development
- Use TypeScript for all components
- Implement proper loading and error states
- Use React Query for data fetching with tRPC
- Follow existing UI patterns with shadcn/ui components
- Use responsive design with TailwindCSS
- Add proper form validation

### Component Structure
- Keep components focused on a single responsibility
- Use proper TypeScript types
- Implement error boundaries where needed
- Follow the project's naming conventions
- Use React hooks appropriately

### Styling Guidelines
- Use TailwindCSS utility classes
- Follow the existing design system
- Ensure responsive design on all screen sizes
- Use the theme system for dark/light mode support