# Environment Configuration

This guide covers setting up environment variables and configuration for Project Chowky.

## Environment Files

The project uses environment files to manage configuration:

- `apps/server/.env` - Server-side environment variables
- `apps/web/.env` - Client-side environment variables (if needed)

## Server Environment (`apps/server/.env`)

### Required Variables

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/project-chowky"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Server Configuration
PORT=3000
NODE_ENV="development"
```

### Optional Variables

```env
# Email Configuration (for auth features)
EMAIL_FROM="noreply@yourapp.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# External Services
REDIS_URL="redis://localhost:6379"
```

## Environment Variable Descriptions

### Database
- `DATABASE_URL` - PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database`
  - Use Docker values for local development

### Authentication
- `BETTER_AUTH_SECRET` - Secret key for JWT signing and encryption
  - Generate with: `openssl rand -base64 32`
  - Keep this secure and unique per environment
- `BETTER_AUTH_URL` - Base URL for authentication callbacks
  - Development: `http://localhost:3000`
  - Production: Your actual domain

### Server
- `PORT` - Port number for the server (default: 3000)
- `NODE_ENV` - Environment mode (`development`, `production`, `test`)

## Setup Instructions

### 1. Copy Environment Template

```bash
cd apps/server
cp .env.example .env
```

### 2. Generate Secrets

```bash
# Generate a secure secret for Better Auth
openssl rand -base64 32
```

### 3. Configure Database

For Docker setup (recommended):
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/project-chowky"
```

For local PostgreSQL:
```env
DATABASE_URL="postgresql://your-username:your-password@localhost:5432/your-database"
```

### 4. Set Authentication URL

Development:
```env
BETTER_AUTH_URL="http://localhost:3000"
```

Production:
```env
BETTER_AUTH_URL="https://your-domain.com"
```

## Environment-Specific Configuration

### Development

```env
NODE_ENV="development"
DATABASE_URL="postgresql://postgres:password@localhost:5432/project-chowky"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="dev-secret-key-here"
```

### Production

```env
NODE_ENV="production"
DATABASE_URL="your-production-database-url"
BETTER_AUTH_URL="https://your-domain.com"
BETTER_AUTH_SECRET="secure-production-secret"
```

### Testing

```env
NODE_ENV="test"
DATABASE_URL="postgresql://postgres:password@localhost:5432/project-chowky-test"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="test-secret-key"
```

## Security Best Practices

### Secret Management
- Never commit `.env` files to version control
- Use different secrets for each environment
- Rotate secrets regularly
- Use a secret management service in production

### Database Security
- Use strong, unique passwords
- Limit database user permissions
- Use SSL connections in production
- Regularly backup your database

### Authentication
- Use HTTPS in production
- Set secure, HTTP-only cookies
- Implement proper CORS policies
- Monitor authentication attempts

## Troubleshooting

### Common Issues

**Database Connection Errors**
- Verify `DATABASE_URL` format
- Check if PostgreSQL is running
- Ensure firewall allows connections

**Authentication Errors**
- Verify `BETTER_AUTH_SECRET` is set
- Check `BETTER_AUTH_URL` matches your domain
- Ensure all required auth variables are present

**Port Conflicts**
- Change `PORT` if 3000 is in use
- Update frontend API URLs accordingly
- Check for other services on the same port

### Validation

Test your environment setup:

```bash
# Test database connection
bun db:push

# Test server startup
bun dev:server

# Check environment variables
echo $DATABASE_URL
```

## Docker Environment

When using Docker Compose, you can also set environment variables in `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/project-chowky
      - NODE_ENV=development
```

Or use an environment file:

```yaml
services:
  app:
    env_file:
      - .env
```