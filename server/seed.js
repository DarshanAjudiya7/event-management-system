const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');
const Registration = require('./models/Registration');

dotenv.config();

const events = [
  {
    title: 'Git/GitHub Workshop',
    description: 'A completed hands-on workshop covering Git basics, branching strategies, pull requests, and practical GitHub collaboration workflows.',
    date: new Date('2026-02-14T10:00:00Z'),
    status: 'past',
    totalRegistrations: 55,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'Supabase Workshop',
    description: 'A completed workshop focused on authentication, PostgreSQL, storage, edge functions, and building full-stack apps with Supabase.',
    date: new Date('2026-03-12T11:30:00Z'),
    status: 'past',
    totalRegistrations: 72,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'Web Development Bootcamp',
    description: 'An upcoming bootcamp designed to help students sharpen their React, Express, MongoDB, and deployment skills through project-based sessions.',
    date: new Date('2026-05-20T09:30:00Z'),
    status: 'upcoming',
    totalRegistrations: 0,
    image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1170&q=80'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Registration.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared old events and registrations.');

    await Event.insertMany(events);
    console.log('Requested events seeded successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
