import request from 'supertest';
import express, { Express } from 'express';
import { HealthHandler } from './healthHandler';

describe('HealthHandler', () => {
  let app: Express;
  let healthHandler: HealthHandler;

  beforeEach(() => {
    app = express();
    healthHandler = new HealthHandler();
    app.get('/health', (req, res) => healthHandler.check(req, res));
  });

  it('should return health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.service).toBe('ts-api-server');
  });
});
