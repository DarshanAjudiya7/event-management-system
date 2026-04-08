const Event = require('../models/Event');
const Registration = require('../models/Registration');
const mongoose = require('mongoose');

let legacyIndexChecked = false;

const ensureLegacyIndexRemoved = async () => {
  if (legacyIndexChecked) return;

  try {
    const indexes = await Registration.collection.indexes();
    const duplicateIndex = indexes.find((index) => index.name === 'collegeId_1_eventId_1');

    if (duplicateIndex) {
      await Registration.collection.dropIndex('collegeId_1_eventId_1');
    }
  } catch (error) {
    // Ignore if the collection or index does not exist yet.
  } finally {
    legacyIndexChecked = true;
  }
};

exports.createRegistration = async (req, res) => {
  const { name, collegeId, year, branch, eventId, eventTitle } = req.body;

  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Registration is temporarily unavailable. Please try again in a moment.' });
    }

    await ensureLegacyIndexRemoved();

    if (!name || !collegeId || !year || !branch || !eventId) {
      return res.status(400).json({ message: 'Please fill all registration fields' });
    }

    let event = null;

    if (mongoose.isValidObjectId(eventId)) {
      event = await Event.findById(eventId);
    }

    if (!event && eventTitle) {
      event = await Event.findOne({ title: eventTitle });
    }

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status !== 'upcoming') {
      return res.status(400).json({ message: 'Registration closed for this event' });
    }

    const registration = await Registration.create({
      name,
      collegeId,
      year,
      branch,
      eventId: event._id
    });

    event.totalRegistrations += 1;
    await event.save();

    res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }

    const registrations = await Registration.find({}).populate('eventId', 'title date status');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyRegistrations = async (req, res) => {
  res.json([]);
};
