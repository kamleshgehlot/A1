const Order = require('../../models/franchise/order.js');

const getnewid = function(req, res, next) {
  try {
    new Order({user_id: req.decoded.user_id}).getnewid().then(id => {
      res.send({ id });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


const getAll = function(req, res, next) {
  try {
    new Order({user_id: req.decoded.user_id}).getAll().then(enquiryList => {
      res.send({ enquiryList });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

const convertedList = function(req, res, next) {
  try {
    new Order({user_id: req.decoded.user_id}).convertedList().then(enquiryList => {
      res.send({ enquiryList });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


const convert = function(req, res, next) {
  try {
    new Order({user_id: req.decoded.user_id, enquiry_id: req.body.enquiry_id}).convert().then(result => {
      new Enquiry({user_id: req.decoded.user_id}).getAll().then(enquiryList => {
        res.send({ enquiryList });
      });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


const postOrder = function (req, res, next) {
  console.log("****************Order..................", req.body);
  // console.log("%%%%%%%%%%% Session Data %%%%%%%%%%%%%", req.decoded);

	let orderParams = {
    user_id: req.decoded.user_id,

    order_id : req.body.order_id,
    customer_id : req.body.customer_id,
    products_id : req.body.products_id,
    order_type : req.body.order_type,
    flexOrderType : req.body.flexOrderType,
    fixedOrderType : req.body.fixedOrderType,
    payment_mode : req.body.payment_mode,
    order_date : req.body.order_date, 
    budget_list : req.body.budget_list,

    assigned_to : 4,
    is_active : req.body.is_active,
    created_by: req.decoded.id,
  };
  console.log('oorder list',orderParams);
	try{
  
    // orderParams.created_by = req.decoded.id;
	  const newOrder = new Order(orderParams);
    newOrder.postOrder().then(function(result){
      new Order({user_id : req.decoded.user_id}).getAll().then(function (enquiryList) {
        res.send({ enquiryList: enquiryList });
      });
      console.log('result controller...',result);
    });
	}catch(err){
    console.log("Error..",err);
	}
};


module.exports = { getnewid, postOrder, getAll, convert, convertedList};