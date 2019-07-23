const Enquiry = require('../../models/franchise/enquiry.js');

const getnewid = function(req, res, next) {
  console.log("req.decoded...",req.decoded);

  try {
    new Enquiry({user_id: req.decoded.user_id}).getnewid().then(id => {
      res.send({ id });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


module.exports = { getnewid: getnewid};