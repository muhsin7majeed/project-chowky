# Project Chowky Documentation

Welcome to the Project Chowky documentation! This guide will help you understand, set up, and contribute to the project.

## 📚 Documentation Structure

### 🚀 Setup & Installation
- [Database Setup](setup/database.md) - PostgreSQL configuration with Docker
- [Environment Configuration](setup/environment.md) - Environment variables and configuration

### 💻 Development Guides
- [Frontend Development](development/frontend.md) - React, TanStack Router, and UI development
- [Backend Development](development/backend.md) - Hono, tRPC, and API development
- [Testing Guide](development/testing.md) - Testing strategies and best practices
- [Deployment Guide](development/deployment.md) - Production deployment instructions

### ✨ Features
- [Internationalization (i18n)](features/i18n.md) - Multi-language support
- [Authentication](features/authentication.md) - User authentication with Better Auth
- [Progressive Web App](features/pwa.md) - PWA configuration and features
- [Theming](features/theming.md) - Dark/light mode and customization

### 🔗 API Reference
- [tRPC API Reference](api/trpc.md) - Complete API documentation
- [Database Schema](api/database-schema.md) - Database tables and relationships
- [Authentication Endpoints](api/auth.md) - Authentication-related APIs

## 🛠️ Tech Stack

This project is built with the **Better-T-Stack**, featuring:

- **Frontend**: React 19, TanStack Router, TailwindCSS, shadcn/ui
- **Backend**: Hono, tRPC, Drizzle ORM
- **Database**: PostgreSQL
- **Build Tools**: Bun, Turborepo, Biome + Git Hooks
- **Authentication**: Better Auth
- **Deployment**: Docker, PWA support

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd project-chowky
   bun install
   ```

2. **Setup Database**
   ```bash
   cd apps/server
   docker compose up -d
   bun db:push
   ```

3. **Start Development**
   ```bash
   bun dev
   ```

4. **Access Applications**
   - Frontend: [http://localhost:3001](http://localhost:3001)
   - Backend API: [http://localhost:3000](http://localhost:3000)

## 📖 How to Use This Documentation

- **New to the project?** Start with the [Database Setup](setup/database.md) guide
- **Frontend developer?** Check out the [Frontend Development](development/frontend.md) guide
- **Backend developer?** Explore the [Backend Development](development/backend.md) guide
- **Need specific features?** Browse the [Features](features/) section
- **API integration?** Reference the [API documentation](api/)

## 🤝 Contributing

We welcome contributions! Please read our development guides and follow the established patterns:

1. Follow the coding standards (automatically enforced by Biome + git hooks)
2. Write tests for new features
3. Update documentation for any new functionality
4. Use conventional commit messages

### ⚡ Automated Code Quality

This project includes **automatic code quality enforcement**:
- **Pre-commit hooks**: `bun check` runs automatically before every commit
- **Lint-staged**: Only staged files are checked for faster performance
- **Auto-fix**: Formatting issues are automatically fixed when possible
- **Commit blocking**: Commits are prevented if there are unfixable linting errors

## 📝 Documentation Guidelines

When adding new documentation:

1. **Place files in appropriate directories**:
   - `setup/` - Installation and configuration
   - `development/` - Development guides and workflows
   - `features/` - Feature-specific documentation
   - `api/` - API reference and schemas

2. **Follow the markdown structure**:
   - Use clear headings and subheadings
   - Include code examples with syntax highlighting
   - Add cross-references to related documentation

3. **Keep it current**:
   - Update docs when changing functionality
   - Review and update outdated information
   - Test code examples to ensure they work

## 🔍 Need Help?

- Check the relevant documentation section first
- Look for similar issues in the codebase
- Consult the API reference for technical details
- Review the development guides for best practices

---

**Happy coding!** 🎉