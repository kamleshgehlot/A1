const FranchiseUser = require('../models/franchiseUser');

const all = function(req, res, next) {
  try {
    new FranchiseUser({user_id: req.decoded.user_id}).all().then(franchiseUserList => {
      // console.log('fuser----',franchiseUserList);
      res.send({ franchiseUserList });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};
const user = function(req, res, next) {
  try {
    new FranchiseUser({user_id: req.decoded.user_id}).user().then(currentuser => {
      // console.log('fuser----',currentuser);
      res.send({ currentuser });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

module.exports = { all,user };
