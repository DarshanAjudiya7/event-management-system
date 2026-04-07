const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const ensureDefaultEvents = require('./utils/ensureDefaultEvents');

dotenv.config({ path: path.join(__dirname, '.env') });

const syncRequestedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');
    await ensureDefaultEvents();
    console.log('Requested events are ready.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to sync requested events:', error);
    process.exit(1);
  }
};

syncRequestedEvents();
