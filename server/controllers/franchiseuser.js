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

const staffList = function (req, res, next) {
  const staffRoleParam = {
    selectedRole: req.body.selectedRole,
    user_id: req.decoded.user_id
  };
  try {
    console.log('staffRoleParam----===',staffRoleParam);
    const newFranchiseUser = new FranchiseUser(staffRoleParam);
    newFranchiseUser.staffList().then(staffList => {
      console.log('staffList----===',staffList); 
        res.send({ staffList });
    });
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

module.exports = { all,user,staffList };
