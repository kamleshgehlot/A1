const StaffMaster = require("../models/staffMaster.js");
const Miscellaneious = require('../lib/miscellaneous.js');

const register = async function (req, res, next) {
	console.log('req.body---------',req.body)
	console.log('req.decoded---------',req.decoded)

	let staffMasterParams = {
    id: req.body.id,
    first_name: req.body.first_name,
		last_name: req.body.last_name,
		user_id:  req.body.user_id,
		password: req.body.password,
    location: req.body.location,
    contact: req.body.contact,
    email: req.body.email,
    position: req.body.position,
		created_by: req.decoded.id,
		franchise_id: req.decoded.franchise_id,
		is_active : 1,
	};
	
	try{
		const newStaffMaster = new StaffMaster(staffMasterParams);
		

		if(req.body.id) {
			await newStaffMaster.update();
			const staffList = await new StaffMaster({}).getAll();
			
			res.send({ staffList });
		} else {

			const accountId = Miscellaneious.generateAccountId();
			const token = Miscellaneious.generateRandomToken();

			newStaffMaster.accountId = accountId;
			newStaffMaster.token = token;

			await newStaffMaster.register();
			const staffList = await new StaffMaster({}).getAll();
			
			res.send({ staffList });
		}
	} catch(err){
			next(err);
	}
};

const all = async function (req, res, next) {
	try {
			const staffList = await new StaffMaster({}).getAll();
			
			res.send({ staffList: staffList });
	} catch (err) {
		next(err);
	}
}

module.exports = { register: register, all: all};