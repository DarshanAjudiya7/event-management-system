const express = require('express');
const { createBooking, getMyBookings, getAllBookings } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createBooking);
router.get('/myBookings', protect, getMyBookings);
router.get('/allBookings', protect, admin, getAllBookings);

module.exports = router;
