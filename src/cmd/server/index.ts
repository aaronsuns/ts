import express, { Express, Request, Response, NextFunction } from 'express';
import { setupRoutes } from '../../internal/routes/routes';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (simple version)
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Setup routes
setupRoutes(app);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Get port from environment or use default
const port = process.env.PORT || '8080';
const env = process.env.ENV || 'development';

// Create HTTP server
const server = app.listen(port, () => {
  console.log(`Server starting on port ${port} (${env} mode)`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
  console.log(`Received ${signal}, shutting down server...`);

  server.close(() => {
    console.log('Server exited');
    process.exit(0);
  });

  // Force shutdown after 5 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 5000);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default app;
