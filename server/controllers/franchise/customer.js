const Customer = require('../../models/franchise/customer.js');

const register = async function (req, res, next) {
  const customerData = JSON.parse(req.body.data);

  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

	let CustomerParams = {
    id: customerData.id,
    customer_name : customerData.customer_name,
    address : customerData.address,
    city : customerData.city,
    postcode : customerData.postcode,
    telephone : customerData.telephone,  
    mobile : customerData.mobile,
    email : customerData.email,
    gender : customerData.gender,
    is_working : customerData.is_working,
    dob : customerData.dob,
    id_type :  customerData.id_type,
    id_number:  customerData.id_number,
    expiry_date :  customerData.expiry_date,
    is_adult : customerData.is_adult,
    id_proof :  attachments,

    alt_c1_name: customerData.alt_c1_name,
    alt_c1_address: customerData.alt_c1_address,
    alt_c1_contact: customerData.alt_c1_contact,
    alt_c1_relation: customerData.alt_c1_relation,
    alt_c2_name:  customerData.alt_c2_name,
    alt_c2_address:  customerData.alt_c2_address,
    alt_c2_contact: customerData.alt_c2_contact,
    alt_c2_relation: customerData.alt_c2_relation,

    employer_name: customerData.employer_name,
    employer_address: customerData.employer_address,
    employer_telephone: customerData.employer_telephone,
    employer_email: customerData.employer_email,
    employer_tenure: customerData.employer_tenure,
    is_active:customerData.is_active,
    state: customerData.state,
    other_id_type: customerData.other_id_type,
    user_id: req.decoded.user_id,
    budgetData: customerData.budgetData,
    
    // customer_id: '',
  };

  // console.log('CustomerParams',CustomerParams)
	try{
    if(CustomerParams.id) {
      CustomerParams.updated_by = req.decoded.id;
      const newCustomer = new Customer(CustomerParams);

      await newCustomer.update();
      const customerList = await new Customer({user_id : req.decoded.user_id}).all();

      res.send({ customerList: customerList });
    } else {
      CustomerParams.created_by = req.decoded.id;
      const newCustomer = new Customer(CustomerParams);

      const customerResult = await newCustomer.register();
      newCustomer.customer_id = customerResult; 
      
      if(CustomerParams.budgetData != "" && CustomerParams.customer_id !=''  && CustomerParams.customer_id !=0){
        CustomerParams.created_by = req.decoded.id;
        await newCustomer.addBudget();
      }
      const customerList = await new Customer({user_id : req.decoded.user_id}).all();
      res.send({ customerList });
    }
	}catch(err){
    next(error);
	}
};

const all = async function(req, res, next) {
  try {
    const customerList= await new Customer({user_id : req.decoded.user_id}).all();

    res.send({ customerList });
  } catch (error) {
    next(error);
  }
};

const getidtypelist = async function(req, res, next) {
  try {
    const idTypeList = await new Customer({user_id : req.decoded.user_id}).getidtypelist();

    res.send({ idTypeList });
  } catch (error) {
    next(error);
  }
};

const searchData = async function (req, res, next) {
  let CustomerParams = {
    user_id: req.decoded.user_id,
    searchText: req.body.searchText,
  };
	try{
    const newCustomer = new Customer(CustomerParams);
    const result = await newCustomer.searchData();

    res.send({ customerList: result });
	}catch(err){
    next(error);
	}
};

const getSingleCustomer = async function (req, res, next) {
  let CustomerParams = {
    user_id: req.decoded.user_id,
    customer_id :req.body.customer_id,
  };
	try{
    const newCustomer = new Customer(CustomerParams);
    const result = await newCustomer.getSingleCustomer();

    res.send({ customer: result });
	}catch(err){
    next(error);
	}
};

module.exports = { register: register, all: all, getidtypelist: getidtypelist, searchData: searchData, getSingleCustomer: getSingleCustomer};