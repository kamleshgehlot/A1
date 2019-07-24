const express = require('express');
const Category = require('../controllers/category.js');

const validateToken = require('../utils').validateToken;

const categoryRouter = express.Router();

categoryRouter.route('/add').post(validateToken, Category.add);
categoryRouter.route('/addCategory').post(validateToken, Category.addCategory);
categoryRouter.route('/addSubCategory').post(validateToken, Category.addSubCategory);
categoryRouter.route('/addProduct').post(validateToken, Category.addProduct);
categoryRouter.route('/productList').get(validateToken, Category.productList);
categoryRouter.route('/edit').post(validateToken, Category.edit);
categoryRouter.route('/list').get(validateToken, Category.all);
categoryRouter.route('/archivedList').get(validateToken, Category.archivedList);

module.exports = categoryRouter;