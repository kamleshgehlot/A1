const express = require('express');
const Report = require('../controllers/Report');

const validateToken = require('../utils').validateToken;

const ReportRouter = express.Router();

// ReportRouter.route('/getAll').get(validateToken, Location.getAll);
ReportRouter.route('/financeOrderReport').post(validateToken, Report.financeOrderReport);
ReportRouter.route('/getOrderReport').post(validateToken, Report.getOrderReport);

module.exports = ReportRouter;
