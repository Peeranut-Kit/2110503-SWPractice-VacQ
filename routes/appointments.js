const express = require('express');
const router = express.Router({mergeParams: true});

const {getAppointments} = require('../controllers/appointments');
const {protect} = require('../middleware/auth');

router.route('/').get(protect, getAppointments);

module.exports = router;