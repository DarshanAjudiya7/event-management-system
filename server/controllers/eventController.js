const Event = require('../models/Event');
const defaultEvents = require('../data/defaultEvents');
const ensureDefaultEvents = require('../utils/ensureDefaultEvents');

const formatFallbackEvents = () => defaultEvents.map((event, index) => ({
  ...event,
  _id: `fallback-event-${index + 1}`,
}));

exports.createEvent = async (req, res) => {
  const { title, description, date, status, image, totalRegistrations, maxRegistrations } = req.body;
  try {
    const event = await Event.create({
      title,
      description,
      date,
      status,
      image,
      totalRegistrations: totalRegistrations || 0,
      maxRegistrations: maxRegistrations || 50
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    await ensureDefaultEvents();
    const events = await Event.find({}).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error('Falling back to default events:', error.message);
    res.json(formatFallbackEvents());
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) res.json(event);
    else res.status(404).json({ message: 'Event not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      await event.deleteOne();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
