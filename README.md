# Event Management System

A full-stack event management platform built with React, Express, and MongoDB.

## Features

- Dynamic events page with live, upcoming, and past states
- Student event registration flow
- Admin-only dashboard for creating, editing, and deleting events
- Responsive frontend built with Vite, Tailwind CSS, and Framer Motion
- Express and MongoDB backend with JWT authentication

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Axios, React Router
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose

## Local Setup

### 1. Install dependencies

```bash
npm run install-all
```

### 2. Configure environment variables

Create `server/.env` from [server/.env.example](/e:/event-management-system/server/.env.example).

Create `client/.env` from [client/.env.example](/e:/event-management-system/client/.env.example) if you want to point the frontend at a custom backend URL.

### 3. Seed sample events

```bash
cd server
node seed.js
```

### 4. Run locally

```bash
npm run dev
```

Frontend runs at `http://localhost:5173` and backend runs at `http://localhost:5000`.

## Deployment

### Frontend

Deploy the `client` folder to Vercel and set:

```bash
VITE_API_URL=https://your-backend-domain.com
```

### Backend

Deploy the `server` folder to your Node host and set:

```bash
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-strong-jwt-secret
CLIENT_URL=https://your-frontend-domain.vercel.app
ADMIN_NAME=Your Name
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-strong-admin-password
SEED_DEFAULT_EVENTS=true
```

When the backend starts, it automatically creates or syncs that admin account and ensures the default Supabase, Git/GitHub, and GitHub Copilot events exist in the database.
