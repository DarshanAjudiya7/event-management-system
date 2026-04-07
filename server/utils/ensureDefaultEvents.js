const Event = require('../models/Event');
const Registration = require('../models/Registration');
const defaultEvents = require('../data/defaultEvents');

const makeRegistrationDocs = (eventId, count, title) => {
  return Array.from({ length: count }, (_, index) => ({
    name: `${title} Attendee ${index + 1}`,
    email: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}@example.com`,
    phone: `900000${String(index + 1).padStart(4, '0')}`,
    eventId
  }));
};

const ensureDefaultEvents = async () => {
  if (process.env.SEED_DEFAULT_EVENTS === 'false') {
    console.log('Default event seeding skipped.');
    return;
  }

  for (const item of defaultEvents) {
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

    const existingCount = await Registration.countDocuments({ eventId: event._id });

    if (item.registrations > existingCount) {
      await Registration.insertMany(
        makeRegistrationDocs(event._id, item.registrations - existingCount, item.title)
      );
    }
  }

  console.log('Default events ensured successfully.');
};

module.exports = ensureDefaultEvents;
