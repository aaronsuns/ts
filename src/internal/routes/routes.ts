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

  // User routes - wrap async handlers to catch errors
  usersRouter.get('', (req, res) => {
    userHandler.getUsers(req, res).catch((err) => {
      console.error('Unhandled error in getUsers:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });
  usersRouter.get('/:id', (req, res) => {
    userHandler.getUser(req, res).catch((err) => {
      console.error('Unhandled error in getUser:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });
  usersRouter.post('', (req, res) => {
    userHandler.createUser(req, res).catch((err) => {
      console.error('Unhandled error in createUser:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });
  usersRouter.delete('/:id', (req, res) => {
    userHandler.deleteUser(req, res).catch((err) => {
      console.error('Unhandled error in deleteUser:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });

  v1Router.use('/users', usersRouter);
  app.use('/api/v1', v1Router);
}
