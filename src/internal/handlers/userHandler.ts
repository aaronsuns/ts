import { Request, Response } from 'express';
import { UserRequest } from '../models/user';
import { UserRepository } from '../repositories/userRepository';

export class UserHandler {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userRepository.findAll();
      res.status(200).json({
        data: users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json({ data: user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const userReq: UserRequest = req.body;

    // Validation
    if (!userReq.name || !userReq.email) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }

    if (userReq.name.length < 2 || userReq.name.length > 100) {
      res.status(400).json({ error: 'Name must be between 2 and 100 characters' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userReq.email)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    try {
      // Check if email already exists
      const existingUser = await this.userRepository.findByEmail(userReq.email);
      if (existingUser) {
        res.status(409).json({ error: 'Email already exists' });
        return;
      }

      const user = await this.userRepository.create(userReq);
      res.status(201).json({ data: user });
    } catch (error: any) {
      console.error('Error creating user:', error);
      
      // Handle unique constraint violation
      if (error.code === '23505') {
        res.status(409).json({ error: 'Email already exists' });
        return;
      }

      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    try {
      const deleted = await this.userRepository.delete(id);

      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}
