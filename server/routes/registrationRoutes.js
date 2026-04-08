const express = require('express');
const { createRegistration, getRegistrations, getMyRegistrations } = require('../controllers/registrationController');
const router = express.Router();

router.post('/', createRegistration);
router.get('/my', getMyRegistrations);
router.get('/', getRegistrations);

module.exports = router;
