const User = require("../models/user.js")

const register = function (req, res, next) {
	let params = {
		created_by: req.decoded.id,
		id: req.body.id,
		company_id: req.body.companyId,
		name: req.body.name,
		user_id: req.body.userId,
		password: req.body.password,
		area: req.body.area,
		address: req.body.address,
		mobile_no: req.body.mobileNo,
		role: 'user',
		is_active: 1,
		email: req.body.email
	};
	const newUser = new User(params);

	try {
		if (params.id) {
			newUser.update().then(function (result) {
				if (req.decoded.role === 'admin') {
					new User({}).all().then(function (userList) {
						res.send({ credentials: result, userList: userList });
					});
				} else {
					res.send([]);
				}
			}).catch((err) => {
				res.status(500);
				res.render('error', { error: err });
			});
		} else {
			newUser.register().then(function (result) {
				if (req.decoded.role === 'admin') {
					new User({}).all().then(function (userList) {
						res.send({ credentials: result, userList: userList });
					});
				} else {
					res.send([]);
				}
			}).catch((err) => {
				res.status(500);
				res.send('error', { error: err });
			});;
		}
	} catch (err) {
		console.log("Error: ", err);

		res.status(500)
		res.send('error', { error: err })
	}
};

const all = function (req, res, next) {
	try {
		if (req.decoded.role === 'admin') {
			new User({}).all().then(function (userList) {
				res.send({ userList: userList });
			});
		} else {
			res.send([]);
		}
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