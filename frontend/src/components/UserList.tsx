/**
 * UserList Component
 * 
 * This component displays the list of users.
 * It receives:
 * - users: array of users to display
 * - loading: whether data is being fetched
 * - onDelete: function to call when delete button is clicked
 * 
 * Notice how the JSX is much simpler now - just the user list logic!
 */

import { User } from '../types/user';
import './UserList.css';

interface UserListProps {
  users: User[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export function UserList({ users, loading, onDelete }: UserListProps) {
  return (
    <div className="user-list">
      <h2 className="user-list-header">
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
          <UserItem key={user.id} user={user} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}

// UserItem is a sub-component - components can contain other components!
interface UserItemProps {
  user: User;
  onDelete: (id: number) => void;
}

function UserItem({ user, onDelete }: UserItemProps) {
  return (
    <div className="user-item">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <div className="user-actions">
        <button
          className="button button-danger"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

