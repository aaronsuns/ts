// API service - handles all communication with the backend
// This keeps API logic separate from UI components

import { User, UserRequest, ApiResponse, ApiError } from '../types/user';

const API_BASE_URL = '/api/v1';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    // If response is not ok, data contains error message
    const error = data as ApiError;
    throw new Error(error.error || 'Something went wrong');
  }
  
  return data as T;
}

// Get all users
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  const result = await handleResponse<ApiResponse<User[]>>(response);
  return result.data;
}

// Get a single user by ID
export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  const result = await handleResponse<ApiResponse<User>>(response);
  return result.data;
}

// Create a new user
export async function createUser(userData: UserRequest): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const result = await handleResponse<ApiResponse<User>>(response);
  return result.data;
}

// Delete a user by ID
export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json() as ApiError;
    throw new Error(error.error || 'Failed to delete user');
  }
}

