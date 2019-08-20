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
    current_password : req.body.current_password,
    new_password : req.body.new_password,
    user_id : req.decoded.user_id,   
    id : req.decoded.id,     
  };
// console.log('req-body-------------',req.body);
// console.log('req-decoded-------------',req.decoded);
  try {
    const changePassword = new Password(passwordParam);    
      changePassword.passwordSelection().then(function(selectedPassword){
         console.log('rowsss',selectedPassword[0].password.toString('utf8'));
          if(selectedPassword[0].password.toString('utf8') === passwordParam.current_password) {
            changePassword.update().then(function(response){
              console.log('match',response);
              res.send({isChanged: response.changedRows});
            });
          }
          else{
            res.send({isChanged: 0});          
          }
          // res.send( result );
        // new Password({ user_id: req.decoded.user_id }).pwd().then(user => {
        //   const password = user[0].password.toString('utf8');
        //   res.send({ password });
        // });
    });
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

module.exports = {change,pwd};