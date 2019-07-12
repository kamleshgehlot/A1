const Auth = require("../models/auth.js")
const jwt = require('jsonwebtoken');
var encryptionHelper = require("../lib/simple-nodejs-iv-encrypt-decrypt.js")
var algorithm = encryptionHelper.CIPHERS.AES_256;

const login = function (req, res, next) {
  let params = {
    name: req.body.username,
    password: req.body.password
  };
  const auth = new Auth(params);
  let result = {};
  let status = 201;
  try {
    auth.login().then((user) => {
      // encryptionHelper.getKeyAndIV("1234567890abcdefghijklmnopqrstuv", function (data) { //using 32 byte key

        console.log("user....************.", user)
      // var decText = encryptionHelper.decryptText(algorithm, user[0].key, user[0].iv, user[0].password, "base64");
      // console.log("decText....************.", decText)

      if (user && user.length > 0 && user[0].password.toString('utf8') === params.password) {
        status = 200;
        // Create a token
        const payload = { id: user[0].id, user: params.name, user_id: user[0].user_id, franchise_id: user[0].franchise_id, role: user[0].role_id };
        const options = { expiresIn: '365d', issuer: 'https://sargatechnology.com' };
        const secret = process.env.JWT_SECRET || 'secret';
        const token = jwt.sign(payload, secret, options);

        result.token = token;
        result.status = status;
        result.result = params.name;
        result.role_name = user[0].role_name;
        result.user_name = user[0].user_name;
        result.franchise_id = user[0].franchise_id || '';
        result.user_id=user[0].id;
      } else {
        status = 401;
        result.status = status;
        result.error = `Authentication error`;
      }

      res.status(status).send(result);
    // });
    }).catch(err => {
      console.log("Error", err)
      status = 500;
      result.status = status;
      result.error = 'Application Error, Please contact the administrator.';
      res.status(status).send(result);
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = { login: login };