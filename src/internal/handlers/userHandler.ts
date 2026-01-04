import { Request, Response } from 'express';
import { User, UserRequest } from '../models/user';

export class UserHandler {
  private users: User[] = [];
  private nextId = 1;

  getUsers(_req: Request, res: Response): void {
    res.status(200).json({
      data: this.users,
    });
  }

  getUser(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    const user = this.users.find((u) => u.id === id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ data: user });
  }

  createUser(req: Request, res: Response): void {
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

    const user: User = {
      id: this.nextId++,
      name: userReq.name,
      email: userReq.email,
    };

    this.users.push(user);

    res.status(201).json({ data: user });
  }

  deleteUser(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    this.users.splice(index, 1);

    res.status(200).json({ message: 'User deleted' });
  }
}
