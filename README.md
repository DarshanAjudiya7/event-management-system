# Event Management System 🚀

A modern, full-stack event management platform built with React, Express, and MongoDB.

## Features ✨

*   **Dynamic Events Page**: Explore Past, Live, and Upcoming events with real-time filtering.
*   **Student Registration**: Clean, secure registration modal with instant feedback.
*   **Premium Design**: Blue and White theme with smooth animations from Framer Motion.
*   **Responsive UI**: Fully mobile-optimized layouts for all pages.
*   **MVC Architecture**: Clean, scalable backend following professional patterns.
*   **Lucide Icons**: High-quality SVG icons throughout the platform.

## Tech Stack 🛠️

*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios, React Router.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose).

## Setup Instructions 📝

### 1. Database Configuration
Ensure you have MongoDB running locally or provide a cloud connection string in `server/.env`.

### 2. Install Dependencies
Open your terminal and run:
```bash
# In the root directory
npm run install-all
```
*(Optionally run separately: `cd server && npm install`, then `cd client && npm install`)*

### 3. Seed Sample Data
Populate your database with sample events:
```bash
cd server
node seed.js
```

### 4. Run the Application
Start both the client and server concurrently from the root:
```bash
npm run dev
```

The application will be available at:
*   Frontend: [http://localhost:5173](http://localhost:5173)
*   Backend: [http://localhost:5000](http://localhost:5000)

## Design Palette 🎨

*   **Primary**: Blue (#2563eb)
*   **Background**: White (#ffffff)
*   **Text**: Slate (#1e293b)
*   **Accents**: Indigo & Emerald for status indicators

---
**Contact Dev**: ajudiya7106@gmail.com | 9316099633
