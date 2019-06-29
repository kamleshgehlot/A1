const express = require('express');
const Category = require('../controllers/category.js');

const validateToken = require('../utils').validateToken;

const categoryRouter = express.Router();

categoryRouter.route('/add').post(validateToken, Category.add);

categoryRouter.route('/list').get(validateToken, Category.all);
module.exports = categoryRouter;
