// TypeScript interfaces for type safety
// These match the backend User model

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserRequest {
  name: string;
  email: string;
}

// API response wrapper (matches your backend response format)
export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  error: string;
}

