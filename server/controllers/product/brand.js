const Brand = require('../../models/product/brand.js');

const all = function(req, res, next) {
  try {
    new Brand({}).all().then(brandList => {
      res.send({ brandList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports = {all};
