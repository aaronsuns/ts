# React Frontend - Complete Learning Guide

## 🎯 Overview: How React Works

React is a library for building user interfaces. Think of it like building with LEGO blocks:
- Each **component** is a LEGO block
- You combine blocks to build complex UIs
- When data changes, React automatically updates the UI

## 📁 Project Structure

```
frontend/src/
├── main.tsx              # Entry point - starts the app
├── App.tsx               # Main component - manages state & logic
├── index.css             # Global styles
├── types/
│   └── user.ts           # TypeScript type definitions
├── services/
│   └── api.ts            # Functions to call backend API
└── components/
    ├── Header.tsx        # Header component
    ├── Header.css
    ├── ErrorMessage.tsx  # Error display component
    ├── ErrorMessage.css
    ├── UserForm.tsx      # Form to create users
    ├── UserForm.css
    ├── UserList.tsx      # List of users
    └── UserList.css
```

## 🚀 Step-by-Step: How Your App Works

### 1. Entry Point: `main.tsx`

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**What happens:**
1. Finds the `<div id="root">` in `index.html`
2. Creates a React "root" container
3. Renders the `<App />` component inside it
4. `StrictMode` helps catch bugs during development

**Think of it as:** The starting point that says "Hey React, render the App component here!"

---

### 2. Main Component: `App.tsx`

This is the "brain" of your app. It manages:
- **State** (data that can change)
- **Business logic** (what happens when users interact)
- **API calls** (talking to your backend)

#### Key Concepts in App.tsx:

##### A. State with `useState`

```tsx
const [users, setUsers] = useState<User[]>([]);
```

**Breaking it down:**
- `users` = current value (array of users)
- `setUsers` = function to update the value
- `useState<User[]>([])` = initial value (empty array)
- `User[]` = TypeScript type (array of User objects)

**When you call `setUsers(newUsers)`:**
1. React updates the `users` value
2. React automatically re-renders components that use `users`
3. The UI updates to show the new data

**Example:**
```tsx
// Initial: users = []
setUsers([{ id: 1, name: "John", email: "john@example.com" }]);
// Now: users = [{ id: 1, name: "John", email: "john@example.com" }]
// React automatically updates the UI!
```

##### B. Effects with `useEffect`

```tsx
useEffect(() => {
  fetchUsers();
}, []);
```

**What it does:**
- Runs code **after** the component renders
- The empty array `[]` means "run only once when component first loads"
- Perfect for fetching data when the page loads

**Flow:**
1. Component renders (shows on screen)
2. `useEffect` runs
3. `fetchUsers()` is called
4. Users are fetched from API
5. `setUsers()` updates state
6. Component re-renders with users

##### C. Event Handlers

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Stop form from refreshing page
  // ... create user logic
};
```

**What happens:**
1. User clicks "Add User" button
2. Form submits
3. `handleSubmit` function runs
4. `e.preventDefault()` stops the page from refreshing
5. User is created via API
6. State updates
7. UI shows the new user

##### D. Props - Passing Data to Components

```tsx
<UserForm
  formData={formData}      // Pass current form values
  onSubmit={handleSubmit}  // Pass submit handler
  onChange={handleInputChange}  // Pass change handler
/>
```

**What this means:**
- `UserForm` is a child component
- We're passing 3 pieces of data to it (props)
- `UserForm` can use these props but can't change them directly
- This is "one-way data flow" - data flows down from parent to child

---

### 3. Components: Building Blocks

#### Component Example: `UserForm.tsx`

```tsx
interface UserFormProps {
  formData: UserRequest;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UserForm({ formData, onSubmit, onChange }: UserFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={formData.name}
        onChange={onChange}
      />
    </form>
  );
}
```

**Breaking it down:**

1. **Interface** (`UserFormProps`):
   - Defines what props this component expects
   - TypeScript ensures you pass the right data types

2. **Function Component**:
   - A component is just a function that returns JSX
   - `{ formData, onSubmit, onChange }` = destructuring props
   - Same as: `function UserForm(props) { props.formData }`

3. **JSX** (the return):
   - Looks like HTML but it's JavaScript
   - `value={formData.name}` = controlled input (React controls the value)
   - `onChange={onChange}` = when user types, call the onChange function

**Data Flow:**
```
User types "John" in input
  ↓
onChange is called with the event
  ↓
handleInputChange in App.tsx runs
  ↓
setFormData updates state
  ↓
formData.name = "John"
  ↓
UserForm re-renders with new value
  ↓
Input shows "John"
```

#### Component Example: `UserList.tsx`

```tsx
{users.map((user) => (
  <UserItem key={user.id} user={user} onDelete={onDelete} />
))}
```

**Key concepts:**

1. **`.map()`**: 
   - Transforms array into JSX elements
   - For each user, create a `<UserItem>` component

2. **`key={user.id}`**:
   - React needs a unique key for each item in a list
   - Helps React efficiently update the UI when list changes

3. **Conditional Rendering**:
```tsx
{loading ? (
  <div>Loading...</div>
) : users.length === 0 ? (
  <div>No users</div>
) : (
  users.map(...)
)}
```
- If loading, show "Loading..."
- Else if no users, show "No users"
- Else show the list

---

### 4. API Service: `services/api.ts`

```tsx
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  const result = await handleResponse<ApiResponse<User[]>>(response);
  return result.data;
}
```

**What it does:**
- Makes HTTP request to your backend
- `fetch()` is the browser's built-in function for API calls
- Returns a Promise (async operation)
- `async/await` makes it easier to work with Promises

**Usage in App.tsx:**
```tsx
const fetchedUsers = await getUsers(); // Wait for API response
setUsers(fetchedUsers); // Update state with results
```

---

## 🔄 Complete Data Flow Example

Let's trace what happens when you add a user:

### Step 1: User Types in Form
```
User types "John" in name field
  ↓
onChange event fires
  ↓
handleInputChange runs in App.tsx
  ↓
setFormData({ ...formData, name: "John" })
  ↓
formData state updates
  ↓
UserForm re-renders with new value
  ↓
Input shows "John"
```

### Step 2: User Clicks "Add User"
```
Form submits
  ↓
handleSubmit runs
  ↓
e.preventDefault() stops page refresh
  ↓
createUser(formData) API call
  ↓
POST /api/v1/users with { name: "John", email: "john@example.com" }
  ↓
Backend creates user, returns { id: 1, name: "John", email: "john@example.com" }
  ↓
setUsers([...users, newUser]) adds to array
  ↓
UserList re-renders
  ↓
New user appears in the list!
```

---

## 🎓 Key React Concepts Explained

### 1. **Components**
Functions that return JSX (HTML-like code)

```tsx
function MyComponent() {
  return <h1>Hello</h1>;
}
```

### 2. **Props**
Data passed from parent to child

```tsx
<MyComponent name="John" />  // name is a prop
```

### 3. **State**
Data that can change and triggers re-renders

```tsx
const [count, setCount] = useState(0);
setCount(1); // Updates count, component re-renders
```

### 4. **Effects**
Code that runs after rendering

```tsx
useEffect(() => {
  // This runs after component renders
}, []); // Empty array = run once
```

### 5. **Event Handlers**
Functions that respond to user actions

```tsx
<button onClick={() => doSomething()}>Click me</button>
```

### 6. **JSX**
JavaScript that looks like HTML

```tsx
const name = "John";
return <h1>Hello {name}</h1>; // Renders: Hello John
```

---

## 🧩 Component Hierarchy

```
App (manages state)
├── Header (just displays)
├── ErrorMessage (displays error if exists)
├── UserForm (form inputs, calls onSubmit/onChange)
└── UserList (displays users)
    └── UserItem (individual user, calls onDelete)
```

**Data Flow:**
- **Down**: App passes data via props
- **Up**: Child components call functions passed as props

---

## 💡 Common Patterns

### Pattern 1: Controlled Inputs
```tsx
<input
  value={formData.name}        // Value comes from state
  onChange={handleChange}       // Update state when user types
/>
```

### Pattern 2: Conditional Rendering
```tsx
{error && <ErrorMessage message={error} />}
// Only shows if error exists
```

### Pattern 3: List Rendering
```tsx
{users.map(user => (
  <UserItem key={user.id} user={user} />
))}
```

### Pattern 4: Async Operations
```tsx
const fetchData = async () => {
  try {
    const data = await getUsers();
    setUsers(data);
  } catch (err) {
    setError(err.message);
  }
};
```

---

## 🎯 Practice Exercises

### Exercise 1: Add a Loading State
Add a loading spinner when fetching users.

**Hint:** You already have `loading` state! Just add a spinner component.

### Exercise 2: Add Edit Functionality
1. Add an "Edit" button to each user
2. When clicked, populate the form with that user's data
3. Change "Add User" to "Update User" when editing
4. Call an update API endpoint

### Exercise 3: Add Search
1. Add a search input
2. Filter users based on search term
3. Update the displayed list

---

## 📚 Next Steps

1. **React Official Docs**: https://react.dev
2. **React Hooks Guide**: https://react.dev/reference/react
3. **TypeScript + React**: https://react-typescript-cheatsheet.netlify.app/

---

## ❓ Common Questions

**Q: Why do we use `useState` instead of regular variables?**
A: Regular variables don't trigger re-renders. `useState` tells React "when this changes, update the UI!"

**Q: What's the difference between props and state?**
A: Props come from parent, state is managed inside the component. Props flow down, state stays local.

**Q: Why do we need `key` in lists?**
A: React uses keys to efficiently update the DOM. Without keys, React might update the wrong elements.

**Q: What's the `!` in `document.getElementById('root')!`?**
A: TypeScript operator that says "I'm sure this isn't null". The root element always exists in our HTML.

---

## 🎉 You're Ready!

You now understand:
- ✅ How React components work
- ✅ How state and props flow
- ✅ How to structure a React app
- ✅ How to make API calls
- ✅ How events and handlers work

Try modifying the code and see what happens! Experimentation is the best way to learn.
