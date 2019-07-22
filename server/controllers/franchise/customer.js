const nodemailer = require('nodemailer');
const { trans } = require("../../lib/mailtransporter");

const Customer = require('../../models/franchise/customer.js');

const register = function (req, res, next) {
  console.log("****************staff..................", req.body);
  console.log("%%%%%%%%%%% file %%%%%%%%%%%%%", req.files);

  const customerData = JSON.parse(req.body.data);

  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

	let CustomerParams = {
    id: customerData.id,
    customer_name : customerData.customer_name,
    address : customerData.address,
    city : customerData.city,
    postcode : customerData.postcode,
    telephone : customerData.telephone,  
    mobile : customerData.mobile,
    email : customerData.email,
    gender : customerData.gender,
    is_working : customerData.is_working,
    dob : customerData.dob,
    id_type :  customerData.id_type,
    id_number:  customerData.id_number,
    expiry_date :  customerData.expiry_date,
    is_adult : customerData.is_adult,
    id_proof :  attachments,

    alt_c1_name: customerData.alt_c1_name,
    alt_c1_address: customerData.alt_c1_address,
    alt_c1_contact: customerData.alt_c1_contact,
    alt_c1_relation: customerData.alt_c1_relation,
    alt_c2_name:  customerData.alt_c2_name,
    alt_c2_address:  customerData.alt_c2_address,
    alt_c2_contact: customerData.alt_c2_contact,
    alt_c2_relation: customerData.alt_c2_relation,

    employer_name: customerData.employer_name,
    employer_address: customerData.employer_address,
    employer_telephone: customerData.employer_telephone,
    employer_email: customerData.employer_email,
    employer_tenure: customerData.employer_tenure,

    is_active:customerData.is_active,
    created_by: customerData.created_by,
    updated_by: customerData.updated_by, 

    other_id_type: customerData.other_id_type,

    user_id: req.decoded.user_id,

	};

	try{
	const newCustomer = new Customer(CustomerParams);
  // console.log("req..",req.body);
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