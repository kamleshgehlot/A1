const Password = require('../../models/setting/password.js');

const change = function(req, res, next) {
  const passwordParam = {
    current_password:req.body.current_password,
    new_password:req.body.new_password,
    user_id : req.decoded.user_id,
    franchise_id: req.body.franchise_id.franchiseId,
  };
console.log('req--------------',req.body.franchise_id.franchiseId);
  try {
    const changePassword = new Password(passwordParam);

      changePassword.update().then(function(result){
        
    });
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

const pwd = function(req, res, next) {
  try {
    new Password({user_id : req.decoded.user_id}).pwd().then(password => {
      console.log('pwd controller----',password.toString('utf8'));
      res.send({ password });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports = {change,pwd};