const express = require('express');
const { createBooking, getMyBookings, getAllBookings } = require('../controllers/bookingController');
const { protect, optionalProtect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', optionalProtect, createBooking);
router.get('/myBookings', protect, getMyBookings);
router.get('/allBookings', protect, admin, getAllBookings);

module.exports = router;
