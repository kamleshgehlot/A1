const express = require('express')
const Order = require('../../controllers/franchise/order.js');

const validateToken = require('../../utils').validateToken;

const orderRouter = express.Router();

orderRouter.route("/getnewid").get(validateToken, Order.getnewid);
orderRouter.route("/getall").get(validateToken, Order.getAll);
// orderRouter.route("/getall").get(validateToken, Enquiry.getAll);
// orderRouter.route("/convertedList").get(validateToken, Enquiry.convertedList);
// orderRouter.route("/convert").post(validateToken, Enquiry.convert);
orderRouter.route("/postorder").post(validateToken, Order.postOrder);

module.exports = orderRouter;