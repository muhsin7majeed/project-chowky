# Project Chowky

A modern TypeScript monorepo built with the **Better-T-Stack**, featuring React, TanStack Router, Hono, tRPC, and more.

## ✨ Features

- **🔷 TypeScript** - Full type safety across frontend and backend
- **⚡ TanStack Router** - File-based routing with type safety
- **🎨 TailwindCSS + shadcn/ui** - Modern UI with reusable components
- **🌐 Hono + tRPC** - Type-safe, performant APIs
- **🗄️ Drizzle ORM + PostgreSQL** - Type-safe database operations
- **🔐 Authentication** - Email & password auth with Better Auth
- **🌍 Internationalization** - Multi-language support (English/German)
- **🌙 Theme Support** - Dark/light mode with system detection
- **📱 PWA Ready** - Progressive Web App capabilities
- **⚡ Bun + Turborepo** - Fast runtime and optimized monorepo builds
- **🧹 Biome** - Code formatting and linting

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) runtime
- [Docker](https://docs.docker.com/get-docker/) (for database)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd project-chowky

# Install dependencies
bun install

# Setup database
cd apps/server
docker compose up -d
cd ../..
bun db:push

# Start development servers
bun dev
```

### Access the Application

- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **Database Studio**: `bun db:studio`

## 📂 Project Structure

```
project-chowky/
├── apps/
│   ├── web/                 # React frontend app
│   │   ├── src/routes/      # File-based routing
│   │   ├── src/components/  # UI components
│   │   └── src/lib/         # Utilities & config
│   └── server/              # Hono backend API
│       ├── src/routers/     # tRPC routers
│       ├── src/db/          # Database schema & config
│       └── src/lib/         # Server utilities
├── docs/                    # Documentation
└── package.json             # Monorepo configuration
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

# Build & Quality
bun build            # Build all apps
bun check            # Lint & format code
bun check-types      # TypeScript type checking

# PWA Assets
cd apps/web && bun generate-pwa-assets
```

## 📚 Documentation

For detailed documentation, visit the [`docs/`](docs/) directory:

- **📖 [Complete Documentation](docs/index.md)** - Full documentation index
- **🗄️ [Database Setup](docs/setup/database.md)** - PostgreSQL with Docker
- **🎨 [Frontend Guide](docs/development/frontend.md)** - React & TanStack Router
- **⚡ [Backend Guide](docs/development/backend.md)** - Hono & tRPC APIs
- **🌍 [Internationalization](docs/features/i18n.md)** - Multi-language support

## 🌟 Key Technologies

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | React 19 + TanStack Router | Modern UI with type-safe routing |
| **Backend** | Hono + tRPC | Lightweight, type-safe APIs |
| **Database** | PostgreSQL + Drizzle ORM | Reliable data layer with type safety |
| **Styling** | TailwindCSS + shadcn/ui | Utility-first CSS with components |
| **Auth** | Better Auth | Secure authentication system |
| **Build** | Bun + Turborepo | Fast builds and package management |
| **Quality** | Biome + TypeScript | Code quality and type safety |

## 🎯 Getting Started Guide

1. **🗄️ Database**: Follow the [Database Setup](docs/setup/database.md) guide
2. **🎨 Frontend**: Learn about [Frontend Development](docs/development/frontend.md)
3. **⚡ Backend**: Explore [Backend Development](docs/development/backend.md)
4. **🌍 Features**: Discover available [Features](docs/features/)

## 🤝 Contributing

We welcome contributions! Please:

1. Read the [development guides](docs/development/)
2. Follow our coding standards (enforced by Biome)
3. Write tests for new features
4. Update documentation as needed

## 📄 License

[Your License Here]

---

**Built with ❤️ using [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)**