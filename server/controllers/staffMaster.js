const StaffMaster = require("../models/staffMaster.js");

const register = function (req, res, next) {
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
				newStaffMaster.update().then(function(result){
					new StaffMaster({}).getAll().then(function (staffList) {
					res.send({ staffList });
				});
			});
		} else {
			newStaffMaster.register().then(function(result){
				new StaffMaster({}).getAll().then(function (staffList) {
					res.send({ staffList });
				})
			})
		}
	} catch(err){
			console.log('error:',err);
	}
};

const all = function (req, res, next) {
	try {
			new StaffMaster({}).getAll().then(function (staffList) {
				res.send({ staffList: staffList });
			});
	} catch (err) {
		console.log("Error: ", err);
	}
}


module.exports = { register: register, all: all};