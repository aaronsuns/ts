/**
 * App.tsx - Main React Component (REFACTORED VERSION)
 * 
 * NOTICE HOW MUCH CLEANER THIS IS NOW!
 * 
 * Instead of having all the HTML/JSX mixed with logic, we've:
 * 1. Extracted UI into separate components (Header, UserForm, UserList, ErrorMessage)
 * 2. Moved CSS into component-specific files
 * 3. Kept App.tsx focused on business logic (state management, API calls)
 * 
 * This is called "Component Composition" - building complex UIs from simple pieces.
 * 
 * KEY REACT CONCEPTS:
 * 
 * 1. Component Composition:
 *    - Break UI into smaller, reusable components
 *    - Each component has a single responsibility
 *    - Components receive data via "props"
 * 
 * 2. Props:
 *    - Props are how you pass data from parent to child
 *    - Example: <UserForm formData={formData} onSubmit={handleSubmit} />
 *      - formData and onSubmit are "props"
 *      - UserForm receives them as function parameters
 * 
 * 3. Separation of Concerns:
 *    - Logic stays in App.tsx (state, API calls)
 *    - UI stays in component files (Header.tsx, UserForm.tsx, etc.)
 *    - Styles stay in CSS files (Header.css, UserForm.css, etc.)
 */

import { useState, useEffect } from 'react';
import { User, UserRequest } from './types/user';
import { getUsers, createUser, deleteUser } from './services/api';
import { Header } from './components/Header';
import { ErrorMessage } from './components/ErrorMessage';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import './index.css';

function App() {
  // State management - this stays in the main component
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserRequest>({
    name: '',
    email: '',
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Business logic functions
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    try {
      setError(null);
      const newUser = await createUser(formData);
      setUsers([...users, newUser]);
      setFormData({ name: '', email: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setError(null);
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  // Clean JSX - just composing components together!
  return (
    <div className="container">
      <Header />
      
      {error && <ErrorMessage message={error} />}
      
      <UserForm
        formData={formData}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
      
      <UserList
        users={users}
        loading={loading}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default App;
