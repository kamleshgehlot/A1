const express = require('express')
const Order = require('../../controllers/franchise/order.js');
const multer = require('multer');

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

const validateToken = require('../../utils').validateToken;

const orderRouter = express.Router();


orderRouter.route("/getnewid").get(validateToken, Order.getnewid);
orderRouter.route("/getall").get(validateToken, Order.getAll);


orderRouter.route("/uploaddoc").post(validateToken, upload.array('avatar'), Order.uploadDoc);
orderRouter.route("/getbudget").post(validateToken, Order.getBudget);
orderRouter.route("/getoldbudget").post(validateToken, Order.getExistingBudget);
orderRouter.route("/getfixedorder").post(validateToken, Order.getFixedOrder);
orderRouter.route("/getflexorder").post(validateToken, Order.getFlexOrder);
orderRouter.route("/editorder").post(validateToken, Order.editOrder);
orderRouter.route("/assigntofinance").post(validateToken, Order.assignToFinance);
orderRouter.route("/postorder").post(validateToken, Order.postOrder);
orderRouter.route("/get-flex-order-data-for-PDF").post(validateToken, Order.getFlexOrderDataForPDF);

module.exports = orderRouter;