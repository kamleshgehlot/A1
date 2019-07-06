const Location = require('../models/location');

const getAll = function(req, res, next) {
  try {
    new Location({}).getAll().then(result => {
      res.send({ cityList: result });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

module.exports = { getAll };
