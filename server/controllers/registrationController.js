const Event = require('../models/Event');
const Registration = require('../models/Registration');
const mongoose = require('mongoose');
const ensureRegistrationIndexes = require('../utils/ensureRegistrationIndexes');

exports.createRegistration = async (req, res) => {
  const { name, collegeId, year, branch, eventId, eventTitle } = req.body;
  let reservedSeat = false;

  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Registration is temporarily unavailable. Please try again in a moment.' });
    }

    await ensureRegistrationIndexes();

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

    const maxRegistrations = event.maxRegistrations || 50;

    const reservedEvent = await Event.findOneAndUpdate(
      {
        _id: event._id,
        status: 'upcoming',
        totalRegistrations: { $lt: maxRegistrations }
      },
      {
        $inc: { totalRegistrations: 1 }
      },
      { new: true }
    );

    if (!reservedEvent) {
      return res.status(400).json({ message: `Registration is full. Only ${maxRegistrations} students can register for this event.` });
    }

    reservedSeat = true;

    const registration = await Registration.create({
      name: name.trim(),
      collegeId: collegeId.trim().toLowerCase(),
      year,
      branch: branch.trim(),
      eventId: event._id
    });

    res.status(201).json({
      message: 'Registration successful',
      registration,
      event: {
        _id: reservedEvent._id,
        totalRegistrations: reservedEvent.totalRegistrations,
        maxRegistrations: reservedEvent.maxRegistrations || maxRegistrations
      }
    });
  } catch (error) {
    if (reservedSeat && mongoose.connection.readyState === 1 && mongoose.isValidObjectId(eventId)) {
      await Event.findByIdAndUpdate(eventId, { $inc: { totalRegistrations: -1 } }).catch(() => null);
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
      return res.status(409).json({ message: 'This College ID is already registered for this event.' });
    }

    res.status(500).json({ message: error.message || 'Server error' });
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
