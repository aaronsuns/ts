/**
 * User Repository
 * 
 * This module handles all database operations for users.
 * It acts as a data access layer, separating database logic from business logic.
 */

import { Pool } from 'pg';
import { User, UserRequest } from '../models/user';
import pool from '../database/connection';

export class UserRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  /**
   * Get all users from the database
   */
  async findAll(): Promise<User[]> {
    const result = await this.pool.query<User>(
      'SELECT id, name, email FROM users ORDER BY id ASC'
    );
    return result.rows;
  }

  /**
   * Get a user by ID
   */
  async findById(id: number): Promise<User | null> {
    const result = await this.pool.query<User>(
      'SELECT id, name, email FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  /**
   * Get a user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query<User>(
      'SELECT id, name, email FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  /**
   * Create a new user
   */
  async create(userData: UserRequest): Promise<User> {
    const result = await this.pool.query<User>(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
      [userData.name, userData.email]
    );
    return result.rows[0];
  }

  /**
   * Delete a user by ID
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }

  /**
   * Update a user
   */
  async update(id: number, userData: UserRequest): Promise<User | null> {
    const result = await this.pool.query<User>(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [userData.name, userData.email, id]
    );
    return result.rows[0] || null;
  }
}

