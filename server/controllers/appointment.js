const Appointment = require('../models/appointment.js');
const Role = require('../models/franchise/role.js');
const {addOneDay} = require('../utils/datetime.js');

const membersList = async function (req, res, next) {
	const params = {
		user_id: req.decoded.user_id,
	}

  try {
		const activity = new Appointment(params);
		
		const role = await new Role({}).all();


		await activity.inActiveDueDatedTimeslot();
		const membersList = await activity.membersList();
				
		// console.log('membersList..', membersList);

		// if(membersList != null && membersList != undefined && membersList.length > 0){
		// 	membersList.map((data, index) => {
		// 		const nextTimeslot = [];
		// 		const date = new Date();
		// 		for(let i = 0; i< 7; i++){
		// 			date = addOneDay(date);
		// 			nextTimeslot.push([data.user_id, date,  ])
		// 		}
		// 		// await activity.membersList();
		// 	});
		// }

		res.send({ membersList: membersList, roleList: role });
	} catch (err) {
		next(err);
	}
}


module.exports = { membersList: membersList };