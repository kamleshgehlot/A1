const express = require('express');
const Product = require('../controllers/productManager');

const validateToken = require('../utils').validateToken;

const ProductRouter = express.Router();
ProductRouter.route('/getProductState').get(validateToken, Product.getProductState);
ProductRouter.route('/getTabRelatedRecord').post(validateToken, Product.getTabRelatedRecord);
ProductRouter.route('/getRentedOrder').post(validateToken, Product.getRentedOrder);
ProductRouter.route('/changeProductState').post(validateToken, Product.changeProductState);

// ProductRouter.route('/getOrderReport').post(validateToken, Report.getOrderReport);
// ProductRouter.route('/getDeliveryReport').post(validateToken, Report.getDeliveryReport);
// //task report
// ProductRouter.route('/getTaskReport').post(validateToken, Report.getTaskReport);
// ProductRouter.route('/getDueTaskReport').post(validateToken, Report.getDueTaskReport);
module.exports = ProductRouter;
