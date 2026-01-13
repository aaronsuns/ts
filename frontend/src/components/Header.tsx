/**
 * Header Component
 * 
 * This is a separate component - notice how it's just the header part!
 * By breaking your UI into smaller components, your code becomes:
 * - Easier to read
 * - Easier to reuse
 * - Easier to test
 * - Easier to maintain
 */

import './Header.css';

export function Header() {
  return (
    <div className="header">
      <h1>User Management</h1>
      <p>Manage your users with this simple React interface</p>
    </div>
  );
}

