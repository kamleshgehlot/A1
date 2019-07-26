const express = require('express');
const Lead = require('../../controllers/lead/lead.js');

const validateToken = require('../../utils').validateToken;

const leadRouter = express.Router();

leadRouter.route('/add').post(validateToken, Lead.add);
leadRouter.route('/list').get(validateToken, Lead.all);
leadRouter.route('/last').get(validateToken, Lead.last);
leadRouter.route('/addComment').post(validateToken, Lead.addComment);
leadRouter.route('/allComment').post(validateToken, Lead.allComment);
module.exports = leadRouter;