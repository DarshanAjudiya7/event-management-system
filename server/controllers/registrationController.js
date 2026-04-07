const Event = require('../models/Event');
const Registration = require('../models/Registration');

exports.createRegistration = async (req, res) => {
  const { name, collegeId, year, branch, eventId } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status !== 'upcoming') {
      return res.status(400).json({ message: 'Registration closed for this event' });
    }

    const existingRegistration = await Registration.findOne({
      userId: req.user._id,
      eventId
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }

    const registration = await Registration.create({
      name,
      collegeId,
      year,
      branch,
      userId: req.user._id,
      eventId
    });

    event.totalRegistrations += 1;
    await event.save();

    res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({})
      .populate('eventId', 'title date status')
      .populate('userId', 'name email');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user._id }).populate('eventId', 'title');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
