const express = require('express');
const StaticContent = require('../controllers/staticContent');

const validateToken = require('../utils').validateToken;

const StaticContentRouter = express.Router();

StaticContentRouter.route('/getWeekDayList').get(validateToken, StaticContent.getWeekDayList);
StaticContentRouter.route('/getPaymentModeList').get(validateToken, StaticContent.getPaymentModeList);
StaticContentRouter.route('/getDiscountRateList').get(validateToken, StaticContent.getDiscountRateList);
StaticContentRouter.route('/updateDiscountRateList').post(validateToken, StaticContent.updateDiscountRateList);

module.exports = StaticContentRouter;
