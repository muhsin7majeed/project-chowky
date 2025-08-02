# Authentication & Authorization

Project Chowky uses **Better Auth** with admin plugin for secure user authentication and role-based authorization.

## Features

- **Email & Password Authentication** - Standard login/signup flow
- **Role-Based Authorization** - Admin and user role support
- **Secure Session Management** - JWT-based sessions with HTTP-only cookies
- **Protected Routes** - Client and server-side route protection with role guards
- **Type-safe Auth Context** - Full TypeScript support for auth state
- **Smart Redirects** - Automatic redirection based on authentication status and user role

## Quick Start

### Authentication Pages

The application provides built-in authentication pages:
- **Login/Signup**: `/auth/login` - Unified auth page with toggle between sign in and sign up
- **App Routes**: `/app/*` - Protected routes for authenticated users
- **Admin Routes**: `/admin/*` - Protected routes for admin users only

### Route Structure & Access Control

```
📁 /auth/login          # Public - redirects if already authenticated
📁 /app/*               # Protected - requires authentication
  └── /app/products     # Default app destination
📁 /admin/*             # Protected - requires admin role
  └── /admin/dashboard  # Default admin destination
```

### Using Authentication in Components

```typescript
import { authClient } from "@/lib/auth-client";

function ProfileComponent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <div>Please sign in</div>;
  }

  const isAdmin = session.user.role === "admin";

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      {isAdmin && <p>👑 Admin User</p>}
      <button onClick={() => authClient.signOut()}>
        Sign Out
      </button>
    </div>
  );
}
```

## Configuration

### Environment Variables

Required environment variables in `apps/server/.env`:

```env
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
DATABASE_URL="postgresql://..."
```

### Better Auth Setup

The auth configuration is in `apps/server/src/lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { db } from "../db";
import * as schema from "../db/schema/auth";

export const auth = betterAuth({
  plugins: [admin()], // Enables admin role functionality
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
```

### Frontend Auth Client

The frontend auth client is configured in `apps/web/src/lib/auth-client.ts`:

```typescript
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [adminClient()], // Enables admin features on client
  baseURL: import.meta.env.VITE_SERVER_URL,
});
```

## Authentication Flow

### Registration

1. User visits `/auth/login` and toggles to sign up
2. User submits email, name, and password
3. Server validates input and creates user with default role "user"
4. Session is created and returned
5. Client redirects to `/app` (or `/admin` if admin role)

### Login

1. User visits `/auth/login` 
2. User submits credentials
3. Server verifies email and password
4. Session is created if valid
5. Client redirects based on role:
   - Admin users → `/admin/dashboard`
   - Regular users → `/app/products`

### Smart Redirect System

The application automatically redirects users based on their authentication status and role:

- **Unauthenticated users** accessing protected routes → `/auth/login`
- **Authenticated users** accessing auth pages → their appropriate dashboard
- **Regular users** accessing admin routes → `/app`
- **Direct route access**: `/app` → `/app/products`, `/admin` → `/admin/dashboard`

### Session Management

- Sessions are stored as HTTP-only cookies
- Automatic refresh on client-side navigation
- Secure logout clears server sessions and redirects to home page

## Protected Routes & Authorization

### Route Guard Implementation

**Authentication Guard (`/app/route.tsx`)**:
```typescript
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  beforeLoad: ({ context }) => {
    if (context.auth.isPending) return; // Still loading
    
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/auth/login" });
    }
  },
  component: () => <Outlet />,
});
```

**Admin Authorization Guard (`/admin/route.tsx`)**:
```typescript
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }) => {
    if (context.auth.isPending) return; // Still loading
    
    // First check authentication
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/auth/login" });
    }
    
    // Then check admin role
    if (!context.auth.isAdmin) {
      throw redirect({ to: "/app" });
    }
  },
  component: () => <Outlet />,
});
```

**Anti-Auth Guard (`/auth/route.tsx`)**:
```typescript
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: ({ context }) => {
    if (context.auth.isPending) return; // Still loading
    
    // Redirect authenticated users away from auth pages
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: context.auth.isAdmin ? "/admin" : "/app",
      });
    }
  },
  component: () => <Outlet />,
});
```

### Router Context Integration

Auth state is integrated into TanStack Router context for use in route guards:

```typescript
// apps/web/src/main.tsx
function RouterApp() {
  const { data: session, isPending } = authClient.useSession();
  
  const router = createRouter({
    routeTree,
    context: {
      trpc,
      queryClient,
      auth: {
        isAuthenticated: !!session?.user,
        user: session?.user || null,
        isAdmin: session?.user?.role === "admin",
        isPending,
      },
    },
    // ... other config
  });

  return <RouterProvider router={router} />;
}
```

### Backend API Protection

```typescript
// Using tRPC protected procedure
import { protectedProcedure } from "@/lib/trpc";

export const userRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    // ctx.session.user contains authenticated user
    return {
      id: ctx.session.user.id,
      email: ctx.session.user.email,
    };
  }),
});
```

## User Management & Roles

### Getting Current User

```typescript
// Frontend - Using Better Auth React client
import { authClient } from "@/lib/auth-client";

function MyComponent() {
  const { data: session, isPending } = authClient.useSession();
  
  if (session?.user) {
    const user = session.user;
    const isAdmin = user.role === "admin";
    // Use user data...
  }
}

// Backend (in tRPC protected procedure)
const userId = ctx.session.user.id;
const userRole = ctx.session.user.role;
```

### User Object Structure

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: string | null; // "admin" | "user" | null
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Role-Based Access Control

**User Roles:**
- **`"user"`** (default) - Standard authenticated users
- **`"admin"`** - Administrative users with elevated permissions

**Checking User Role:**
```typescript
// Frontend component
import { authClient } from "@/lib/auth-client";

function AdminPanel() {
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";
  
  if (!isAdmin) {
    return <div>Access denied. Admin role required.</div>;
  }
  
  return <div>Admin dashboard content...</div>;
}

// Backend tRPC procedure
export const adminOnlyProcedure = protectedProcedure
  .use(({ ctx, next }) => {
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Admin role required",
      });
    }
    return next({ ctx });
  });
```

### Conditional Navigation

The header navigation automatically shows/hides admin links based on user role:

```typescript
// apps/web/src/components/header.tsx
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  const links = [
    { to: "/", label: "Home" },
    { to: "/app", label: "App" },
    { to: "/app/products", label: "Products" },
    // Only show admin link for admin users
    ...(isAdmin ? [{ to: "/admin/dashboard", label: "Admin" }] : []),
  ];

  // ... render navigation
}
```

## Custom Auth Logic

### Email Verification

```typescript
// Enable in auth config
export const auth = betterAuth({
  // ... other config
  emailVerification: {
    enabled: true,
    sendOnSignUp: true,
  },
});
```

### Password Reset

```typescript
// Add to auth config
export const auth = betterAuth({
  // ... other config
  resetPassword: {
    enabled: true,
  },
});
```

## Hooks and Utilities

### Better Auth React Hooks

```typescript
import { authClient } from "@/lib/auth-client";

// Get current session and user data
const { data: session, isPending } = authClient.useSession();

// Access user data
if (session?.user) {
  const user = session.user;        // User object
  const isAdmin = user.role === "admin";
  const email = user.email;
  const name = user.name;
}

// Authentication actions
await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
});

await authClient.signUp.email({
  email: "user@example.com", 
  password: "password123",
  name: "John Doe",
});

await authClient.signOut();
```

### Router Context Access

In route components, access auth state through router context:

```typescript
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my-route")({
  beforeLoad: ({ context }) => {
    // Access auth state in route guards
    const { isAuthenticated, isAdmin, user, isPending } = context.auth;
    
    if (!isAuthenticated) {
      throw redirect({ to: "/auth/login" });
    }
  },
  component: MyComponent,
});
```

### Utility Functions

```typescript
// Check if user has admin role
function isUserAdmin(user: User | null): boolean {
  return user?.role === "admin";
}

// Get redirect path based on user role
function getRedirectPath(isAdmin: boolean): string {
  return isAdmin ? "/admin" : "/app";
}

// Format user display name
function getUserDisplayName(user: User): string {
  return user.name || user.email;
}
```

## Security Features

### Session Security

- HTTP-only cookies prevent XSS attacks
- Secure flag ensures HTTPS-only transmission
- SameSite attribute prevents CSRF attacks
- Automatic session rotation

### Password Security

- Passwords are hashed using bcrypt
- Minimum password requirements enforced
- Rate limiting on authentication attempts
- Account lockout after failed attempts

### Database Security

- User data is properly sanitized
- SQL injection protection via Drizzle ORM
- Sensitive data is properly encrypted
- Regular security audits

## Best Practices

### Frontend

- Check authentication status before rendering protected content
- Handle loading states during auth operations
- Implement proper error handling for auth failures
- Use protected routes for sensitive pages

### Backend

- Always validate user permissions
- Use protected procedures for authenticated endpoints
- Implement proper error handling
- Log security events for monitoring

### General

- Use HTTPS in production
- Regularly rotate secrets
- Monitor authentication logs
- Implement proper CORS policies
- Keep dependencies updated

## Troubleshooting

### Common Issues

**Session Not Persisting**
- Check `BETTER_AUTH_SECRET` is set in server environment
- Verify `BETTER_AUTH_URL` matches your server URL
- Ensure cookie settings are correct
- Check HTTPS in production

**Login Failures**
- Verify database connection and schema
- Check user exists and password is correct
- Review server logs for Better Auth errors
- Ensure admin plugin is properly configured

**Protected Routes Not Working**
- Check router context setup in `main.tsx`
- Verify route guard logic in `beforeLoad`
- Ensure auth state is properly integrated
- Check for TypeScript errors in context types

**Admin Access Issues**
- Verify user has `role: "admin"` in database
- Check admin plugin is enabled on both client and server
- Ensure admin route guards are properly configured
- Verify conditional navigation logic

**Redirect Loops**
- Check that auth guards handle `isPending` state
- Ensure redirect logic doesn't create circular redirects
- Verify route structure and guard placement

### Debugging

```typescript
// Debug auth state in components
import { authClient } from "@/lib/auth-client";

function DebugAuth() {
  const { data: session, isPending } = authClient.useSession();
  
  console.log("Auth Debug:", {
    isPending,
    isAuthenticated: !!session?.user,
    user: session?.user,
    role: session?.user?.role,
    isAdmin: session?.user?.role === "admin",
  });
  
  return <div>Check console for auth state</div>;
}

// Debug route context
export const Route = createFileRoute("/debug")({
  beforeLoad: ({ context }) => {
    console.log("Route context auth:", context.auth);
  },
  component: DebugAuth,
});

// Backend debugging
protectedProcedure.query(({ ctx }) => {
  console.log("Session user:", ctx.session.user);
  return { user: ctx.session.user };
});
```

## Database Schema

The user table includes role management:

```sql
-- User table with role support
CREATE TABLE "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "email_verified" boolean NOT NULL DEFAULT false,
  "image" text,
  "role" text NOT NULL DEFAULT 'user', -- 'user' | 'admin'
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

-- Update user to admin
UPDATE "user" SET "role" = 'admin' WHERE "email" = 'admin@example.com';
```

## Testing

### Testing Authentication Flow

1. **Test unauthenticated access:**
   - Visit `/app` → should redirect to `/auth/login`
   - Visit `/admin` → should redirect to `/auth/login`

2. **Test regular user:**
   - Login with role `"user"`
   - Should access `/app/*` routes
   - Should redirect from `/admin/*` to `/app`
   - Should not see admin link in header

3. **Test admin user:**
   - Login with role `"admin"`
   - Should access both `/app/*` and `/admin/*` routes
   - Should see admin link in header
   - Should redirect from `/auth/login` to `/admin`

4. **Test authenticated redirects:**
   - While logged in, visit `/auth/login`
   - Should redirect to appropriate dashboard

### Manual Role Assignment

To create an admin user for testing:

```typescript
// In your database or admin interface
UPDATE "user" 
SET "role" = 'admin' 
WHERE "email" = 'your-admin@example.com';
```

## Migration Guide

If migrating from another auth system:

1. **Export existing user data**
2. **Update database schema** to include role column
3. **Install Better Auth with admin plugin**
4. **Update frontend to use authClient**
5. **Implement route guards** using TanStack Router
6. **Migrate user records** with appropriate roles
7. **Test authentication flow** thoroughly
8. **Update any custom auth logic**