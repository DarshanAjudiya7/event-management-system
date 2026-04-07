const Event = require('../models/Event');
const Registration = require('../models/Registration');

exports.createRegistration = async (req, res) => {
  const { name, collegeId, year, branch, eventId } = req.body;
  console.log('Registration Request received:', { name, collegeId, year, branch, eventId });
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      console.log('Event not found for ID:', eventId);
      return res.status(404).json({ message: 'Event not found' });
    }
    console.log('Event found:', event.title);

    if (event.status !== 'upcoming') {
      return res.status(400).json({ message: 'Registration closed for this event' });
    }

    const existingRegistration = await Registration.findOne({
      collegeId,
      eventId
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'A registration for this student ID already exists for this event' });
    }

    const registrationData = {
      name,
      collegeId,
      year,
      branch,
      eventId
    };

    if (req.user) {
      registrationData.userId = req.user._id;
    }

    const registration = await Registration.create(registrationData);

    event.totalRegistrations += 1;
    await event.save();

    res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A registration for this student ID already exists for this event' });
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
    if (!req.user) {
      return res.json([]);
    }
    const registrations = await Registration.find({ userId: req.user._id }).populate('eventId', 'title');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
