const express = require('express');
const { getEvents, createEvent, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;
