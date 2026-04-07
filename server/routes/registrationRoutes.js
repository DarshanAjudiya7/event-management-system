const express = require('express');
const { createRegistration, getRegistrations } = require('../controllers/registrationController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createRegistration);
router.get('/', protect, admin, getRegistrations);

module.exports = router;
