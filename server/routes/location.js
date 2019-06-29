const express = require('express');
const Location = require('../controllers/location');

const validateToken = require('../utils').validateToken;

const locationRouter = express.Router();

locationRouter.route('/getAll').get(validateToken, Location.getAll);

module.exports = locationRouter;
