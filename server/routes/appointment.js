const express = require('express')
const Appointment = require('../controllers/appointment.js');

const validateToken = require('../utils').validateToken;

const appointmentRouter = express.Router();

// appointmentRouter.route("/register").post(validateToken, Appointment.register);
appointmentRouter.route("/getCurrentTimeslot").post(validateToken, Appointment.getCurrentTimeslot);
appointmentRouter.route("/handleLeave").post(validateToken, Appointment.handleLeave);
appointmentRouter.route("/membersList").get(validateToken, Appointment.membersList);
appointmentRouter.route("/addNewTimeslot").post(validateToken, Appointment.addNewTimeslot);

module.exports = appointmentRouter;