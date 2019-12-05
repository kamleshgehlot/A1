const express = require('express');
const StaticContent = require('../controllers/staticContent');

const validateToken = require('../utils').validateToken;

const StaticContentRouter = express.Router();

StaticContentRouter.route('/getWeekDayList').get(validateToken, StaticContent.getWeekDayList);
StaticContentRouter.route('/getPaymentModeList').get(validateToken, StaticContent.getPaymentModeList);

module.exports = StaticContentRouter;
