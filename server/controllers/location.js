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

const selectedArea = function(req, res, next) {
  try {
    // console.log("req....",req.body);
    
    if(!req.body.city_id){
      new Location({city_name: req.body.city_name, city_code: req.body.city_code}).getCityRelatedAllArea().then(result => {
        res.send({ selectedArea: result });
      });
    }else{
    new Location({city_id : req.body.city_id, city_name: req.body.city_name, city_code: req.body.city_code}).getSelectedArea().then(result => {
        res.send({ selectedArea: result });
      });
    }
  } catch (error) {
    console.log('Error: ', error);
  }
};

module.exports = { getAll, selectedArea };
