const express = require('express')
const Staff = require('../../controllers/franchise/staff.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {

    // if (process.env.NODE_ENV === 'development') {
      callback(null, './dist/');
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

const staffRouter = express.Router();

staffRouter.route("/register").post(validateToken, upload.array('avatar'), Staff.register);
// userRouter.route("/update").post(validateToken, User.update);
staffRouter.route("/list").get(validateToken, Staff.all);
// userRouter.route("/getUniqueNames").get(validateToken, User.getUniqueNames);

module.exports = staffRouter;