const Password = require('../../models/setting/password.js');

const pwd = function(req, res, next) {
  try {
    new Password({user_id : req.decoded.user_id}).pwd().then(user => {
      const password = user[0].password.toString('utf8');
      res.send({ password });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const change = function(req, res, next) {
  const passwordParam = {
    current_password:req.body.current_password,
    new_password:req.body.new_password,
    user_id : req.decoded.user_id,
    franchise_id: req.body.franchise_id.franchiseId,
  };
// console.log('req--------------',req.body.franchise_id.franchiseId);
  try {
    const changePassword = new Password(passwordParam);

      changePassword.update().then(function(result){
        new Password({ user_id: req.decoded.user_id }).pwd().then(user => {
          const password = user[0].password.toString('utf8');
          res.send({ password });
        });
    });
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

module.exports = {change,pwd};