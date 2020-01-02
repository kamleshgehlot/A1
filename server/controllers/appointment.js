const Appointment = require('../models/appointment.js');
const Role = require('../models/franchise/role.js');


const membersList = async function (req, res, next) {
  try {
    
    const role = await new Role({}).all();
    const membersList = await new Appointment({user_id: req.decoded.user_id}).membersList();    
		res.send({ membersList: membersList, roleList: role });
	} catch (err) {
		next(err);
	}
}


module.exports = { membersList: membersList };