/**
 * UserForm Component
 * 
 * This component handles the form for creating users.
 * It receives:
 * - formData: current form values
 * - onSubmit: function to call when form is submitted
 * - onChange: function to call when inputs change
 * 
 * This is called "lifting state up" - the parent (App) manages the state,
 * and passes it down as props to child components.
 */

import { UserRequest } from '../types/user';
import './UserForm.css';

interface UserFormProps {
  formData: UserRequest;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UserForm({ formData, onSubmit, onChange }: UserFormProps) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Add New User</h2>
      
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Enter user email"
          required
        />
      </div>

      <button type="submit" className="button">
        Add User
      </button>
    </form>
  );
}

