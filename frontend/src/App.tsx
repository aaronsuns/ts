/**
 * App.tsx - Main React Component
 * 
 * This is the root component of your React application.
 * 
 * KEY REACT CONCEPTS USED HERE:
 * 
 * 1. useState Hook:
 *    - useState is a React Hook that lets you add state to functional components
 *    - State is data that can change over time and causes the component to re-render
 *    - Example: const [users, setUsers] = useState<User[]>([])
 *      - users: current state value
 *      - setUsers: function to update the state
 *      - []: initial value (empty array)
 * 
 * 2. useEffect Hook:
 *    - useEffect lets you perform side effects (like API calls) in components
 *    - Runs after the component renders
 *    - The empty array [] means it only runs once when component first mounts
 *    - Example: useEffect(() => { fetchUsers() }, [])
 * 
 * 3. Event Handlers:
 *    - Functions that handle user interactions (clicks, form submissions, etc.)
 *    - Example: onClick={handleDeleteUser}
 * 
 * 4. JSX:
 *    - JavaScript XML - looks like HTML but is actually JavaScript
 *    - You can embed JavaScript expressions using { }
 *    - Example: <h1>{users.length} Users</h1>
 */

import { useState, useEffect } from 'react';
import { User, UserRequest } from './types/user';
import { getUsers, createUser, deleteUser } from './services/api';
import './index.css';

function App() {
  // State: Store the list of users
  // When users changes, React automatically re-renders the component
  const [users, setUsers] = useState<User[]>([]);
  
  // State: Track if we're loading data
  const [loading, setLoading] = useState<boolean>(true);
  
  // State: Store any error messages
  const [error, setError] = useState<string | null>(null);
  
  // State: Form inputs for creating a new user
  const [formData, setFormData] = useState<UserRequest>({
    name: '',
    email: '',
  });

  // useEffect: Fetch users when component first loads
  // The empty array [] means this only runs once (on mount)
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users from the API
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

  // Function to handle form submission (create new user)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    try {
      setError(null);
      // Create the user via API
      const newUser = await createUser(formData);
      
      // Add the new user to our list (optimistic update)
      setUsers([...users, newUser]);
      
      // Clear the form
      setFormData({ name: '', email: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  // Function to handle input changes in the form
  // This updates the formData state as you type
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,        // Keep existing fields
      [name]: value,  // Update the changed field
    }));
  };

  // Function to handle deleting a user
  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setError(null);
      await deleteUser(id);
      
      // Remove the user from our list
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  // JSX: What gets rendered to the screen
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>User Management</h1>
        <p>Manage your users with this simple React interface</p>
      </div>

      {/* Error message display */}
      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Form to create a new user */}
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add New User</h2>
        
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter user name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter user email"
            required
          />
        </div>

        <button type="submit" className="button">
          Add User
        </button>
      </form>

      {/* User list */}
      <div className="user-list">
        <h2 style={{ padding: '20px', margin: 0, borderBottom: '2px solid #e0e0e0' }}>
          Users ({users.length})
        </h2>

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <p>No users yet. Add one above!</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              <div className="user-actions">
                <button
                  className="button button-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

