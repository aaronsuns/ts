# Database Setup Guide

This project uses **PostgreSQL** as the database, running in a **Docker container** for easy setup and consistency.

## Why PostgreSQL?

- **Production-ready**: Used by many large-scale applications
- **Reliable**: ACID compliant, handles concurrent access well
- **Feature-rich**: Supports complex queries, transactions, and more
- **Well-supported**: Great TypeScript/Node.js libraries

## Quick Start

### 1. Install Dependencies

```bash
yarn install
```

This will install:
- `pg` - PostgreSQL client for Node.js
- `dotenv` - Environment variable management

### 2. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

This will:
- Start PostgreSQL in a Docker container
- Create a database named `userdb`
- Expose PostgreSQL on port `5432`
- Persist data in a Docker volume (data survives container restarts)

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp env.example .env
```

The default values in `.env` are:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=userdb
```

You can modify these if needed, but the defaults work with the Docker setup.

### 4. Start the Server

```bash
yarn dev
```

The server will:
1. Connect to the database
2. Run migrations (create tables automatically)
3. Start the API server

You should see:
```
✅ Database connected successfully
✅ Database migrations completed
Server starting on port 8080 (development mode)
```

## Docker Commands

### Start the database
```bash
docker-compose up -d
```

### Stop the database
```bash
docker-compose down
```

### View database logs
```bash
docker-compose logs -f postgres
```

### Access PostgreSQL directly
```bash
docker-compose exec postgres psql -U postgres -d userdb
```

### Reset the database (⚠️ deletes all data)
```bash
docker-compose down -v  # Remove volumes
docker-compose up -d    # Start fresh
```

## Database Schema

The `users` table has the following structure:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Architecture

### Database Layer Structure

```
src/internal/
├── database/
│   ├── connection.ts    # Database connection pool
│   ├── migrations.ts    # Schema initialization
│   └── schema.sql       # SQL schema definition
├── repositories/
│   └── userRepository.ts # Data access layer
└── handlers/
    └── userHandler.ts   # Business logic (uses repository)
```

### How It Works

1. **Connection Pool** (`connection.ts`)
   - Manages database connections efficiently
   - Reuses connections instead of creating new ones each time

2. **Repository Pattern** (`userRepository.ts`)
   - Separates database logic from business logic
   - All database queries are in one place
   - Easy to test and maintain

3. **Migrations** (`migrations.ts`)
   - Automatically creates tables on server start
   - Ensures database schema is up to date

## Troubleshooting

### "Connection refused" error
- Make sure Docker is running: `docker ps`
- Check if PostgreSQL container is up: `docker-compose ps`
- Start it: `docker-compose up -d`

### "Database does not exist" error
- The database is created automatically by Docker
- Check your `.env` file matches Docker Compose settings

### "Table does not exist" error
- Migrations run automatically on server start
- Check server logs for migration errors
- You can manually run migrations by restarting the server

### Port 5432 already in use
- Another PostgreSQL instance might be running
- Change the port in `docker-compose.yml` and `.env`
- Or stop the other instance

## Production Considerations

For production, you should:

1. **Use a managed database service** (AWS RDS, Google Cloud SQL, etc.)
2. **Use strong passwords** - change default credentials
3. **Use connection pooling** - already configured
4. **Add database backups** - regular automated backups
5. **Monitor performance** - use database monitoring tools
6. **Use environment-specific configs** - different DB for dev/staging/prod

## Alternative: SQLite (Lighter Option)

If you want a simpler, file-based database for development:

1. Install `better-sqlite3` instead of `pg`
2. Remove Docker setup
3. Database is stored in a local file

However, PostgreSQL is recommended for learning production-ready patterns.

## Next Steps

- Add more tables (posts, comments, etc.)
- Add database indexes for performance
- Add database transactions for complex operations
- Add database seeding for test data
- Add database migrations tool (like TypeORM or Prisma)

