# TypeScript API Server

A modern TypeScript REST API server following best practices with clean architecture, comprehensive testing, and build tooling.

## Features

- 🚀 RESTful API server using Express.js framework
- ✅ Comprehensive unit tests with Jest
- 🔍 Linting with ESLint and formatting with Prettier
- 📦 Modern project structure following TypeScript best practices
- ⚡ Graceful shutdown support
- 📝 Clean code architecture
- 🔧 TypeScript strict mode enabled

## Project Structure

```
.
├── src/
│   ├── cmd/
│   │   └── server/          # Application entry point
│   └── internal/
│       ├── handlers/        # HTTP handlers
│       ├── models/          # Data models
│       └── routes/          # Route setup
├── dist/                    # Build output (generated)
├── coverage/                # Test coverage (generated)
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── jest.config.js           # Jest test configuration
├── .eslintrc.json           # ESLint configuration
├── .prettierrc.json         # Prettier configuration
└── README.md                # This file
```

## Prerequisites

- Node.js 18 or later
- npm or yarn

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run the Server (Development)

```bash
npm run dev
```

The server will start on `http://localhost:8080` by default.

### Build the Application

```bash
npm run build
```

### Run the Server (Production)

```bash
npm start
```

### Run Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Linter

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

### Run CI Checks

```bash
npm run ci
```

This runs both linting and tests.

## API Endpoints

### Health Check

```
GET /health
```

Returns the health status of the service.

**Response:**
```json
{
  "status": "ok",
  "service": "ts-api-server"
}
```

### Users API

#### Get All Users
```
GET /api/v1/users
```

#### Get User by ID
```
GET /api/v1/users/:id
```

#### Create User
```
POST /api/v1/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Delete User
```
DELETE /api/v1/users/:id
```

## Environment Variables

- `PORT`: Server port (default: 8080)
- `ENV`: Environment mode (development/production, default: development)

## Available Scripts

- `npm run build` - Build the TypeScript project
- `npm start` - Run the built application
- `npm run dev` - Run the application in development mode with hot reload
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Clean build artifacts and coverage
- `npm run ci` - Run CI checks (lint + test)

## Development

### Code Style

- Follow TypeScript best practices
- Use ESLint for code quality
- Use Prettier for code formatting
- Run `npm run format` before committing
- Ensure `npm run lint` passes
- Write tests for new features

### Testing

- All tests should be in `*.test.ts` files
- Use Jest as the testing framework
- Use Supertest for HTTP endpoint testing
- Aim for >80% test coverage

## License

MIT

