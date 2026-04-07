const Event = require('../models/Event');
const Registration = require('../models/Registration');

const attachRegistrationCounts = async (events) => {
  const eventList = Array.isArray(events) ? events : [events];

  if (eventList.length === 0) {
    return Array.isArray(events) ? [] : null;
  }

  const eventIds = eventList.map((event) => event._id);
  const registrationCounts = await Registration.aggregate([
    { $match: { eventId: { $in: eventIds } } },
    { $group: { _id: '$eventId', count: { $sum: 1 } } }
  ]);

  const countMap = new Map(
    registrationCounts.map((item) => [String(item._id), item.count])
  );

  const withCounts = eventList.map((event) => ({
    ...event,
    registrationCount: countMap.get(String(event._id)) || 0
  }));

  return Array.isArray(events) ? withCounts : withCounts[0];
};

exports.createEvent = async (req, res) => {
  const { title, description, date, status, image } = req.body;
  try {
    const event = await Event.create({ title, description, date, status, image });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: -1 }).lean();
    const eventsWithCounts = await attachRegistrationCounts(events);
    res.json(eventsWithCounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    if (event) {
      const eventWithCount = await attachRegistrationCounts(event);
      res.json(eventWithCount);
    }
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
