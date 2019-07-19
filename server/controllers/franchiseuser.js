const FranchiseUser = require('../models/franchiseuser');

const all = function(req, res, next) {
  try {
    new FranchiseUser({}).all().then(result => {
      console.log('fuser----',result);
      res.send({ FranchiseUserList: result });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

module.exports = { all };
