const Appointment = require('../models/appointment.js');
const Role = require('../models/franchise/role.js');
const {addOneDay, getCurrentDateDBFormat} = require('../utils/datetime.js');

const membersList = async function (req, res, next) {
	const params = {
		user_id: req.decoded.user_id,
	}

  try {
		const newActivity = new Appointment(params);
		
		const role = await new Role({}).all();


		await newActivity.inActiveDueDatedTimeslot();
		const membersList = await newActivity.membersList();
				
		if(membersList != null && membersList != undefined && membersList.length > 0){
			membersList.map(async (data, index) => {
				let date = getCurrentDateDBFormat();

				for(let i = 0; i< 7; i++){
					await newActivity.createTimeslot(data.id, date, '15', '09:00', '18:00', 1, 1);
					date = addOneDay(date);
				}
			});
		}

		res.send({ membersList: membersList, roleList: role });
	} catch (err) {
		next(err);
	}
}



const getCurrentTimeslot = async function (req, res, next) {
	const params = {
		user_id: req.decoded.user_id,
		userId : req.body.userId,
	}

  try {
		const newActivity = new Appointment(params);
		const timeSlot = await newActivity.getCurrentTimeslot();

		res.send({ timeSlot: timeSlot });
	} catch (err) {
		next(err);
	}
}

module.exports = { membersList: membersList, getCurrentTimeslot: getCurrentTimeslot };