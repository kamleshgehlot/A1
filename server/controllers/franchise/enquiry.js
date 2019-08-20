const Enquiry = require('../../models/franchise/enquiry.js');

const getnewid = function(req, res, next) {
  try {
    new Enquiry({user_id: req.decoded.user_id}).getnewid().then(id => {
      res.send(id);
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


const getAll = function(req, res, next) {
  try {
    new Enquiry({user_id: req.decoded.user_id}).getAll().then(enquiryList => {
      res.send({ enquiryList });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

const convertedList = function(req, res, next) {
  try {
    new Enquiry({user_id: req.decoded.user_id}).convertedList().then(enquiryList => {
      res.send({ enquiryList });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


const convert = function(req, res, next) {
  try {
    new Enquiry({user_id: req.decoded.user_id, enquiry_id: req.body.enquiry_id}).convert().then(result => {
      new Enquiry({user_id: req.decoded.user_id}).getAll().then(enquiryList => {
        res.send({ enquiryList });
      });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


const postenquiry = function (req, res, next) {
  // console.log("****************Enquiry..................", req.body);
  // console.log("%%%%%%%%%%% Session Data %%%%%%%%%%%%%", req.decoded);

	let EnquiryParams = {
    user_id: req.decoded.user_id,
    userid: req.decoded.id,
    franchise_id: req.decoded.franchise_id,
    
    enquiry_id : req.body.enquiry_id,
    customer_name: req.body.customer_name,
    contact: req.body.contact,
    interested_product_id: req.body.interested_product_id,
    is_active: 1,
    converted_to: req.body.converted_to,
    created_by: req.decoded.id,
    convert_by_lead: req.body.convert_by_lead,
  };
	try{
	
    EnquiryParams.created_by = req.decoded.id;
	  const newEnquiry = new Enquiry(EnquiryParams);
    newEnquiry.postenquiry().then(function(result){
      new Enquiry({user_id : req.decoded.user_id}).getAll().then(function (enquiryList) {
        console.log('enquiry list',enquiryList);
        res.send({ enquiryList: enquiryList });
      });
    });
	}catch(err){
    console.log("Error..",err);
	}
};


module.exports = { getnewid, postenquiry, getAll, convert, convertedList};