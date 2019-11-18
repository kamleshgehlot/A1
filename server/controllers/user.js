const nodemailer = require('nodemailer');
const User = require("../models/user.js")
const Franchise = require("../models/franchise.js")
const Accountant = require("../models/accountant.js")
const Company = require("../models/company.js")
const UserRole = require("../models/franchise/userRole")
const Testing = require("../models/testing.js")
const Miscellaneious = require('../lib/miscellaneous.js')
const {domainName} = require("../lib/databaseMySQLNew");
const { trans } = require("../lib/mailtransporter");

const soap = require('soap');
const wsdlUrl = 'https://api.demo.ezidebit.com.au/v3-5/nonpci?singleWsdl';
const custUrl = 'https://api.demo.ezidebit.com.au/v3-5/pci?singleWsdl';
const Payments = require('../models/Payment.js');


const paymentAPI = async function (req, res, next) {
  try {
   
    soap.createClient(wsdlUrl, function (err, soapClient) {      
     
      soapClient.GetCustomerList({
        DigitalKey: '4E6ACAE2-E4A9-4186-ECDD-E0B9F06785B2',
        CustomerStatus: 'ALL',
        PageNumber: '1'
      }, function (err, result) {
        // console.log("GetCustomerList.....", result.GetCustomerListResult.Data.Customer);        
      });

      soapClient.GetScheduledPayments({
        DigitalKey: '4E6ACAE2-E4A9-4186-ECDD-E0B9F06785B2'
      }, function (err, result) {
        // console.log("GetScheduledPayments.....", result.GetScheduledPaymentsResult.Data.ScheduledPayment);
      });


      soapClient.GetPayments({
        DigitalKey: '4E6ACAE2-E4A9-4186-ECDD-E0B9F06785B2',
        PaymentType: 'ALL',
        PaymentMethod: 'ALL',
        PaymentSource: 'ALL'
      }, function (err, result) {
				console.log("GetPayments length....", result.GetPaymentsResult.Data.Payment.length);

				if(result != undefined && result != ""){
					const deleted = new Payments({user_id: req.decoded.user_id, data: result.GetPaymentsResult.Data.Payment[0]}).removeExistingRows();
					
					const payments = result.GetPaymentsResult.Data.Payment;
					(payments.length > 0 ? payments : []).map((data, index) => {
						const newPayments = new Payments({user_id: req.decoded.user_id, data: data}).addPayments();
					});   					
					res.send({isCompleted: 1});
				}else{
					console.log('hello');
					res.send([]);
				}
      });

      // we now have a soapClient - we also need to make sure there's no `err` here.
    });   		
  } catch (err) {
    next(err);
  }
};


const register = async function (req, res, next) {
	let accountantParam = {
		id: req.body.accountant_id,
		name: req.body.accountant_name,
		email: req.body.accountant_email,
		contact: req.body.accountant_contact,
	};

	let companyParam = {
		name: req.body.company_name,
		nbzn: req.body.nbzn,
		location: req.body.company_location,
		director_id: req.body.director_id,
		director: req.body.director,
		email: req.body.email,
		contact: req.body.contact,
		alt_contact: req.body.alt_contact,
		website: req.body.website,


		directorList: req.body.directorList,

	};

	let franchiseParam = {
		id: req.body.id,
		name: req.body.franchise_name,
		city: req.body.city,
		city_code: req.body.city_code,
		suburb: req.body.suburb,
		abn: req.body.abn,
		state: req.body.state,
		created_by: req.decoded.id,
		f_id: req.body.id,
	};

	let userParam = {
		franchise_id: req.body.id,
		director_id: req.body.director_id,

		name: req.body.user_name,
		user_id: req.body.user_id,
		password: req.body.password,
		designation: req.body.designation,

		user_details: req.body.directorList,
		role_id: req.body.role_id,
		created_by: req.decoded.id,
		is_active: 1,
	};


	const userRoleParam = {
		role_id: req.body.role_id,
		is_active: 1,
		created_by: req.decoded.id,
	};

	try {
		const newAccountant = new Accountant(accountantParam);
		const newCompany = new Company(companyParam);
		const newFranchise = new Franchise(franchiseParam);
		const newUser = new User(userParam);
		const newUserRole = new UserRole(userRoleParam);

		if (req.body.id) {

			await newUser.update();

			await newFranchise.update();

			await newCompany.update();

			await newAccountant.update(); 
			const userList = await new Franchise({}).all();   
			
			res.send({ userList: userList });
		} else {
			const testing_result = await new Testing({city: req.body.city, suburb: req.body.suburb}).testDB();
			// console.log('testing result',testing_result);
			if(testing_result.isExist===0){
			
			const accountant_result = await newAccountant.register();
			newCompany.accountant_id = accountant_result.accountant_id;

			const company_result = await newCompany.register();
			newFranchise.company_id = company_result;
			newUser.company_id = company_result;

			const franchise_result = await newFranchise.register();						
			const accountId = Miscellaneious.generateAccountId();
			const token = Miscellaneious.generateRandomToken();
			// console.log('franchise result',franchise_result);

			// if(franchise_result.isExist === 0){
				
				newUser.franchise_id = franchise_result.franchise_id;
				newUser.accountId = accountId;
				newUser.token = token;
				newUserRole.franchise_id = franchise_result.franchise_id;
				newUserRole.fdbname = franchise_result.fdbname;

				const user_result = await newUser.register();
				console.log("Saved Successfully.");

				(req.body.directorList || []).map(director => {
					console.log("director list..............", director)
					let url = 'http://' + domainName + '/api/auth/verifyEmail?accountId=' + accountId + '&name=' + director.uid + '&token=' + token;
					
					const mail = {
						from: 'admin@' + domainName,
						//  to: 'mpurohit88@gmail.com',
						to: director.email,
						subject: 'Please verify your email address',
						text: 'activate your account ',
						html: '<strong><a href=' + url + '> Please click on a link to ativate your account</a></strong> <br />user Id: ' + director.uid + '<br />password: ' + director.password
					}

					trans.sendMail(mail, (err, info) => {
						if (err) {
							return console.log(err);
						}
						console.log('Message sent: %s', info.messageId);
						// Preview only available when sending through an Ethereal account
						console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
					});
				});
				// newUserRole.user_id = result.id;

				const userRole = await newUserRole.register();
				const userList = await new Franchise({}).all();

				res.send({ userList: userList, isExist: 0 });
			}else{
				res.send({ userList: [], isExist: 1 });
			}		
	}
	} catch (err) {
		next(err);
	}
};


const all = async function (req, res, next) {
	try {
		const userList = await new Franchise({}).all();
		
		res.send({ userList: userList });
	} catch (err) {
		next(err);
	}
}

const verifyEmail = async function (req, res, next) {
	try {
		const isVerified = await new Franchise({email: req.body.email}).verifyEmail();
		
		res.send({ isVerified: isVerified });
	}catch (err) {
		next(err);
	}
};


module.exports = { all: all, register: register, verifyEmail: verifyEmail,  paymentAPI: paymentAPI };