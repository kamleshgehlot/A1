const express = require('express')
const Appointment = require('../controllers/appointment.js');

const validateToken = require('../utils').validateToken;

const appointmentRouter = express.Router();

// appointmentRouter.route("/register").post(validateToken, Appointment.register);
appointmentRouter.route("/getCurrentTimeslot").post(validateToken, Appointment.getCurrentTimeslot);
appointmentRouter.route("/membersList").get(validateToken, Appointment.membersList);

module.exports = appointmentRouter;