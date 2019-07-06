const Status = require('../../models/product/status.js');

const all = function(req, res, next) {
  try {
    new Status({}).all().then(statusList => {
      res.send({ statusList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports = { all};
