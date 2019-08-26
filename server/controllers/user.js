const nodemailer = require('nodemailer');

const User = require("../models/user.js")
const Franchise = require("../models/franchise.js")
const Accountant = require("../models/accountant.js")
const Company = require("../models/company.js")
const UserRole = require("../models/franchise/userRole")
const Miscellaneious = require('../lib/miscellaneous.js')

const { trans } = require("../lib/mailtransporter");

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
		// com_id: req.body.company_id,		

		// Company id recieving by Company model

		//franchise id for updation
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
		// mobile_no: req.body.contact,
		// email: req.body.email,
		role_id: req.body.role_id,
		// state: 1,
		created_by: req.decoded.id,
		is_active: 1,

		//franchaise id receiving by frachaise model
		//Update params
		// f_id: req.body.id,
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

					// newCompany.comp_id= result[0].company_id;
			await newCompany.update();

			// newAccountant.acc_id = result[0].accountant_id;
			await newAccountant.update(); 
			const userList = await new Franchise({}).all();   
			
			res.send({ userList: userList });
			// newAccountant.update();
		} else {
			const accountant_result = await newAccountant.register();
			newCompany.accountant_id = accountant_result.accountant_id;
			const company_result = await newCompany.register();
			newFranchise.company_id = company_result;
			newUser.company_id = company_result;
			const franchise_result = await newFranchise.register();
			
			const accountId = Miscellaneious.generateAccountId();
			const token = Miscellaneious.generateRandomToken();

			newUser.franchise_id = franchise_result.franchise_id;
			newUser.accountId = accountId;
			newUser.token = token;
			newUserRole.franchise_id = franchise_result.franchise_id;

			const user_result = await newUser.register();
			console.log("Saved Successfully.");

			(req.body.directorList || []).map(director => {
				console.log("director list..............", director)
				let url = 'http://rentronicsdev.saimrc.com/api/auth/verifyEmail?accountId=' + accountId + '&name=' + director.uid + '&token=' + token;
				
				const mail = {
					from: 'admin@rentronicsdev.saimrc.com',
					//  to: 'mpurohit88@gmail.com',
					to: director.email,
					subject: 'Please verify your email address',
					text: 'activate your account ',
					html: '<strong><a href=' + url + '> Please click on a link to ativate your account</a></strong> <br />user Id: ' + director.uid + '<br />password: ' + director.password
				}

				// trans.sendMail(mail, (err, info) => {
				// 	if (err) {
				// 		return console.log(err);
				// 	}
				// 	console.log('Message sent: %s', info.messageId);
				// 	// Preview only available when sending through an Ethereal account
				// 	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
				// });
			});
			// newUserRole.user_id = result.id;

			await newUserRole.register();
			const userList = await new Franchise({}).all();

			res.send({ userList: userList });
		}
	} catch (err) {
		next(err);
	}

	// 	const newFranchise = new Franchise();

	// 	try {
	// 		const newUser = new User(userParam);

	// 		if(userParam.role_id === 2) {

	// 			newFranchise.register().then(function (result) {
	// 				newUser.franchise_id = result.franchise_id;

	// 				newUser.register().then(function (result) {
	// 					new Franchise({}).all().then(function (userList) {
	// 						res.json({ credentials: result, userList: userList });
	// 					});
	// 				}).catch((err) => {
	// 					res.status(500);
	// 					res.render('error', { error: err });
	// 				});
	// 			});
	// 		} else {
	// 				newUser.franchise_id = req.decoded.franchise_id;

	// 				newUser.register().then(function (result) {
	// 					new Franchise({}).all().then(function (userList) {
	// 						res.send({ credentials: result, userList: userList });
	// 					});
	// 				}).catch((err) => {
	// 					res.status(500);
	// 					res.render('error', { error: err });
	// 				});
	// 		}
	// 	} catch (err) {
	// 		next(err);

	// 		res.status(500)
	// 		res.send('error', { error: err })
	// 	}
};


const edit = async function (req, res, next) {
	// console.log('...............', req.decoded);
	// console.log('...............', req.body);

	try {

		// console.log('controller update accountant', result);
		// new Category({}).all().then(categoryList => {
		// 	res.send({ categoryList });
		// });

		const newAccountant = new Accountant(accountantParam);
		await newAccountant.update();
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

// const getUniqueNames = async function (req, res, next) {
// 	try {
// 		if (req.decoded.role === 'admin') {
// 			const userList = await new User({}).getUniqueNames();
// 			res.send({ userList: userList });
// 		} else {
// 			res.send([]);
// 		}
// 	} catch (err) {
// 		next(err);
// 	} 
// }

module.exports = { all: all, register: register, verifyEmail: verifyEmail };