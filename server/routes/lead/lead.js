const express = require('express');
const Lead = require('../../controllers/lead/lead.js');

const validateToken = require('../../utils').validateToken;

const leadRouter = express.Router();

leadRouter.route('/add').post(validateToken, Lead.add);
leadRouter.route('/list').get(validateToken, Lead.all);
leadRouter.route('/last').get(validateToken, Lead.last);
leadRouter.route('/comment').post(validateToken, Lead.comment);
module.exports = leadRouter;