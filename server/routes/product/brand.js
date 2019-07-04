const express = require('express');
const Brand = require('../../controllers/product/brand.js');

const validateToken = require('../../utils').validateToken;

const brandRouter = express.Router();
brandRouter.route('/list').get(validateToken, Brand.all);
module.exports = brandRouter;
