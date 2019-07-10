const express = require('express')
const Staff = require('../../controllers/franchise/staff.js');

const validateToken = require('../../utils').validateToken;

const staffRouter = express.Router();

staffRouter.route("/register").post(validateToken, Staff.register);
// userRouter.route("/update").post(validateToken, User.update);
staffRouter.route("/list").get(validateToken, Staff.all);
// userRouter.route("/getUniqueNames").get(validateToken, User.getUniqueNames);

module.exports = staffRouter;