# Database Setup

This project uses PostgreSQL with Drizzle ORM. You can set up the database using Docker for easy development.

## Option 1: Using Docker (Recommended)

The project includes a Docker Compose configuration for PostgreSQL in `apps/server/docker-compose.yml`.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Quick Start

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

### Docker Management Commands

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

### Database Configuration

The Docker setup uses these default values:
- **Database**: `project-chowky`
- **Username**: `postgres`
- **Password**: `password`
- **Host**: `localhost`
- **Port**: `5432`

### Data Persistence

Your database data is stored in a Docker volume named `project-chowky_postgres_data`. This means your data will persist even when you stop and restart the containers.

To reset the database completely:
```bash
cd apps/server
docker compose down -v  # This deletes all data!
docker compose up -d
bun db:push  # Reapply schema
```

## Option 2: Local PostgreSQL Installation

If you prefer not to use Docker:

1. Install PostgreSQL on your system
2. Create a database named `project-chowky`
3. Update your `apps/server/.env` file with your PostgreSQL connection details
4. Apply the schema: `bun db:push`

## Troubleshooting

### Connection Issues
- Ensure Docker is running: `docker --version`
- Check if the container is running: `docker compose ps`
- View logs for errors: `docker compose logs postgres`

### Port Conflicts
If port 5432 is already in use, you can change it in `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Use port 5433 instead
```
Then update your `DATABASE_URL` accordingly.

### Resetting the Database
To start fresh with a clean database:
```bash
cd apps/server
docker compose down -v
docker compose up -d
bun db:push
```