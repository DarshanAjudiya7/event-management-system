const Event = require('../models/Event');
const defaultEvents = require('../data/defaultEvents');

const ensureDefaultEvents = async () => {
  for (const eventData of defaultEvents) {
    const existingEvent = await Event.findOne({ title: eventData.title });

    if (!existingEvent) {
      await Event.create(eventData);
      continue;
    }

    existingEvent.description = eventData.description;
    existingEvent.date = eventData.date;
    existingEvent.status = eventData.status;
    existingEvent.image = eventData.image;
    existingEvent.maxRegistrations = eventData.maxRegistrations || existingEvent.maxRegistrations || 50;

    if (eventData.status === 'past') {
      existingEvent.totalRegistrations = eventData.totalRegistrations;
    }

    await existingEvent.save();
  }
};

module.exports = ensureDefaultEvents;
