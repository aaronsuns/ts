import request from 'supertest';
import express, { Express } from 'express';
import { UserHandler } from './userHandler';

describe('UserHandler', () => {
  let app: Express;
  let userHandler: UserHandler;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    userHandler = new UserHandler();
  });

  describe('GetUsers', () => {
    it('should return all users', async () => {
      app.get('/users', (req, res) => userHandler.getUsers(req, res));

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });
  });

  describe('CreateUser', () => {
    it('should create a user', async () => {
      app.post('/users', (req, res) => userHandler.createUser(req, res));

      const userReq = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const response = await request(app).post('/users').send(userReq);

      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe('John Doe');
      expect(response.body.data.email).toBe('john@example.com');
      expect(response.body.data.id).toBeDefined();
    });

    it('should return error for invalid input', async () => {
      app.post('/users', (req, res) => userHandler.createUser(req, res));

      const invalidUserReq = {
        name: '',
        email: 'invalid-email',
      };

      const response = await request(app).post('/users').send(invalidUserReq);

      expect(response.status).toBe(400);
    });

    it('should return error for missing fields', async () => {
      app.post('/users', (req, res) => userHandler.createUser(req, res));

      const response = await request(app).post('/users').send({});

      expect(response.status).toBe(400);
    });

    it('should return error for name too short', async () => {
      app.post('/users', (req, res) => userHandler.createUser(req, res));

      const response = await request(app)
        .post('/users')
        .send({ name: 'A', email: 'test@example.com' });

      expect(response.status).toBe(400);
    });

    it('should return error for invalid email format', async () => {
      app.post('/users', (req, res) => userHandler.createUser(req, res));

      const response = await request(app)
        .post('/users')
        .send({ name: 'John Doe', email: 'not-an-email' });

      expect(response.status).toBe(400);
    });
  });

  describe('GetUser', () => {
    it('should get a user by id', async () => {
      app.post('/users', (req, res) => userHandler.createUser(req, res));
      app.get('/users/:id', (req, res) => userHandler.getUser(req, res));

      // First create a user
      const createResponse = await request(app).post('/users').send({
        name: 'Jane Doe',
        email: 'jane@example.com',
      });

      const userId = createResponse.body.data.id;

      // Then get the user
      const getResponse = await request(app).get(`/users/${userId}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.data.id).toBe(userId);
      expect(getResponse.body.data.name).toBe('Jane Doe');
      expect(getResponse.body.data.email).toBe('jane@example.com');
    });

    it('should return 404 for non-existent user', async () => {
      app.get('/users/:id', (req, res) => userHandler.getUser(req, res));

      const response = await request(app).get('/users/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });

    it('should return 400 for invalid user id', async () => {
      app.get('/users/:id', (req, res) => userHandler.getUser(req, res));

      const response = await request(app).get('/users/invalid');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid user ID');
    });
  });

  describe('DeleteUser', () => {
    it('should delete a user', async () => {
      app.post('/users', (req, res) => userHandler.createUser(req, res));
      app.delete('/users/:id', (req, res) => userHandler.deleteUser(req, res));

      // First create a user
      const createResponse = await request(app).post('/users').send({
        name: 'Delete Me',
        email: 'delete@example.com',
      });

      const userId = createResponse.body.data.id;

      // Then delete the user
      const deleteResponse = await request(app).delete(`/users/${userId}`);

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.message).toBe('User deleted');
    });

    it('should return 404 for non-existent user', async () => {
      app.delete('/users/:id', (req, res) => userHandler.deleteUser(req, res));

      const response = await request(app).delete('/users/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });

    it('should return 400 for invalid user id', async () => {
      app.delete('/users/:id', (req, res) => userHandler.deleteUser(req, res));

      const response = await request(app).delete('/users/invalid');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid user ID');
    });
  });
});
