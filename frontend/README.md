# React Frontend - User Management

This is a React frontend application that connects to your TypeScript API server.

## 🎓 React Basics Explained

### What is React?
React is a JavaScript library for building user interfaces. It lets you create reusable components and manage application state.

### Key Concepts:

#### 1. **Components**
Components are like building blocks. They're functions that return JSX (looks like HTML but is JavaScript).

```tsx
function MyComponent() {
  return <h1>Hello World</h1>;
}
```

#### 2. **JSX**
JSX lets you write HTML-like code in JavaScript:
```tsx
const name = "John";
return <h1>Hello {name}</h1>; // Renders: Hello John
```

#### 3. **State (useState)**
State is data that can change. When state changes, React re-renders the component.

```tsx
const [count, setCount] = useState(0);
// count is the current value
// setCount is a function to update it
```

#### 4. **Effects (useEffect)**
Effects let you run code after rendering (like API calls):

```tsx
useEffect(() => {
  // This runs after the component renders
  fetchData();
}, []); // Empty array = run once
```

#### 5. **Props**
Props are data passed from parent to child components:

```tsx
function UserCard({ name, email }) {
  return <div>{name} - {email}</div>;
}

// Usage:
<UserCard name="John" email="john@example.com" />
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.tsx          # Main component (the whole app)
│   ├── main.tsx         # Entry point (renders App)
│   ├── index.css        # Global styles
│   ├── types/
│   │   └── user.ts      # TypeScript type definitions
│   └── services/
│       └── api.ts       # Functions to call your backend API
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## 🚀 Getting Started

### 1. Install Dependencies

Navigate to the frontend directory and install packages:

```bash
cd frontend
npm install
# or
yarn install
```

### 2. Start the Development Server

Make sure your backend server is running first (on port 8080):

```bash
# In the root directory
yarn dev
```

Then start the React frontend:

```bash
# In the frontend directory
npm run dev
# or
yarn dev
```

The frontend will run on `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
# or
yarn build
```

## 🔧 How It Works

### API Communication

The frontend communicates with your backend through the `api.ts` service file:

- **GET** `/api/v1/users` - Fetch all users
- **POST** `/api/v1/users` - Create a new user
- **DELETE** `/api/v1/users/:id` - Delete a user

The Vite proxy (configured in `vite.config.ts`) forwards `/api` requests to `http://localhost:8080`.

### Component Flow

1. **App.tsx** is the main component
2. When it loads, `useEffect` calls `fetchUsers()`
3. `fetchUsers()` uses the API service to get users
4. Users are stored in state with `useState`
5. When state changes, React re-renders the component
6. The JSX displays the users in a list

### Form Handling

1. User types in the form inputs
2. `handleInputChange` updates the `formData` state
3. On submit, `handleSubmit` calls the API
4. New user is added to the `users` state
5. Component re-renders showing the new user

## 📚 Learning Resources

- [React Official Docs](https://react.dev)
- [React Hooks Guide](https://react.dev/reference/react)
- [TypeScript + React](https://react-typescript-cheatsheet.netlify.app/)

## 🎨 Customization

### Adding More Features

You can extend this app by:

1. **Adding Edit Functionality:**
   - Add an "Edit" button
   - Create an edit form
   - Add `updateUser` function to `api.ts`

2. **Adding Search/Filter:**
   - Add a search input
   - Filter users based on search term

3. **Adding Routing:**
   - Install `react-router-dom`
   - Create separate pages for different views

### Styling

The app uses CSS in `index.css`. You can:
- Modify the existing styles
- Add a CSS framework (Bootstrap, Tailwind)
- Use CSS modules or styled-components

## 🐛 Troubleshooting

**Frontend can't connect to backend:**
- Make sure backend is running on port 8080
- Check the proxy configuration in `vite.config.ts`

**CORS errors:**
- The proxy should handle this, but if you see CORS errors, you may need to add CORS middleware to your Express server

**Type errors:**
- Make sure TypeScript types match between frontend and backend
- Check `types/user.ts` matches your backend User model

