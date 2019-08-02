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
  
  if(orderParams.user_id!= '' 
  && orderParams.order_id!= null 
  && orderParams.customer_id!= null 
  && orderParams.products_id!= '' 
  && orderParams.order_type!= null 
  && orderParams.budget_list != "" 
  && orderParams.order_date!= ''
  && orderParams.payment_mode!= null 
  && orderParams.assigned_to != null 
  && (orderParams.flexOrderType!=null || orderParams.fixedOrderType!= null)){
    try{
      const newOrder = new Order(orderParams);
      newOrder.postOrder().then(function(result){
        const lastInsertId = result.insertId;
        // console.log('resultid',lastInsertId);
        new Order({user_id : req.decoded.user_id, lastInsertId : lastInsertId}).getBudget().then(function (budgetList) {

          if(orderParams.flexOrderType!=null){
            new Order({user_id : req.decoded.user_id, lastInsertId : lastInsertId}).getFlexOrderDetail().then(function (flexPaymentList) {
              new Order({user_id : req.decoded.user_id, lastInsertId : lastInsertId}).getOrderData().then(function (orderList) {
                res.send({budgetList : budgetList, flexPaymentList: flexPaymentList, orderList: orderList });
              });
            });
          }

          if(orderParams.flexOrderType!=null){
            new Order({user_id : req.decoded.user_id, lastInsertId : lastInsertId}).getFixedOrderDetail().then(function (fixedPaymentList) {
              new Order({user_id : req.decoded.user_id, lastInsertId : lastInsertId}).getOrderData().then(function (orderList) {
                res.send({budgetList : budgetList, fixedPaymentList: fixedPaymentList, orderList: orderList });
              });
            });
          }

        });
      });
      
    }catch(err){
      console.log("Error..",err);
    }
  }else{
    console.log('Invalid or Incomplete Credentials');
  }
};

module.exports = { getnewid, postOrder, getAll, convert, convertedList};