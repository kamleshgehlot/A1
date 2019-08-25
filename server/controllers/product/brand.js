const Brand = require('../../models/product/brand.js');

const all = async function(req, res, next) {
  try {
    const brandList = await new Brand({}).all();
    
    res.send({ brandList });
  } catch (err) {
    next(err);
  }
};

module.exports = {all};
