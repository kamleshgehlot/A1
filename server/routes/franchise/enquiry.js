const express = require('express')
const Enquiry = require('../../controllers/franchise/enquiry.js');

const validateToken = require('../../utils').validateToken;

const enquiryRouter = express.Router();

enquiryRouter.route("/getnewid").get(validateToken, Enquiry.getnewid);

module.exports = enquiryRouter;