# Quick Start Guide

## Step-by-Step Instructions

### 1. Install Frontend Dependencies

Open a terminal and navigate to the frontend directory:

```bash
cd frontend
yarn install
```

**Note:** We use `yarn` for consistency with the backend. If you don't have yarn installed, you can install it with `npm install -g yarn`.

### 2. Start Your Backend Server

In a **separate terminal**, go back to the root directory and start your backend:

```bash
# From the root directory (not frontend/)
yarn dev
```

Your backend should now be running on `http://localhost:8080`

### 3. Start the React Frontend

In the **frontend directory**, start the development server:

```bash
# Make sure you're in the frontend/ directory
yarn dev
```

The frontend will start on `http://localhost:3000`

### 4. Open in Browser

Open your browser and go to: `http://localhost:3000`

You should see the User Management interface!

## What You'll See

- A header with "User Management"
- A form to add new users (name and email)
- A list of all users
- Delete buttons for each user

## Try It Out!

1. **Add a user**: Fill in the form and click "Add User"
2. **View users**: See your users appear in the list below
3. **Delete a user**: Click the "Delete" button next to any user

## Troubleshooting

**"Failed to fetch users" error:**
- Make sure your backend is running on port 8080
- Check the terminal where you ran `yarn dev` for any errors

**Port 3000 already in use:**
- Vite will automatically try the next available port (3001, 3002, etc.)
- Check the terminal output for the actual port number

**Can't install packages:**
- Make sure you have Node.js installed (version 16 or higher)
- Make sure you have yarn installed: `npm install -g yarn`
- Try deleting `node_modules` and `yarn.lock` and running `yarn install` again

## Next Steps

Once you have it running, check out:
- `src/App.tsx` - The main component with detailed comments
- `src/services/api.ts` - How we communicate with the backend
- `README.md` - More detailed explanations of React concepts

