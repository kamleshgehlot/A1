const Order = require('../../models/franchise/order.js');
const UploadDocument = require('../../models/franchise/orderDocumentUpload.js');

const uploadDoc = async function (req, res, next) {
  // console.log('rows data',req.body.data);

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

      const result = await newDoc.uploadDoc();
      // console.log('rows model',result);
      const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
      if(result){
        res.send({ order: order, isUploaded: result.isUploaded}); 
      }else{
        res.send({ order: order, isUploaded: 0});
      }      
	}catch(err){
    next(error);
	}
};




const uploadDeliveryDoc = async function (req, res, next) {
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

	    const result = await newDoc.uploadDeliveryDoc();
      const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
      if(result){
        res.send({ order: order, isUploaded: result.isUploaded}); 
      }else{
        res.send({ order: order, isUploaded: 0});
      }   
	}catch(err){
    next(error);
	}
};


const postComment = async function (req, res, next) {

  let commentParams = {
    order_id: req.body.order_id,
    userid: req.body.user_id,
    user_role: req.body.user_role,
    comment: req.body.comment,    
    user_id : req.decoded.user_id,
  };
	try{
      const newComment = new Order(commentParams);

      const result = await newComment.postComment();
      // console.log('comment result',result);
      // const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
      if(result){
        res.send(result); 
      }else{
        res.send({ isSucceeded: 0});
      }   
	}catch(err){
    next(error);
	}
};



const getComment = async function (req, res, next) {

  let commentParams = {
    order_id: req.body.order_id,
    user_id : req.decoded.user_id,
  };
	try{
      const newComment = new Order(commentParams);

	    const result = await newComment.getComment();
       res.send(result); 
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
    // console.log('req--',req.body)
    const budget = await new Order({
      user_id : req.decoded.user_id,       
      customer_id : req.body.customer_id,
      budgetId : req.body.budgetId}).getBudget();
    // const oldBudget = await new Order({user_id : req.decoded.user_id, budgetId: req.body.budgetId, customer_id:  order[0].customer_id}).getOldBudget();
    
    res.send(budget); 
  } catch (error) {
    next(error);
  }
};


const getExistingBudget = async function(req, res, next) {
  try {
    const oldBudget = await new Order({user_id : req.decoded.user_id, customer_id: req.body.customer_id}).getExistingBudget();
    // console.log('budget List',oldBudget);
    if(oldBudget == ""){
      res.send([{accomodation: 0, afford_amt: 0, benefits: 0, childcare: 0, credit_card: 0, customer_id: '', expenditure: 0, food: 0, income: 0, is_active: '', loan: 0, mobile: 0, other_expenditure: 0, power: 0, rent: 0, surplus: 0, telephone: 0, transport: 0, vehicle: 0, vehicle_fuel: 0, work: 0,}]);
    }else{
      res.send(oldBudget); 
    }
  } catch (error) {
    next(error);
  }
};



const getBudgetHistory = async function(req, res, next) {
  try {
    const oldBudget = await new Order({user_id : req.decoded.user_id, customer_id: req.body.customer_id}).getBudgetHistory();
    // console.log('budget List',oldBudget);
    // if(oldBudget == ""){
    //   res.send([{accomodation: '', afford_amt: '', benefits: '', childcare: '', credit_card: '', customer_id: '', expenditure: '', food: '', income: '', is_active: '', loan: '', mobile: '', other_expenditure: '', power: '', rent: '', surplus: '', telephone: '', transport: '', vehicle: '', work: '',}]);
    // }else{
      res.send(oldBudget); 
    // }
  } catch (error) {
    next(error);
  }
};




const updateBudget = async function(req, res, next) {  
  // console.log('budget list', req.body);
  try {
    const oldBudget = await new Order({user_id : req.decoded.user_id, customer_id: req.body.customer_id, budget_list: req.body.budgetList, created_by: req.decoded.id}).updateBudget();
    if(oldBudget != ""){
      res.send({isUpdated:1}); 
    }else{
      res.send({isUpdated:0}); 
    }
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
    const order = await new Order({user_id : req.decoded.user_id, flexOrderId: req.body.flexOrderId}).getFlexOrder();
    // console.log('order',order);
    res.send(order);
  } catch (error) {
    next(error);
  }
};


const getPaymentHistory = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id, id: req.body.id}).getPaymentHistory();
    // console.log('payment history',order);
    res.send(order);
  } catch (error) {
    next(error);
  }
};


const getRequiredDataToCancel = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id, id: req.body.id}).getRequiredDataToCancel();
    // console.log('cancellation data',order);
    res.send(order);
  } catch (error) {
    next(error);
  }
};

const paymentSubmit = async function(req, res, next) {
  // console.log('req.body  order',req.body)
  try {
    const payment = await new Order({
      user_id : req.decoded.user_id, 
      order_id : req.body.order_id,
      customer_id: req.body.customer_id,
      installment_no : req.body.installment_no,
      payment_date: req.body.payment_date,
      payment_amt : req.body.payment_amt,
      total_paid : req.body.total_paid,
      // status : req.body.status, 
      created_by: req.decoded.id,    
      installment_before_delivery : req.body.installment_before_delivery,
      last_installment_no : req.body.last_installment_no,
      payment_rec_date : req.body.payment_rec_date,
    }).paymentSubmit();

    // const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
      res.send({});
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

const assignToDelivery = async function(req, res, next) {
  try {
    await new Order({user_id : req.decoded.user_id, assigned_to: req.body.assigned_to, id: req.body.id}).assignToDelivery();
    const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
    res.send({ order: order});
  } catch (error) {
    next(error);
  }
};

const Delivered = async function(req, res, next) {
  try {
    await new Order({user_id : req.decoded.user_id, assigned_to: req.body.assigned_to, id: req.body.id, delivered_date: req.body.delivered_date, delivered_time: req.body.delivered_time }).Delivered();
    const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
    res.send({ order: order});
  } catch (error) {
    next(error);
  }
};




const submitCancel = async function(req, res, next) {
  try {
    const result = await new Order({
      user_id : req.decoded.user_id,
      id: req.body.id,
      budgetId : req.body.budget_id,
      order_type: req.body.order_type,
      order_type_id : req.body.order_type_id,
      refund : req.body.refund,
      cancel_by : req.body.cancel_by,
      cancel_reason : req.body.cancel_reason,
      cancellation_charge : req.body.cancellation_charge,
    }).submitCancel();
    const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
    res.send({ order: order});
  } catch (error) {
    next(error);
  }
};


const postOrder = async function (req, res, next) {
  // console.log('req.oerder',req.body);
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
    duration : req.body.duration,
    
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
      duration :req.body.duration,
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
        console.log('hello.',req.body.data);
        try{
          const budget = await new Order({user_id : req.decoded.user_id, budgetId: req.body.data.budget_id, customer_id: req.body.data.customer_id}).getBudget();
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
        const budget = await new Order({user_id : req.decoded.user_id, budgetId: req.body.data.budget_id, customer_id: req.body.data.customer_id}).getBudget();
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

module.exports = { 
  getnewid, 
  uploadDoc, 
  postComment,
  getComment,
  uploadDeliveryDoc,
  getFlexOrderDataForPDF, 
  getFixedOrderDataForPDF, 
  getRequiredDataToCancel,
  postOrder, 
  submitCancel,
  getAll, 
  getBudget, 
  getExistingBudget,
  getBudgetHistory,
  updateBudget,
  getFixedOrder, 
  getFlexOrder, 
  editOrder, 
  assignToFinance, 
  assignToDelivery, 
  getPaymentHistory, 
  paymentSubmit, 
  Delivered 
};