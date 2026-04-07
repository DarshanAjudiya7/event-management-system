const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Event = require('./models/Event');
const Registration = require('./models/Registration');

dotenv.config({ path: path.join(__dirname, '.env') });

const requestedEvents = [
  {
    title: 'Supabase Launch Recap',
    description: 'A past community event covering Supabase authentication, storage, edge functions, and full-stack app deployment patterns.',
    date: new Date('2026-02-12T10:00:00Z'),
    status: 'past',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1170&q=80',
    registrations: 52
  },
  {
    title: 'Git & GitHub Collaboration Workshop',
    description: 'A past hands-on session on branching, pull requests, review workflows, and practical GitHub collaboration for teams.',
    date: new Date('2026-03-08T11:00:00Z'),
    status: 'past',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1170&q=80',
    registrations: 77
  },
  {
    title: 'GitHub Copilot Productivity Session',
    description: 'An upcoming event focused on using GitHub Copilot for faster coding, debugging, refactoring, and team workflows.',
    date: new Date('2026-05-24T12:30:00Z'),
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1170&q=80',
    registrations: 0
  }
];

const makeRegistrationDocs = (eventId, count, title) => {
  return Array.from({ length: count }, (_, index) => ({
    name: `${title} Attendee ${index + 1}`,
    email: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}@example.com`,
    phone: `900000${String(index + 1).padStart(4, '0')}`,
    eventId
  }));
};

const upsertRequestedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    for (const item of requestedEvents) {
      const event = await Event.findOneAndUpdate(
        { title: item.title },
        {
          title: item.title,
          description: item.description,
          date: item.date,
          status: item.status,
          image: item.image
        },
        { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true }
      );

      await Registration.deleteMany({ eventId: event._id });

      if (item.registrations > 0) {
        const registrations = makeRegistrationDocs(event._id, item.registrations, item.title);
        await Registration.insertMany(registrations);
      }

      console.log(`${item.title}: synced with ${item.registrations} registrations.`);
    }

    console.log('Requested events are ready.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to sync requested events:', error);
    process.exit(1);
  }
};

upsertRequestedEvents();
