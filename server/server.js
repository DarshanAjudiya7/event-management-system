const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const ensureDefaultEvents = require('./utils/ensureDefaultEvents');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.MONGO_DB_NAME || 'test';

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: DB_NAME,
  serverSelectionTimeoutMS: 5000,
})
  .then(async () => {
    console.log(`MongoDB connected successfully to database: ${DB_NAME}`);
    await ensureDefaultEvents();
    console.log('Default events ensured successfully');
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/register', registrationRoutes);
app.use('/api/registrations', registrationRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Event Management System API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
