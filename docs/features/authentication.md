# Authentication

Project Chowky uses **Better Auth** for secure user authentication with email and password.

## Features

- **Email & Password Authentication** - Standard login/signup flow
- **Secure Session Management** - JWT-based sessions with HTTP-only cookies
- **Protected Routes** - Client and server-side route protection
- **Type-safe Auth Context** - Full TypeScript support for auth state

## Quick Start

### Sign Up / Sign In

The application provides built-in authentication pages:
- Login: `/login`
- Dashboard: `/dashboard` (protected)

### Using Authentication in Components

```typescript
import { useAuth } from "@/hooks/use-auth";

function ProfileComponent() {
  const { user, isAuthenticated, signOut } = useAuth();

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <button onClick={signOut}>Sign Out</button>
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
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
});
```

## Authentication Flow

### Registration

1. User submits email and password
2. Server validates input and creates user
3. Session is created and returned
4. Client redirects to dashboard

### Login

1. User submits credentials
2. Server verifies email and password
3. Session is created if valid
4. Client updates auth state

### Session Management

- Sessions are stored as HTTP-only cookies
- Automatic refresh on client-side navigation
- Secure logout clears server sessions

## Protected Routes

### Frontend Route Protection

```typescript
// In route file
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardComponent,
});
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

## User Management

### Getting Current User

```typescript
// Frontend
const { user } = useAuth();

// Backend (in protected procedure)
const userId = ctx.session.user.id;
```

### User Object Structure

```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
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

### useAuth Hook

```typescript
const {
  user,              // Current user object
  isAuthenticated,   // Boolean auth status
  isLoading,         // Loading state
  signIn,           // Sign in function
  signUp,           // Sign up function
  signOut,          // Sign out function
} = useAuth();
```

### Auth Context

The auth context provides global authentication state:

```typescript
import { AuthProvider } from "@/providers/auth-provider";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
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
- Check `BETTER_AUTH_SECRET` is set
- Verify cookie settings
- Ensure HTTPS in production

**Login Failures**
- Verify database connection
- Check user exists and password is correct
- Review server logs for errors

**Protected Routes Not Working**
- Ensure auth context is properly set up
- Check route protection logic
- Verify session is valid

### Debugging

```typescript
// Add debug logging
console.log("Auth state:", { user, isAuthenticated });
console.log("Session:", ctx.session);
```

## Migration Guide

If migrating from another auth system:

1. Export existing user data
2. Update database schema for Better Auth
3. Migrate user records
4. Update auth logic in components
5. Test authentication flow thoroughly