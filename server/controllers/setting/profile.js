const Profile = require('../../models/setting/profile.js');

const info = function(req, res, next) {
  try {
    console.log('req.decoded----',req.decoded);
    new Profile({user_id : req.decoded.user_id}).info().then(profile => {
      res.send({ profile });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const franchiseDetails = function(req, res, next) {
  try {
    new Profile({franchise_id : req.decoded.franchise_id}).franchiseDetails().then(fd => {
      console.log('franchise details------==',fd);
      res.send({ fd });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};
module.exports = {info,franchiseDetails};
