const nodemailer = require('nodemailer');
const { trans } = require("../../lib/mailtransporter");

const Customer = require('../../models/franchise/customer.js');

const register = function (req, res, next) {

	let CustomerParams = {
    id: req.body.id,
    customer_name : req.body.customer_name,
    address : req.body.address,
    city : req.body.city,
    postcode : req.body.postcode,
    telephone : req.body.telephone,  
    mobile : req.body.mobile,
    email : req.body.email,
    gender : req.body.gender,
    is_working : req.body.is_working,
    dob : req.body.dob,
    id_type :  req.body.id_type,
    id_number:  req.body.id_number,
    expiry_date :  req.body.expiry_date,
    is_adult : req.body.is_adult,
    id_proof :  req.body.id_proof,

    alt_c1_name: req.body.alt_c1_name,
    alt_c1_address: req.body.alt_c1_address,
    alt_c1_contact: req.body.alt_c1_contact,
    alt_c1_relation: req.body.alt_c1_relation,
    alt_c2_name:  req.body.alt_c2_name,
    alt_c2_address:  req.body.alt_c2_address,
    alt_c2_contact: req.body.alt_c2_contact,
    alt_c2_relation: req.body.alt_c2_relation,

    employer_name: req.body.employer_name,
    employer_address: req.body.employer_address,
    employer_telephone: req.body.employer_telephone,
    employer_email: req.body.employer_email,
    employer_tenure: req.body.employer_tenure,

    is_active:req.body.is_active,
    created_by: req.body.created_by,

    user_id: req.decoded.user_id,
	};

	try{
	const newCustomer = new Customer(CustomerParams);

	if(req.body.id) {
    newCustomer.update().then(function(result){
      new Customer({user_id : req.decoded.user_id}).all().then(function (customerList) {
        res.send({ customerList: customerList });
      });
    });
	} else {
    newCustomer.register().then(function(result){
      new Customer({user_id : req.decoded.user_id}).all().then(function (customerList) {
        res.send({ customerList: customerList });
      });
    });
	}
	}catch(err){
    console.log("Error..",err);
	}
};


const all = function(req, res, next) {
  try {
    new Customer({user_id : req.decoded.user_id}).all().then(customerList => {
      res.send({ customerList });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

const getidtypelist = function(req, res, next) {
  try {
    new Customer({user_id : req.decoded.user_id}).getidtypelist().then(idTypeList => {
      res.send({ idTypeList });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


module.exports = { register: register, all: all, getidtypelist: getidtypelist};