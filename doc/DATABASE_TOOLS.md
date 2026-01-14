# Database Tools Setup

## Recommended: SQLTools Extension (for Cursor/VS Code)

### Installation

1. Open Cursor/VS Code
2. Go to Extensions (Cmd+Shift+X)
3. Search and install:
   - **SQLTools** (by Matheus Teixeira)
   - **SQLTools PostgreSQL/Redshift** (by Matheus Teixeira)

### Connection Setup

1. Open Command Palette (Cmd+Shift+P)
2. Type: `SQLTools: Add New Connection`
3. Select: **PostgreSQL**
4. Fill in the connection details:

```
Connection Name: Local PostgreSQL
Server Address: localhost
Port: 5432
Database: userdb
Username: postgres
Password: postgres
```

5. Click "Test Connection" to verify
6. Click "Save Connection"

### Usage

- **View Tables**: Click on the connection in SQLTools sidebar
- **Browse Data**: Right-click on a table → "Show Table Records"
- **Run Queries**: Open a new SQL file (.sql) and use SQLTools to execute
- **View Schema**: Expand tables to see columns and constraints

## Alternative: DBeaver (Standalone Application)

### Installation

Download from: https://dbeaver.io/download/

### Connection Setup

1. Open DBeaver
2. Click "New Database Connection"
3. Select **PostgreSQL**
4. Fill in:
   - Host: `localhost`
   - Port: `5432`
   - Database: `userdb`
   - Username: `postgres`
   - Password: `postgres`
5. Click "Test Connection"
6. Click "Finish"

### Features

- Visual database browser
- Query editor with syntax highlighting
- Data editing (insert, update, delete)
- Export/import data
- ER diagrams

## Command Line: psql

You can also use the command line directly:

```bash
# Access PostgreSQL via Docker
docker-compose exec postgres psql -U postgres -d userdb

# Then run SQL commands:
\dt              # List all tables
\d users         # Describe users table
SELECT * FROM users;  # Query data
\q               # Quit
```

## Quick Reference

### Connection Details (for all tools)

```
Host: localhost
Port: 5432
Database: userdb
Username: postgres
Password: postgres
```

### Useful SQL Queries

```sql
-- List all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- View users table structure
\d users

-- View all users
SELECT * FROM users;

-- Count users
SELECT COUNT(*) FROM users;

-- View table with timestamps
SELECT id, name, email, created_at, updated_at FROM users;
```
