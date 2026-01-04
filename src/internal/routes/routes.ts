import { Express, Router } from 'express';
import { HealthHandler } from '../handlers/healthHandler';
import { UserHandler } from '../handlers/userHandler';

export function setupRoutes(app: Express): void {
  // Initialize handlers
  const healthHandler = new HealthHandler();
  const userHandler = new UserHandler();

  // Health check endpoint
  app.get('/health', (req, res) => healthHandler.check(req, res));

  // API v1 routes
  const v1Router = Router();
  const usersRouter = Router();

  // User routes
  usersRouter.get('', (req, res) => userHandler.getUsers(req, res));
  usersRouter.get('/:id', (req, res) => userHandler.getUser(req, res));
  usersRouter.post('', (req, res) => userHandler.createUser(req, res));
  usersRouter.delete('/:id', (req, res) => userHandler.deleteUser(req, res));

  v1Router.use('/users', usersRouter);
  app.use('/api/v1', v1Router);
}
