# Eventify

Eventify is a full-stack event management website built with React, Vite, Express, and MongoDB. It lets visitors browse events, register for upcoming sessions, and view registration history in a clean dashboard-style interface.

## Overview

This project includes:

- a `client` app built with React + Vite
- a `server` API built with Express + Mongoose
- built-in default events that are automatically ensured when events are requested
- registration storage in MongoDB for upcoming events

The current version does not use login or signup on the frontend. Visitors can browse events and register directly by filling out the registration form.

## Features

- Browse all events from a modern Events page
- Filter events by `All Events`, `Upcoming`, and `Past`
- View default built-in events even if the backend is temporarily unavailable
- Register for upcoming events using:
  - `Name`
  - `College ID`
  - `Year`
  - `Branch`
- Prevent duplicate registrations for the same `College ID` and event
- Show total registration counts on event cards and in the dashboard
- Public dashboard with:
  - `Events Library`
  - `Student Directory`
- Responsive blue-and-white UI with Framer Motion animations

## Built-In Events

The backend automatically ensures these events:

1. `Git/Github`
   Status: `past`
   Registrations: `55`

2. `Supabase`
   Status: `past`
   Registrations: `72`

3. `Web Development Bootcamp`
   Status: `upcoming`
   Registrations: `0` initially

These default events are defined in:

- [server/data/defaultEvents.js](/e:/event-management-system/server/data/defaultEvents.js)

They are ensured through:

- [server/utils/ensureDefaultEvents.js](/e:/event-management-system/server/utils/ensureDefaultEvents.js)
- [server/controllers/eventController.js](/e:/event-management-system/server/controllers/eventController.js)

## Tech Stack

Frontend:

- React 18
- Vite
- React Router
- Axios
- Framer Motion
- Tailwind CSS
- Lucide React

Backend:

- Node.js
- Express
- MongoDB
- Mongoose

## Project Structure

```text
event-management-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── package.json
└── README.md
```

## Getting Started

### 1. Install dependencies

From the project root:

```bash
npm run install-all
```

### 2. Add backend environment variables

Create `server/.env` and add:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
NODE_ENV=development
```

Note:

- `JWT_SECRET` is still used by the backend auth code that exists in the API layer.
- The frontend no longer uses login/signup screens.

### 3. Start the app

Run both frontend and backend together:

```bash
npm run dev
```

Or start them separately:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

### 4. Open the app

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Summary

Main routes:

- `GET /api/events`
  Returns events from MongoDB, and falls back to built-in events if needed

- `GET /api/events/:id`
  Returns a single event

- `POST /api/registrations`
  Creates a registration for an upcoming event

- `GET /api/registrations`
  Returns all registrations for the dashboard

## Registration Rules

- Past events cannot be registered
- Upcoming events can be registered
- Each `College ID` can register only once per event
- Successful registrations are stored in MongoDB
- `totalRegistrations` increases after each successful registration

## Important Files

Frontend:

- [client/src/pages/Events.jsx](/e:/event-management-system/client/src/pages/Events.jsx)
- [client/src/pages/Dashboard.jsx](/e:/event-management-system/client/src/pages/Dashboard.jsx)
- [client/src/components/EventCard.jsx](/e:/event-management-system/client/src/components/EventCard.jsx)
- [client/src/data/defaultEvents.js](/e:/event-management-system/client/src/data/defaultEvents.js)

Backend:

- [server/server.js](/e:/event-management-system/server/server.js)
- [server/controllers/eventController.js](/e:/event-management-system/server/controllers/eventController.js)
- [server/controllers/registrationController.js](/e:/event-management-system/server/controllers/registrationController.js)
- [server/models/Event.js](/e:/event-management-system/server/models/Event.js)
- [server/models/Registration.js](/e:/event-management-system/server/models/Registration.js)
- [server/routes/registrationRoutes.js](/e:/event-management-system/server/routes/registrationRoutes.js)

## Deployment Notes

Recommended setup:

- deploy `client` to Vercel
- deploy `server` to Render or Railway
- use a hosted MongoDB connection string in `MONGO_URI`

For Vercel frontend env:

```env
VITE_API_URL=https://your-backend-domain.com
```

If your backend is offline, the frontend still shows built-in event cards so the UI does not look empty.

## Scripts

Root:

```bash
npm run dev
npm run install-all
```

Server:

```bash
npm run dev
npm start
```

Client:

```bash
npm run dev
npm run build
npm run preview
```

## Contact

- Email: `ajudiya7106@gmail.com`
- Phone: `9316099633`
