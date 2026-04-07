const express = require('express');
const { createRegistration, getRegistrations, getMyRegistrations } = require('../controllers/registrationController');
const { protect, optionalProtect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', optionalProtect, createRegistration);
router.get('/my', protect, getMyRegistrations);
router.get('/', optionalProtect, getRegistrations);

module.exports = router;
