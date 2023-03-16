const express = require('express');
const router = express.Router({mergeParams: true});

const {getAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment} = require('../controllers/appointments');
const {protect} = require('../middleware/auth');

router.route('/').get(protect, getAppointments).post(addAppointment);
router.route('/:id').get(getAppointment).put(updateAppointment).delete(deleteAppointment);

module.exports = router;