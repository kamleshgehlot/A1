const Order = require('../../models/franchise/order.js');
const UploadDocument = require('../../models/franchise/orderDocumentUpload.js');

const uploadDoc = async function (req, res, next) {
  const OrderData = JSON.parse(req.body.data);
  let attachments = '';
  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

	let orderParams = {
    order_id: OrderData,
    document :  attachments,
    created_by : req.decoded.id,
    user_id : req.decoded.user_id,
  };
	try{
      const newDoc = new UploadDocument(orderParams);

	    await newDoc.uploadDoc();
      const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
      
      res.send({ order: order});
	}catch(err){
    next(error);
	}
};

const getnewid = async function(req, res, next) {
  try {
    const id = await new Order({user_id: req.decoded.user_id}).getnewid();
    
    res.send(id);
  } catch (error) {
    next(error);
  }
};

const getAll = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id}).getOrderList();

    res.send({ order: order });
  } catch (error) {
    next(error);
  }
};

const getBudget = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id, budgetId: req.body.budgetId}).getBudget();
    const oldBudget = await new Order({user_id : req.decoded.user_id, budgetId: req.body.budgetId, customer_id:  order[0].customer_id}).getOldBudget();
    
    res.send({ order , oldBudget}); 
  } catch (error) {
    next(error);
  }
};

const getExistingBudget = async function(req, res, next) {
  try {
    const oldBudget = await new Order({user_id : req.decoded.user_id, customer_id: req.body.customer_id}).getExistingBudget();

    res.send({oldBudget}); 
  } catch (error) {
    next(error);
  }
};

const getFixedOrder = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id, fixedOrderId: req.body.fixedOrderId}).getFixedOrder();
    
    res.send(order);
  } catch (error) {
    next(error);
  }
};

const getFlexOrder = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id, flexOrderId: req.body.flexOrderId});
    
    res.send(order);
  } catch (error) {
    next(error);
  }
};

const assignToFinance = async function(req, res, next) {
  try {
    await new Order({user_id : req.decoded.user_id, assigned_to: req.body.assigned_to, id: req.body.id}).assignToFinance();
    const order = await new Order({user_id : req.decoded.user_id}).getOrderList();

    res.send({ order: order});
  } catch (error) {
    next(error);
  }
};
// const convertedList = async function(req, res, next) {
//   try {
//     new Order({user_id: req.decoded.user_id}).convertedList().then(enquiryList => {
//       res.send({ enquiryList });
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// const convert = async function(req, res, next) {
//   try {
//     new Order({user_id: req.decoded.user_id, enquiry_id: req.body.enquiry_id}).convert().then(result => {
//       new Enquiry({user_id: req.decoded.user_id}).getAll().then(enquiryList => {
//         res.send({ enquiryList });
//       });
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const postOrder = async function (req, res, next) {
	let orderParams = {
    user_id: req.decoded.user_id,
    userid: req.decoded.id,

    order_id : req.body.order_id,
    customer_id : req.body.customer_id,
    customer_type: req.body.customer_type,
    products_id : req.body.products_id,
    order_type : req.body.order_type,
    flexOrderType : req.body.flexOrderType,
    fixedOrderType : req.body.fixedOrderType,
    payment_mode : req.body.payment_mode,
    order_date : req.body.order_date, 
    budget_list : req.body.budget_list,
    related_to : req.body.related_to,
    assigned_to : req.body.assigned_to,
    is_active : req.body.is_active,
    created_by: req.decoded.id,
    
    converted_to : req.body.converted_to,
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

      await newOrder.postOrder();
      if(req.body.converted_to !== 0){
        if(req.body.converted_name === 'lead'){
          newOrder.convertedLead(function(res){});
        } else if(req.body.converted_name === 'enquiry'){
          newOrder.convertedEnquiry(function(res){});
        }
      }
        
        // new Order({user_id : req.decoded.user_id, lastInsertId : result}).selectFromOrder().then(function (orderList) {
        //   new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].customer_id}).getCustomerDetails().then(function (customerList) {
        //     new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].budget_id}).getBudget().then(function (budgetList) {
        const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
            // if(orderParams.flexOrderType!=null && orderList[0].order_type === 2){
            //   new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].order_type_id}).getFlexOrderDetail().then(function (flexPaymentList) {
            //       res.send({budgetList : budgetList, flexPaymentList: flexPaymentList, orderList: orderList, customerList: customerList, order: order});
            //   });
            // }
            // if(orderParams.fixedOrderType!=null && orderList[0].order_type === 1){
            //   new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].order_type_id}).getFixedOrderDetail().then(function (fixedPaymentList) {
            //       res.send({budgetList : budgetList, fixedPaymentList: fixedPaymentList, orderList: orderList, customerList: customerList, order: order });
            //   });
            // }
        res.send({ order: order});
        // });
        // });

        // console.log('resultid',lastInsertId);
        
      // });
      
    }catch(err){
      next(err);
    }
  }else{
    console.log('Invalid or Incomplete Credentials');
    res.send('invalid');
  }
};

const editOrder = async function (req, res, next) {
    let orderParams = {
      id: req.body.id,
      user_id: req.decoded.user_id,      
      products_id : req.body.products_id,
      order_type : req.body.order_type,
      flexOrderType : req.body.flexOrderType,
      fixedOrderType : req.body.fixedOrderType,
      payment_mode : req.body.payment_mode,
      order_date : req.body.order_date, 
      budget_list : req.body.budget_list,
      budgetId: req.body.budget_id,
      order_type_id: req.body.order_type_id,
      assigned_to : req.body.assigned_to,
      related_to : req.body.related_to,
      is_active : req.body.is_active,
      updated_by: req.decoded.id,
    };
    
    // if(orderParams.budget_list == null && orderParams.flexOrderType == null && orderParams.fixedOrderType == null){

    // }
    // else if(orderParams.flexOrderType == null && orderParams.fixedOrderType == null){

    // }
    // else if(orderParams.flexOrderType == null && orderParams.budget_list == null ){

    // }
    // else if(orderParams.fixedOrderType == null &&  orderParams.budget_list == null){
      
    // }

    if(orderParams.user_id!= '' 
    && orderParams.products_id!= '' 
    && orderParams.order_type!= null 
    && orderParams.budget_list != null 
    && orderParams.payment_mode!= null 
    && orderParams.assigned_to != null 
    && (orderParams.flexOrderType!=null || orderParams.fixedOrderType!= null)){
      try{
        const newOrder = new Order(orderParams);
        
        await newOrder.editOrder();
          // new Order({user_id : req.decoded.user_id, lastInsertId : result}).selectFromOrder().then(function (orderList) {
          //   new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].customer_id}).getCustomerDetails().then(function (customerList) {
          //     new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].budget_id}).getBudget().then(function (budgetList) {
        const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
              // if(orderParams.flexOrderType!=null && orderList[0].order_type === 2){
              //   new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].order_type_id}).getFlexOrderDetail().then(function (flexPaymentList) {
              //       res.send({budgetList : budgetList, flexPaymentList: flexPaymentList, orderList: orderList, customerList: customerList, order: order});
              //   });
              // }
              // if(orderParams.fixedOrderType!=null && orderList[0].order_type === 1){
              //   new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].order_type_id}).getFixedOrderDetail().then(function (fixedPaymentList) {
              //       res.send({budgetList : budgetList, fixedPaymentList: fixedPaymentList, orderList: orderList, customerList: customerList, order: order });
              //   });
              // }
          res.send({ order: order});
          // });
          // });
          // });
  
          // console.log('resultid',lastInsertId);
      }catch(err){
        next(err);
      }
    }else{
      console.log('Invalid or Incomplete Credentials');
      res.send('invalid');
    }
  };

  const getFlexOrderDataForPDF = async function (req, res, next) {
      let orderParams = {
        user_id: req.decoded.user_id,

        franchise_id: req.decoded,
        order_id : req.body.data.id,
        customer_id: req.body.data.customer_id,
      };
      
      if(orderParams.order_id!= '' || orderParams.order_id != null){
        // console.log('hello.',orderParams);
        try{
          const budget = await new Order({user_id : req.decoded.user_id, budgetId: req.body.data.budget_id}).getBudget();
              // console.log('budget..',budget)
          const flexOrder = await new Order({user_id : req.decoded.user_id, flexOrderId: req.body.data.order_type_id}).getFlexOrder();
              // console.log('flexOrder..',flexOrder)
          const customer = await new Order({user_id : req.decoded.user_id, lastInsertId : req.body.data.customer_id}).getCustomerDetails();
                    // console.log('customer..',customer)
          const franchise = await new Order({user_id : req.decoded.user_id}).getCompanyDetail();
                      // console.log('franchise..',franchise)
                        // console.log('product..',product)
          const product = await new Order({products_id: req.body.data.product_id}).getProductDetail();
                          // console.log('product..',product)
          const user = await new Order({user_id : req.decoded.user_id, id: req.decoded.id}).getCSRDetail();
                            // console.log('user..',user)
          res.send({ budget: budget, flexOrder:flexOrder, customer: customer, franchise: franchise, product:product, user: user });
              // new Order({user_id : req.decoded.user_id, budgetId: req.body.budgetId, customer_id:  order[0].customer_id}).getOldBudget().then(function (oldBudget) {
              // res.send({ order , oldBudget}); 
            // });
          
          // const newOrder = new Order(orderParams);
          //     newOrder.getFlexOrderDataForPDF().then(function(result){
          //           console.log('resulut===dd', result);
          //       //  new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].budget_id}).getBudget().then(function (budgetList) {
          //       //       new Order({user_id : req.decoded.user_id}).getOrderList().then(function (order) {
             
          //       //         res.send({ order: order});
          //       //   });
          //       // });
          //     });
      }catch(err){
        next(err);
      }
    }
  };
    
  const getFixedOrderDataForPDF = async function (req, res, next) {
    let orderParams = {
      user_id: req.decoded.user_id,

      franchise_id: req.decoded,
      order_id : req.body.data.id,
      customer_id: req.body.data.customer_id,
    };
      
    if(orderParams.order_id!= '' || orderParams.order_id != null){
      // console.log('hello.',orderParams);
      try{
        const budget = await new Order({user_id : req.decoded.user_id, budgetId: req.body.data.budget_id}).getBudget();
            // console.log('budget..',budget)
        const fixedOrder = await  new Order({user_id : req.decoded.user_id, fixedOrderId: req.body.data.order_type_id}).getFixedOrder();
            // console.log('flexOrder..',flexOrder)
        const customer = await new Order({user_id : req.decoded.user_id, lastInsertId : req.body.data.customer_id}).getCustomerDetails();
                  // console.log('customer..',customer)
        const franchise = await new Order({user_id : req.decoded.user_id}).getCompanyDetail();
                    // console.log('franchise..',franchise)
                      // console.log('product..',product)
        const product = await new Order({products_id: req.body.data.product_id}).getProductDetail();
                        // console.log('product..',product)
        const user = await new Order({user_id : req.decoded.user_id, id: req.decoded.id}).getCSRDetail();
                          // console.log('user..',user)
        res.send({ budget: budget, fixedOrder:fixedOrder, customer: customer, franchise: franchise, product:product, user: user });
            // new Order({user_id : req.decoded.user_id, budgetId: req.body.budgetId, customer_id:  order[0].customer_id}).getOldBudget().then(function (oldBudget) {
            // res.send({ order , oldBudget}); 
          // });
        
        // const newOrder = new Order(orderParams);
        //     newOrder.getFlexOrderDataForPDF().then(function(result){
        //           console.log('resulut===dd', result);
        //       //  new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].budget_id}).getBudget().then(function (budgetList) {
        //       //       new Order({user_id : req.decoded.user_id}).getOrderList().then(function (order) {
            
        //       //         res.send({ order: order});
        //       //   });
        //       // });
        //     });
      }catch(err){
        next(err);
      }
    }
  };

module.exports = { getnewid, uploadDoc, getFlexOrderDataForPDF, getFixedOrderDataForPDF, postOrder, getAll, getBudget, getExistingBudget, getFixedOrder, getFlexOrder, editOrder, assignToFinance };