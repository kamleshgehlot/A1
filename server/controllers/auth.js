const Auth = require("../models/auth.js")
const jwt = require('jsonwebtoken');

const login = function (req, res, next) {
  console.log("@@@@@@@@@@@@@@@@2", req.body);

  let params = {
    name: req.body.username,
    password: req.body.password
  };
  const auth = new Auth(params);
  let result = {};
  let status = 201;
  try {
    auth.login().then((user) => {
      console.log("!!!!!!!!!!!!!!", user);

      if (user && user.length > 0 && user[0].password.toString('utf8') === params.password) {
        console.log("&&&&&&&&&&&&&&&", user);
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
      } else {
        status = 401;
        result.status = status;
        result.error = `Authentication error`;
      }

      res.status(status).send(result);
    }).catch(err => {
      console.log("Error", err)
      status = 500;
      result.status = status;
      result.error = 'Applition Error, Please contact the adminstrator.';
      res.status(status).send(result);
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = { login: login };