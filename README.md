## Chat Application

A real-time chat application built with **React (Vite)** on the frontend and **Node.js / Express / Socket.IO / MongoDB** on the backend.  
Supports user authentication, online status, and real-time messaging.

---

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, DaisyUI, React Router, Zustand, Socket.IO client
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.IO, JWT, bcrypt
- **Auth**: Cookie-based JWT authentication
- **Realtime**: Socket.IO for live messaging and online users
- **Styling**: Tailwind CSS + DaisyUI

---

## Features

- **User authentication**: Signup, login, logout
- **Profile avatars**: Deterministic avatars (DiceBear) based on user identity
- **Conversations**: List of users, online indicator via websockets
- **Messaging**:
  - Send/receive messages in real time
  - Auto-scroll to latest message
  - Long messages wrap automatically without breaking layout
- **Notifications**:
  - New message sound effect
  - Message “shake” animation for emphasis

---

## Project Structure

- **backend/**
  - `server.js` – Express app, API routes, CORS, MongoDB connection, Socket.IO server
  - `socket/socket.js` – Socket.IO configuration and events
  - `controllers/` – Auth, user, and message controllers
  - `models/` – Mongoose models for User, Message, Conversation
  - `routes/` – Express routes (`/api/auth`, `/api/users`, `/api/messages`)
  - `db/connectToMongoDB.js` – MongoDB connection logic
  - `utils/` – JWT utilities, time extraction, etc.
- **frontend/**
  - `vite.config.js` – Vite config + dev proxy for `/api` and `/socket.io`
  - `src/main.jsx` – App entry
  - `src/App.jsx` – Routes (login, signup, home)
  - `src/context/` – Auth context, Socket context
  - `src/hooks/` – Custom hooks for auth, conversations, messages
  - `src/components/` – UI components (sidebar, messages, skeletons, etc.)
  - `src/zustand/` – Zustand store for conversation state
  - `src/assets/sounds/` – Notification sound

---

## Environment Variables

Create a `.env` file in the **project root** (not committed to git).  
Use this as a safe template (do **not** commit actual secrets):

# backend
PORT=5000
MONGO_DB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development

# CORS / frontend origin (for production)
# e.g. https://your-chat-app.vercel.app
CLIENT_URL=http://localhost:5173

# frontend (Vite) – create frontend/.env or set in Vercel
# Base URL of the backend API (no trailing slash)
VITE_API_BASE_URL=http://localhost:5000

# Socket.IO server URL (usually same as backend)
VITE_SOCKET_URL=http://localhost:5000
