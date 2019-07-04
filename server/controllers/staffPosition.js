const StaffPosition = require("../models/staffPosition");

const all = function (req, res, next) {
    try {
        new StaffPosition({}).getAll().then(function (result) {
          res.send({ staffPosition: result });
        });
    } catch (err) {
      
    }
  }

module.exports = { all };