const StaffMaster = require("../models/staffMaster.js");

const register = async function (req, res, next) {
	console.log('req.body---------',req.body)
	let staffMasterParams = {
    id: req.body.id,
    first_name: req.body.first_name,
		last_name: req.body.last_name,
		user_id: req.body.user_id,
		pasword:req.body.password,
    location: req.body.location,
    contact: req.body.contact,
    email: req.body.email,
    position: req.body.position,
		created_by: req.body.created_by,
	};
	
	try{
		const newStaffMaster = new StaffMaster(staffMasterParams);
		
		if(req.body.id) {
			await newStaffMaster.update();
			const staffList = await new StaffMaster({}).getAll();
			
			res.send({ staffList });
		} else {
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