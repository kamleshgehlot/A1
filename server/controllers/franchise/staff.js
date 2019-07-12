const nodemailer = require('nodemailer');
const { trans } = require("../../lib/mailtransporter");

const Staff = require('../../models/franchise/staff.js');

const register = function (req, res, next) {

	let staffParams = {
      franchise_id: req.body.franchise_id,
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      location: req.body.location,
      contact: req.body.contact,
      email: req.body.email,
      
      pre_company_name: req.body.pre_company_name,
      pre_company_address: req.body.pre_company_address,
      pre_company_contact: req.body.pre_company_contact,
      pre_position: req.body.pre_position,
      duration: req.body.duration,
      resume:  req.body.resume,
      cover_letter: req.body.cover_letter,
      employment_docs: req.body.employment_docs,
      
      user_id: req.body.user_id,
      password: req.body.password,
      role: req.body.role,
      created_by: req.body.created_by,
	};

	try{
	const newStaff = new Staff(staffParams);

	if(req.body.id) {
    newStaff.update().then(function(result){
      new Staff({user_id : req.decoded.user_id}).all().then(function (staffList) {
        res.send({ staffList: staffList });
      });
    });
	} else {
    newStaff.register().then(function(result){
      new Staff({user_id : req.decoded.user_id}).all().then(function (staffList) {
        res.send({ staffList: staffList });
      });
    });
	}
	}catch(err){
    console.log("Error..",err);
	}
};



// const all = function(req, res, next) {
//   let staffParams = {
//     franchise_id: req.body.franchise_id,
//   };
//   try {
//     const newStaff = new Staff(staffParams);
//     newStaff.all().then(function(result){
//     new Staff({}).all().then(staffList => {
//       res.send({ staffList });
//     });
//   });
//   } catch (error) {
//     console.log('Error: ', error);
//   }
// };


const all = function(req, res, next) {
  
  try {
    console.log(req.decoded);
    new Staff({user_id : req.decoded.user_id}).all().then(staffList => {
      res.send({ staffList });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


module.exports = { register: register, all: all};