const express = require('express')
const Order = require('../../controllers/franchise/order.js');
const multer = require('multer');
const validateToken = require('../../utils').validateToken;

const orderRouter = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, callback) {

    // if (process.env.NODE_ENV === 'development') {
      callback(null, './files/order');
    // } else {
    //   callback(null, './build/');
    // }
  },
  filename: function (req, file, callback) {

    // if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      
      callback(null, file.originalname.split('.')[0] + "_" + Date.now() + '.' + file.originalname.split('.')[1]);
    // }
  }
});

const upload = multer({ storage: storage });

orderRouter.route("/uploaddoc").post(validateToken, upload.array('avatar'), Order.uploadDoc);
orderRouter.route("/getnewid").get(validateToken, Order.getnewid);
orderRouter.route("/getall").get(validateToken, Order.getAll);
orderRouter.route("/getbudget").post(validateToken, Order.getBudget);
orderRouter.route("/getoldbudget").post(validateToken, Order.getExistingBudget);
orderRouter.route("/getfixedorder").post(validateToken, Order.getFixedOrder);
orderRouter.route("/getflexorder").post(validateToken, Order.getFlexOrder);
orderRouter.route("/editorder").post(validateToken, Order.editOrder);
orderRouter.route("/assigntofinance").post(validateToken, Order.assignToFinance);

// orderRouter.route("/getall").get(validateToken, Enquiry.getAll);
// orderRouter.route("/convertedList").get(validateToken, Enquiry.convertedList);
// orderRouter.route("/convert").post(validateToken, Enquiry.convert);
orderRouter.route("/postorder").post(validateToken, Order.postOrder);

module.exports = orderRouter;