const Color = require('../../models/product/color.js');

const all = function(req, res, next) {
  try {
    new Color({}).all().then(colorList => {
      res.send({ colorList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports = { all};
