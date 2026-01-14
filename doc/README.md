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
- Yarn (recommended) or npm

## Quick Start

### Install Dependencies

```bash
yarn install
# or
npm install
```

### Run the Server (Development)

```bash
yarn dev
# or
npm run dev
```

The server will start on `http://localhost:8080` by default.

### Build the Application

```bash
yarn build
# or
npm run build
```

### Run the Server (Production)

```bash
yarn start
# or
npm start
```

### Run Tests

```bash
yarn test
# or
npm test
```

### Run Tests with Coverage

```bash
yarn test:coverage
# or
npm run test:coverage
```

### Type Check

```bash
yarn type-check
# or
npm run type-check
```

### Run Linter

```bash
yarn lint
# or
npm run lint
```

### Format Code

```bash
yarn format
# or
npm run format
```

### Run CI Checks

```bash
yarn ci
# or
npm run ci
```

This runs type-check, linting, and tests.

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

- `yarn build` - Build the TypeScript project
- `yarn start` - Run the built application
- `yarn dev` - Run the application in development mode with hot reload
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report
- `yarn type-check` - Type check without emitting files
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with auto-fix
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn clean` - Clean build artifacts and coverage
- `yarn ci` - Run CI checks (type-check + lint + test)

Replace `yarn` with `npm run` if using npm.

## Development

### Code Style

- Follow TypeScript best practices
- Use ESLint for code quality
- Use Prettier for code formatting
- Run `yarn format` before committing
- Ensure `yarn lint` and `yarn type-check` pass
- Write tests for new features

### Testing

- All tests should be in `*.test.ts` files
- Use Jest as the testing framework
- Use Supertest for HTTP endpoint testing
- Aim for >80% test coverage

## License

MIT

