const User = require("../models/user.js")
const Franchise = require("../models/franchise.js")
const Accountant = require("../models/accountant.js")
const Company = require("../models/company.js")

const register = function (req, res, next) {
	let accountantParam = {
		// id : req.body.id,
		name: req.body.accountant_name,
		email: req.body.accountant_email,
		contact: req.body.accountant_contact,
	};

	let companyParam = {
		  name: req.body.company_name,
      nbzn: req.body.nbzn,
      location: req.body.company_location,
      director: req.body.director,
      email: req.body.email,
      contact: req.body.contact,
      alt_contact: req.body.alt_contact,
			website: req.body.website,
		// Accountant id recieving by accountant model
	};

	let franchiseParam = {
		id: req.body.id,
		uid: req.body.uid,
		name: req.body.franchise_name,
		city: req.body.city,
		city_code: req.body.city_code,
		suburb: req.body.suburb,
		abn: req.body.abn,
		state: req.body.state,
		created_by: req.decoded.id,
		password: req.body.password,

		// Company id recieving by Company model

		//franchise id for updation
		f_id: req.body.id,
	};

	let userParam = {
		name: req.body.user_name,
		user_id: req.body.uid,
		password: req.body.password,
		designation: req.body.designation,
		mobile_no: req.body.contact,
		email: req.body.email,
		role_id: req.body.role_id,
		state: 1,
		created_by: req.decoded.id,

		//franchaise id receiving by frachaise model
		//Update params
		f_id: req.body.id,
	};

	
	try{
	const newAccountant = new Accountant(accountantParam);
	const newCompany = new Company(companyParam);
	const newFranchise = new Franchise(franchiseParam);
	const newUser = new User(userParam);

	if(req.body.id) {
		
		newUser.update().then(function(result){

			newFranchise.update().then(function(result){
				
				newCompany.comp_id= result[0].company_id;
				newCompany.update().then(function(result){

						newAccountant.acc_id = result[0].accountant_id;
						newAccountant.update().then(function(result){
							new Franchise({}).all().then(function (userList) {
							res.send({ userList: userList });
						})
					})
				});
			})
		})

		
		// newAccountant.update();
	} else {

		newAccountant.register().then(function(result){
			
			newCompany.accountant_id = result.accountant_id;
			newCompany.register().then(function(result){

				newFranchise.company_id = result.company_id;
				newFranchise.register().then(function(result){

					newUser.franchise_id = result.franchise_id;
					newUser.register().then(function(result){
								console.log("Saved Successfully.");
								new Franchise({}).all().then(function (userList) {
									res.send({ userList: userList });
								});
					})
				})
			})
		})

	}


	}catch(err){

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
// 		console.log("Error: ", err);

// 		res.status(500)
// 		res.send('error', { error: err })
// 	}
};


const edit = function(req, res, next) {
  console.log('...............', req.decoded);
  console.log('...............', req.body);

  try {

		// console.log('controller update accountant', result);
		// new Category({}).all().then(categoryList => {
		// 	res.send({ categoryList });
		// });

    const newAccountant = new Accountant(accountantParam);
    newAccountant.update().then(result => {
				user
        
      })
      .catch(err => {
        res.status(500);
        res.render('error', { error: err });
      });
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};


const all = function (req, res, next) {
	try {
			new Franchise({}).all().then(function (userList) {
				res.send({ userList: userList });
			});
	} catch (err) {
		console.log("Error: ", err);
	}
}

// const getUniqueNames = function (req, res, next) {
// 	try {
// 		if (req.decoded.role === 'admin') {
// 			new User({}).getUniqueNames().then(function (userList) {
// 				res.send({ userList: userList });
// 			});
// 		} else {
// 			res.send([]);
// 		}
// 	} catch (err) {
// 		console.log("Error: ", err);
// 	} 
// }

module.exports = { all: all, register: register};