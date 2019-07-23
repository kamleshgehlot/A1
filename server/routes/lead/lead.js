const express = require('express');
const Lead = require('../../controllers/lead/lead.js');

const validateToken = require('../../utils').validateToken;

const taskRouter = express.Router();

taskRouter.route('/add').post(validateToken, Lead.add);
taskRouter.route('/list').get(validateToken, Lead.all);
taskRouter.route('/last').get(validateToken, Lead.last);
module.exports = taskRouter;