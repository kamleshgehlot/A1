const Color = require('../../models/product/color.js');

const all = async function(req, res, next) {
  try {
    const colorList = await new Color({}).all();
    
    res.send({ colorList });
  } catch (err) {
    next(err);
  }
};

module.exports = { all};
