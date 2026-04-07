const Registration = require('../models/Registration');

exports.createRegistration = async (req, res) => {
  const { name, email, phone, eventId } = req.body;
  try {
    const registration = await Registration.create({ name, email, phone, eventId });
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({}).populate('eventId', 'title date');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
