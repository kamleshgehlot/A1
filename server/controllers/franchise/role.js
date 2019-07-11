const Role = require('../../models/franchise/role.js');

const all = function(req, res, next) {
  try {
    new Role({}).all().then(role => {
      res.send({ role });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


module.exports = { all: all};