const Staff = require('../../models/franchise/staff.js');

const register = async function (req, res, next) {
  const staffData = JSON.parse(req.body.data);

  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

	let staffParams = {
      franchise_id: staffData.franchise_id,
      id: staffData.id,
      first_name: staffData.first_name,
      last_name: staffData.last_name,
      location: staffData.location,
      contact: staffData.contact,
      email: staffData.email,
      
      pre_company_name: staffData.pre_company_name,
      pre_company_address: staffData.pre_company_address,
      pre_company_contact: staffData.pre_company_contact,
      pre_position: staffData.pre_position,
      duration: staffData.duration,
      resume:  staffData.resume,
      cover_letter: staffData.cover_letter,
      // employment_docs: staffData.employment_docs,
      employment_docs: attachments,

      user_id: staffData.user_id,
      password: staffData.password,
      role: staffData.role,
      created_by: req.decoded.id,
      updated_by:req.decoded.id,
      is_active: 1,
	};

	try{
    if(staffData.id) {
      staffParams.updated_by = req.decoded.id;
      const newStaff = new Staff(staffParams);

      await newStaff.update();
      const staffList = await new Staff({user_id : req.decoded.user_id}).all();
      res.send({ staffList: staffList });
    } else {
      staffParams.created_by = req.decoded.id;
      const newStaff = new Staff(staffParams);

      await newStaff.register();
      const staffList = await new Staff({user_id : req.decoded.user_id}).all();
      
      res.send({ staffList: staffList });
    }
	}catch(err){
    next(err);
	}
};



// const all = async function(req, res, next) {
//   let staffParams = {
//     franchise_id: req.body.franchise_id,
//   }; 
//   try {
//     const newStaff = new Staff(staffParams);
//     newStaff.all().then(function(result){
//     new Staff({}).all().then(staffList => {
//       res.send({ staffList });
//     });
//   });
//   } catch (error) {
//     next(error);
//   }
// };


const all = async function(req, res, next) {
  
  try {
    console.log(req.decoded);
    const staffList = await new Staff({user_id : req.decoded.user_id}).all();
    
    res.send({ staffList });
  } catch (error) {
    next(error);
  }
};


module.exports = { register: register, all: all};