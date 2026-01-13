/**
 * Database Migrations
 * 
 * This module handles database schema initialization.
 * It runs the SQL schema to create tables and indexes.
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import pool from './connection';

export async function runMigrations(): Promise<void> {
  try {
    // Try to read from dist first (production), then src (development)
    let schemaPath = join(__dirname, 'schema.sql');
    
    if (!existsSync(schemaPath)) {
      // In development with ts-node-dev, __dirname might point to src
      // Try alternative path
      schemaPath = join(__dirname, '../../../../src/internal/database/schema.sql');
    }
    
    if (!existsSync(schemaPath)) {
      throw new Error(`Schema file not found. Tried: ${schemaPath}`);
    }
    
    const schema = readFileSync(schemaPath, 'utf-8');

    // Execute the schema
    await pool.query(schema);
    console.log('✅ Database migrations completed');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    throw err;
  }
}

