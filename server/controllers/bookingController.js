const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const { eventId } = req.body;
  try {
    const bookingExists = await Booking.findOne({ userId: req.user._id, eventId });
    if (bookingExists) return res.status(400).json({ message: 'Already booked for this event' });

    const booking = await Booking.create({ userId: req.user._id, eventId });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate('eventId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('userId', 'name email').populate('eventId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
