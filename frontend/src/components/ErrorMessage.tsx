/**
 * ErrorMessage Component
 * 
 * A reusable component for displaying errors.
 * Notice how it takes a "message" prop - this is how you pass data to components!
 */

import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error">
      <strong>Error:</strong> {message}
    </div>
  );
}

