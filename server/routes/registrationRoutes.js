const express = require('express');
const { createRegistration, getRegistrations, getMyRegistrations } = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createRegistration);
router.get('/my', protect, getMyRegistrations);
router.get('/', protect, getRegistrations);

module.exports = router;
