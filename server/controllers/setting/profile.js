const Profile = require('../../models/setting/profile.js');

const info = function(req, res, next) {
  try {
    new Profile({}).info().then(profile => {
      res.send({ profile });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports = {info};
