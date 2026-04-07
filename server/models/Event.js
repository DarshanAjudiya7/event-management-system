const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['past', 'live', 'upcoming'], required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
