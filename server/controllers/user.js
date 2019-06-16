const User = require("../models/user.js")
const Franchise = require("../models/franchise.js")

const register = function (req, res, next) {
	console.log("...............", req.decoded);
	console.log("...............", req.body);

	let franchiseParam = {
		created_by: req.decoded.id,
		user_id: req.body.user_id,
		name: req.body.name,
		location: req.body.location,
		contact: req.body.contact,
		abn: req.body.abn,
		is_active: 1
	};

	let userParam = {
		name: req.body.name,
		user_id: req.body.user_id,
		password: req.body.password,
		mobile_no: req.body.mobile_no,
		role_id: req.body.role_id,
		is_active: 1,
		email: req.body.email,
		created_by: req.decoded.id
	};

	const newFranchise = new Franchise(franchiseParam);

	try {
		const newUser = new User(userParam);

		if(userParam.role_id === 2) {
			newFranchise.register().then(function (result) {
	
				newUser.franchise_id = result.franchise_id;
	
				newUser.register().then(function (result) {
					new Franchise({}).all().then(function (userList) {
						res.json({ credentials: result, userList: userList });
					});
				}).catch((err) => {
					res.status(500);
					res.render('error', { error: err });
				});
			});
		} else {
				newUser.franchise_id = req.decoded.franchise_id;
	
				newUser.register().then(function (result) {
					new Franchise({}).all().then(function (userList) {
						res.send({ credentials: result, userList: userList });
					});
				}).catch((err) => {
					res.status(500);
					res.render('error', { error: err });
				});
		}
		
	} catch (err) {
		console.log("Error: ", err);

		res.status(500)
		res.send('error', { error: err })
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

const getUniqueNames = function (req, res, next) {
	try {
		if (req.decoded.role === 'admin') {
			new User({}).getUniqueNames().then(function (userList) {
				res.send({ userList: userList });
			});
		} else {
			res.send([]);
		}
	} catch (err) {
		console.log("Error: ", err);
	}
}

module.exports = { register: register, all: all, getUniqueNames: getUniqueNames };