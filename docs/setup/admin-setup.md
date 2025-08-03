# Admin User Setup

This guide explains how to create admin users for accessing the admin panel in Project Chowky.

## Quick Start

### Step 1: Start the Application

```bash
# Start the development servers
bun dev
```

### Step 2: Create a User Account

1. Visit [http://localhost:3001/auth/login](http://localhost:3001/auth/login)
2. Click "Create account" and sign up with your email and password
3. Complete the registration process

### Step 3: Promote User to Admin

After you have a user account, promote it to admin:

```bash
# Promote your user to admin
bun create-admin --email=your-email@example.com --name="Your Name"
```

### Alternative: Environment Variables

Set environment variables for easier admin creation:

```bash
# Set environment variables
export ADMIN_EMAIL="admin@yoursite.com"
export ADMIN_NAME="Site Administrator"

# Then run:
bun create-admin
```

## Production Setup

For production environments, it's recommended to:

1. **Use strong credentials**:
   ```bash
   bun create-admin \
     --email=admin@yourcompany.com \
     --password=your-very-secure-password \
     --name="Production Admin"
   ```

2. **Set environment variables** in your deployment:
   ```env
   ADMIN_EMAIL=admin@yourcompany.com
   ADMIN_PASSWORD=your-very-secure-password
   ADMIN_NAME=Production Admin
   ```

3. **Change password after first login** via the admin interface

## Managing Additional Admins

### Promote Existing User to Admin

If you want to make an existing user an admin:

```sql
-- Connect to your database and run:
UPDATE "user" 
SET "role" = 'admin' 
WHERE "email" = 'user@example.com';
```

### Using Database Studio

1. Open database studio: `bun db:studio`
2. Navigate to the `user` table
3. Find the user and change their `role` from `"user"` to `"admin"`

### Via Admin Panel (Future Feature)

Once you have at least one admin user, you can manage other users through the admin interface at `/admin/users` (when implemented).

## Verification

After creating an admin user:

1. **Start the application**: `bun dev`
2. **Visit the login page**: [http://localhost:3001/auth/login](http://localhost:3001/auth/login)
3. **Login with admin credentials**
4. **Verify admin access**: You should see the admin link in the header and be able to access [http://localhost:3001/admin](http://localhost:3001/admin)

## Troubleshooting

### "Admin user already exists"

If you see this message when running `bun db:seed`, it means there's already a user with admin role. You can:

- Use `bun create-admin` to create a different admin user
- Check existing admins in database studio
- Update an existing user's role manually

### Cannot access admin panel

1. **Verify user role**:
   ```sql
   SELECT id, name, email, role FROM "user" WHERE email = 'your-admin@email.com';
   ```

2. **Check the role is exactly** `"admin"` (not `"Admin"` or other variations)

3. **Clear browser cache/cookies** and login again

### Script errors

- Ensure the database is running: `cd apps/server && docker compose ps`
- Verify database connection: `bun db:studio`
- Check environment variables are set correctly

## Security Notes

- **Never commit admin credentials** to version control
- **Use strong passwords** for production admin accounts
- **Enable email verification** in production environments
- **Consider implementing** 2FA for admin accounts
- **Rotate admin passwords** regularly
- **Audit admin actions** through logging (future feature)

## Integration with CI/CD

For automated deployments, you can create admin users as part of your deployment pipeline:

```yaml
# Example GitHub Actions step
- name: Create admin user
  run: |
    ADMIN_EMAIL=${{ secrets.ADMIN_EMAIL }} \
    ADMIN_PASSWORD=${{ secrets.ADMIN_PASSWORD }} \
    ADMIN_NAME="Production Admin" \
    bun create-admin
```

Store sensitive credentials as secrets in your CI/CD platform.