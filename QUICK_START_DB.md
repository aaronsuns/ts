# Quick Start - Database Setup

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
yarn install
```

### 2. Start PostgreSQL (Docker)
```bash
docker-compose up -d
```

### 3. Create .env file
```bash
cp env.example .env
```

### 4. Start the Server
```bash
yarn dev
```

That's it! The database will be created automatically, tables will be set up, and your API will be ready.

## ✅ Verify It's Working

1. Check Docker: `docker ps` (should show postgres container)
2. Check server logs: Should see "✅ Database connected successfully"
3. Test API: `curl http://localhost:8080/api/v1/users`

## 📝 What Changed?

- **Before**: Data stored in memory (lost on restart)
- **After**: Data stored in PostgreSQL (persists forever!)

Your existing frontend will work exactly the same - no changes needed!

## 🛠️ Common Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View database logs
docker-compose logs -f postgres

# Access database directly
docker-compose exec postgres psql -U postgres -d userdb
```

For more details, see [DATABASE_SETUP.md](./DATABASE_SETUP.md)

