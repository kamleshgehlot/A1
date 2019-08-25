const User = require("../../models/franchise/user.js")

const register = async function (req, res, next) {
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
	
		const result = await newUser.register();
		const userList = await newUser.all();
		
		res.json({ credentials: result, userList: userList });
	} catch (err) {
		next(err);
	}
};

const all = async function (req, res, next) {
	try {
			const newUser = new User({user_id: req.decoded.user_id});

			const userList = await newUser.all();
			
			res.send({ userList: userList });
	} catch (err) {
		next(err);
	}
}

const getUniqueNames = async function (req, res, next) {
	try {
		if (req.decoded.role === 'admin') {
			const userList = await new User({}).getUniqueNames();
			
			res.send({ userList: userList });
		} else {
			res.send([]);
		}
	} catch (err) {
		next(err);
	}
}

module.exports = { register: register, all: all, getUniqueNames: getUniqueNames };