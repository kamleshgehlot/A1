const soap = require('soap');

const {domainName} = require("../lib/databaseMySQLNew");
const EzidebitPayments = require('../models/EzidebitPayments');


const getPayments = async function (req, res, next) {
  const params = {
    user_id: req.decoded.user_id,
    payment_type: req.body.payment_type,
    payment_method: req.body.payment_method,
    payment_source: req.body.payment_source,
    date_field: req.body.date_field,
    date_from: req.body.date_from,
    date_to: req.body.date_to,
  };
  
  try {
    const result = await new EzidebitPayments(params).GetPayments();
    if(result !== null){
      res.send(result.Payment);
    }else{
      res.send([]);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getPayments: getPayments };