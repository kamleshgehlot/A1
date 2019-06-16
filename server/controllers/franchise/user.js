const User = require("../../models/franchise/user.js")

const register = function (req, res, next) {
	console.log("...............", req.decoded);
	console.log("...............", req.body);

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

	try {
		const newUser = new User(userParam);
	
		newUser.register().then(function (result) {
			newUser.all().then(function (userList) {
				res.json({ credentials: result, userList: userList });
			});
		}).catch((err) => {
			res.status(500);
			res.render('error', { error: err });
		});
	} catch (err) {
		console.log("Error: ", err);

		res.status(500)
		res.send('error', { error: err })
	}
};

const all = function (req, res, next) {
	try {
			const newUser = new User({user_id: req.decoded.user_id});

			newUser.all().then(function (userList) {
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