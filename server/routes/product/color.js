const express = require('express');
const Color = require('../../controllers/product/color.js');

const validateToken = require('../../utils').validateToken;

const colorRouter = express.Router();
colorRouter.route('/list').get(validateToken, Color.all);
module.exports = colorRouter;
