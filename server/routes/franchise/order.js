const express = require('express')
const Order = require('../../controllers/franchise/order.js');

const validateToken = require('../../utils').validateToken;

const orderRouter = express.Router();

orderRouter.route("/getnewid").get(validateToken, Order.getnewid);
orderRouter.route("/getall").get(validateToken, Order.getAll);
orderRouter.route("/getbudget").post(validateToken, Order.getBudget);
orderRouter.route("/getfixedorder").post(validateToken, Order.getFixedOrder);
orderRouter.route("/getflexorder").post(validateToken, Order.getFlexOrder);
orderRouter.route("/editorder").post(validateToken, Order.editOrder);

// orderRouter.route("/getall").get(validateToken, Enquiry.getAll);
// orderRouter.route("/convertedList").get(validateToken, Enquiry.convertedList);
// orderRouter.route("/convert").post(validateToken, Enquiry.convert);
orderRouter.route("/postorder").post(validateToken, Order.postOrder);

module.exports = orderRouter;