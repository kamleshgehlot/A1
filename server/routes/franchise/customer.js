const express = require('express')
const Customer = require('../../controllers/franchise/customer.js');

const validateToken = require('../../utils').validateToken;

const customerRouter = express.Router();

customerRouter.route("/register").post(validateToken, Customer.register);
customerRouter.route("/list").get(validateToken, Customer.all);
customerRouter.route("/idtype/list").get(validateToken, Customer.getidtypelist);
// userRouter.route("/getUniqueNames").get(validateToken, User.getUniqueNames);

module.exports = customerRouter;