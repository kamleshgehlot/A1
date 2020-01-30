const express = require('express');
const Product = require('../controllers/productManager');

const validateToken = require('../utils').validateToken;

const ProductRouter = express.Router();
// ProductRouter.route('/getAll').get(validateToken, Location.getAll);
ProductRouter.route('/getTabRelatedRecord').post(validateToken, Product.getTabRelatedRecord);
ProductRouter.route('/getRentedOrder').post(validateToken, Product.getRentedOrder);

// ProductRouter.route('/getOrderReport').post(validateToken, Report.getOrderReport);
// ProductRouter.route('/getDeliveryReport').post(validateToken, Report.getDeliveryReport);
// //task report
// ProductRouter.route('/getTaskReport').post(validateToken, Report.getTaskReport);
// ProductRouter.route('/getDueTaskReport').post(validateToken, Report.getDueTaskReport);
module.exports = ProductRouter;
