const express = require('express');
const Category = require('../controllers/category.js');

const validateToken = require('../utils').validateToken;

const categoryRouter = express.Router();

categoryRouter.route('/add').post(validateToken, Category.add);
categoryRouter.route('/addcategory').post(validateToken, Category.addcategory);
categoryRouter.route('/addsubcategory').post(validateToken, Category.addsubcategory);
categoryRouter.route('/addproduct').post(validateToken, Category.addproduct);
categoryRouter.route('/productlist').get(validateToken, Category.productlist);
categoryRouter.route('/edit').post(validateToken, Category.edit);
categoryRouter.route('/list').get(validateToken, Category.all);
module.exports = categoryRouter;
