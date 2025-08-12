# Project Chowky

A modern TypeScript monorepo built with the **Better-T-Stack**, featuring React, TanStack Router, Hono, tRPC, Drizzle ORM, and Google Cloud Storage integration.

## ✨ Features

- **🔷 TypeScript** - Full type safety across frontend and backend
- **⚡ TanStack Router** - File-based routing with type safety
- **🎨 TailwindCSS + shadcn/ui** - Modern UI with reusable components
- **🌐 Hono + tRPC** - Type-safe, performant APIs
- **🗄️ Drizzle ORM + PostgreSQL** - Type-safe database operations
- **🔐 Authentication** - Email & password auth with Better Auth
- **☁️ Google Cloud Storage** - File upload and storage integration
- **🌍 Internationalization** - Multi-language support (English/German)
- **🌙 Theme Support** - Dark/light mode with system detection
- **📱 PWA Ready** - Progressive Web App capabilities
- **⚡ Bun + Turborepo** - Fast runtime and optimized monorepo builds
- **🧹 Biome + Git Hooks** - Automatic code formatting and linting

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) runtime (v1.2.19 or later)
- [Docker](https://docs.docker.com/get-docker/) (for database)
- [Google Cloud Platform Account](https://cloud.google.com/) (for file storage)
- [PostgreSQL](https://www.postgresql.org/) (via Docker or local installation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-chowky
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Setup database**
   ```bash
   cd apps/server
   docker compose up -d
   cd ../..
   bun db:push
   ```

4. **Configure environment variables** (see [Environment Setup](#environment-setup))

5. **Start development servers**
   ```bash
   bun dev
   ```

### Access the Application

- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **Database Studio**: `bun db:studio`

## 🔧 Environment Setup

### Frontend Environment Variables

Create `apps/web/.env`:

```env
# Backend URL - Update port if server runs on different port
VITE_SERVER_URL=http://localhost:3000

# Google Cloud Storage - Must match server bucket name
VITE_GCS_BUCKET_NAME=your-bucket-name
```

### Backend Environment Variables

Create `apps/server/.env`:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/project-chowky

# CORS Configuration - Frontend URL
CORS_ORIGIN=http://localhost:3001

# Authentication Configuration
BETTER_AUTH_SECRET=your-secure-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Admin User Configuration
ADMIN_EMAIL=admin@yourapp.com
ADMIN_NAME=Admin User

# Google Cloud Storage
GCP_BUCKET_NAME=your-bucket-name
```

#### Generating Secure Secrets

```bash
# Generate a secure secret for BETTER_AUTH_SECRET
openssl rand -base64 32
```

### Google Cloud Storage Setup

1. **Create a GCP Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Create a Storage Bucket**
   ```bash
   # Using gcloud CLI
   gsutil mb gs://your-bucket-name
   
   # Or create via Google Cloud Console
   # Storage > Browser > Create Bucket
   ```

3. **Create Service Account**
   - Go to IAM & Admin > Service Accounts
   - Create new service account
   - Assign roles: `Storage Object Admin` and `Storage Legacy Bucket Reader`
   - Generate and download JSON key

4. **Configure Service Account**
   
   Save the downloaded JSON key as `apps/server/gcs-key.json`:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "your-private-key-id",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
     "client_id": "your-client-id",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com",
     "universe_domain": "googleapis.com"
   }
   ```

5. **Update Environment Variables**
   
   Update both `apps/web/.env` and `apps/server/.env` with your bucket name:
   ```env
   # In apps/web/.env
   VITE_GCS_BUCKET_NAME=your-bucket-name
   
   # In apps/server/.env
   GCP_BUCKET_NAME=your-bucket-name
   ```

## 🔄 Switching to a Different GCP Account

When changing GCP accounts or bucket names, update these files:

### 1. Environment Variables
- `apps/web/.env` - Update `VITE_GCS_BUCKET_NAME`
- `apps/server/.env` - Update `GCP_BUCKET_NAME`

### 2. Service Account Key
- Replace `apps/server/gcs-key.json` with new service account key

### 3. Bucket Permissions
Ensure the new service account has these roles:
- `Storage Object Admin` - For file upload/delete operations
- `Storage Legacy Bucket Reader` - For bucket access

### 4. Restart Services
```bash
# Restart development servers to pick up new environment variables
bun dev
```

## 🗄️ Database Setup

### Using Docker (Recommended)

The project includes PostgreSQL setup via Docker Compose:

```bash
# Start PostgreSQL database
cd apps/server
docker compose up -d

# Apply database schema
cd ../..
bun db:push

# Open database studio (optional)
bun db:studio
```

### Database Management Commands

```bash
# Start database
bun db:start           # or: cd apps/server && docker compose up -d

# Stop database
bun db:stop            # or: cd apps/server && docker compose down

# Reset database (destructive!)
bun db:down            # or: cd apps/server && docker compose down -v
bun db:start
bun db:push

# Apply schema changes
bun db:push

# Generate migrations
bun db:generate

# View database
bun db:studio
```

### Local PostgreSQL Setup

If you prefer local PostgreSQL:

1. Install PostgreSQL on your system
2. Create database: `createdb project-chowky`
3. Update `DATABASE_URL` in `apps/server/.env`
4. Apply schema: `bun db:push`

## 👑 Admin User Setup

After starting the application, create an admin user:

```bash
# Interactive admin creation
bun create-admin

# Or manually:
# 1. Sign up normally at http://localhost:3001/auth/login
# 2. Run: bun create-admin --email=your-email@example.com --name="Your Name"
```

## 📂 Project Structure

```
project-chowky/
├── apps/
│   ├── web/                     # React frontend
│   │   ├── src/routes/          # File-based routing
│   │   ├── src/components/      # UI components
│   │   ├── src/lib/             # Utilities & config
│   │   └── .env                 # Frontend environment variables
│   └── server/                  # Hono backend
│       ├── src/routers/         # tRPC routers
│       ├── src/db/              # Database schema & config
│       ├── src/lib/             # Server utilities
│       ├── gcs-key.json         # Google Cloud service account key
│       ├── docker-compose.yml   # PostgreSQL setup
│       └── .env                 # Backend environment variables
├── biome.json                   # Code formatting config
├── turbo.json                   # Monorepo build config
└── package.json                 # Root package.json
```

## 🛠️ Available Scripts

```bash
# Development
bun dev              # Start all apps
bun dev:web          # Frontend only  
bun dev:server       # Backend only

# Database
bun db:push          # Apply schema changes
bun db:studio        # Open database studio
bun db:start         # Start PostgreSQL (Docker)
bun db:stop          # Stop PostgreSQL
bun db:down          # Stop and remove PostgreSQL data
bun db:seed          # Seed database

# Admin Management
bun create-admin     # Create/update admin user interactively

# Build & Quality
bun build            # Build all apps
bun check            # Lint & format code (auto-runs before commits)
bun check-types      # TypeScript type checking

# PWA Assets
cd apps/web && bun generate-pwa-assets
```

## 🌟 Key Technologies

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | React 19 + TanStack Router | Modern UI with type-safe routing |
| **Backend** | Hono + tRPC | Lightweight, type-safe APIs |
| **Database** | PostgreSQL + Drizzle ORM | Reliable data layer with type safety |
| **Storage** | Google Cloud Storage | File upload and storage |
| **Styling** | TailwindCSS + shadcn/ui | Utility-first CSS with components |
| **Auth** | Better Auth | Secure authentication system |
| **Build** | Bun + Turborepo | Fast builds and package management |
| **Quality** | Biome + TypeScript + Git Hooks | Automated code quality and type safety |

## ⚠️ Security Notes

### Environment Variables
- Never commit `.env` files to version control
- Use different secrets for each environment (dev/staging/prod)
- Rotate secrets regularly

### Google Cloud Security
- Store `gcs-key.json` securely and never commit to version control
- Use least-privilege principle for service account roles
- Enable audit logging for GCS buckets in production
- Consider using Google Cloud IAM for more granular permissions

### Database Security
- Use strong, unique passwords
- Enable SSL/TLS for database connections in production
- Regularly backup your database
- Limit database user permissions

## 🔧 Troubleshooting

### Common Issues

**Database Connection Errors**
```bash
# Check if PostgreSQL is running
docker compose ps

# View database logs
cd apps/server && docker compose logs postgres

# Reset database
bun db:down && bun db:start && bun db:push
```

**GCS Upload Errors**
- Verify `gcs-key.json` file exists and has correct permissions
- Check bucket name matches in both frontend and backend `.env` files
- Ensure service account has proper roles assigned

**Port Conflicts**
- Change ports in `docker-compose.yml` if 5432 is in use
- Update `DATABASE_URL` accordingly
- Ensure frontend and backend are using different ports

**Authentication Issues**
- Verify `BETTER_AUTH_SECRET` is set and matches between restarts
- Check `BETTER_AUTH_URL` matches your server URL
- Ensure `CORS_ORIGIN` includes your frontend URL

## 🤝 Contributing

We welcome contributions! Please:

1. Follow our coding standards (automatically enforced by Biome via git hooks)
2. Write tests for new features
3. Update documentation as needed

### Code Quality

This project uses **automated code quality enforcement**:
- **Husky + lint-staged** automatically runs `bun check` before every commit
- Code formatting and linting issues are caught and fixed automatically
- Commits are blocked if there are unfixable linting errors

## 📄 License

[Your License Here]

---

**Built with ❤️ using [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)**