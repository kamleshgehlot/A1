const Order = require('../../models/franchise/order.js');
const Customer = require('../../models/franchise/customer.js');
const UploadDocument = require('../../models/franchise/orderDocumentUpload.js');
const addSubtractDate = require("add-subtract-date");
const moment = require('moment');
const {dateMaker} = require('../../utils/PaymentScheduleDateMaker.js');


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



const getBudgetComments = async function (req, res, next) {

  let commentParams = {
    customer_id: req.body.customer_id,
    user_id : req.decoded.user_id,
  };
	try{
      const newComment = new Order(commentParams);
	    const result = await newComment.getBudgetComments();
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


const getSingleOrderData = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id, order_id: req.body.order_id}).getSingleOrderData();

    res.send( order );
  } catch (error) {
    next(error);
  }
};


const archiveOrder = async function(req, res, next) {
  // console.log('req.body',req.body)
  try {
    const result = await new Order({user_id : req.decoded.user_id, order_id: req.body.order_id}).archiveOrder();

    const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
    res.send({ order: order});
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
      res.send([{accomodation: 0, afford_amt: 0, benefits: 0, childcare: 0, credit_card: 0, customer_id: '', expenditure: 0, food: 0, income: 0, is_active: '', loan: 0, mobile: 0, other_expenditure: [], other_income: [], power: 0, rent: 0, surplus: 0, telephone: 0, transport: 0, vehicle: 0, vehicle_fuel: 0, work: 0,}]);
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
      res.send(oldBudget);     
  } catch (error) {
    next(error);
  }
};




const updateBudget = async function(req, res, next) {  
  // console.log('budget list', req.body);
  let orderParams ={
    user_id : req.decoded.user_id,
    customer_id: req.body.customer_id, 
    budget_list: req.body.budgetList, 
    created_by: req.decoded.id,
  }
  try {
    const newOrder = new Order(orderParams);
    const result = await newOrder.updateBudget();
    // const result = await new Order({user_id : req.decoded.user_id, customer_id: req.body.customer_id, budget_list: req.body.budgetList, created_by: req.decoded.id}).updateBudget();
    console.log('dasaf',orderParams.budget_list.budget_note);
    if(orderParams.budget_list.budget_note != "" && orderParams.budget_list.budget_note != undefined && result != ""){
      newOrder.budget_id = result.budget_id;
      newOrder.order_id = 0;
      newOrder.comment = orderParams.budget_list.budget_note;
      await newOrder.postBudgetComment();
    }
    if(result != ""){
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
    res.send(order);
  } catch (error) {
    next(error);
  }
};


const getPaymentHistory = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id, id: req.body.id}).getPaymentHistory();
    res.send(order);
  } catch (error) {
    next(error);
  }
};


const getPaymentSchedule = async function(req, res, next) {
  try {
    const order = await new Order({user_id : req.decoded.user_id, order_id: req.body.order_id }).getPaymentSchedule();
    res.send(order);
  } catch (error) {
    next(error);
  }
};

// const getFullPaymentHistory = async function(req, res, next) {
//   try {
//     const order = await new Order({user_id : req.decoded.user_id, id: req.body.id}).getFullPaymentHistory();
//     res.send(order);
//   } catch (error) {
//     next(error);
//   }
// };



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

  // const data = JSON.parse(req.body.data);
  // let attachments = '';
  // req.files.map((file) => {
  //   attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  // });

  let params = {
    // payment_table_id : data.payment_table_id,
    user_id : req.decoded.user_id, 
    order_id : req.body.order_id,
    customer_id: req.body.customer_id,
    // transaction_id : data.transaction_id,
    installment_no : Number(req.body.installment_no),
    payment_date: req.body.payment_date,
    payment_amt : Number(req.body.payment_amt),
    // late_fee : Number(data.late_fee),
    // interest_amt : Number(data.interest_amt),
    total_paid : Number(req.body.total_paid),
    due_installment_amt : Number(req.body.due_installment_amt),
    sub_installment_no : Number(req.body.sub_installment_no),
    created_by: req.decoded.id,    
    installment_before_delivery : Number(req.body.installment_before_delivery),
    last_installment_no : Number(req.body.last_installment_no),
    payment_rec_date : req.body.payment_rec_date,
    each_payment_amt : Number(req.body.each_payment_amt),
    frequency : req.body.frequency,
    schedule_status : 0,
    // transaction_date : data.payment_rec_date,
    // transaction_amt : Number(data.payment_amt),
    // comment : data.comment,
    // document :  attachments,  
  }   
  console.log('params',params);
  try {
    const newPayment = new Order(params);
    // const newDoc = new UploadDocument(params);

    
    // if(params.transaction_id != "" && params.transaction_id != undefined && params.transaction_id !=0){
    //   await newPayment.deadTocurrentInstallment();
    
    //   if(params.document !== "" && params.document != undefined){
    //     await newDoc.uploadPaymentDoc();
    //   }
  
    //   if(params.comment !== "" && params.comment != undefined){
    //     await newPayment.leaveCommentForPayment();
    //   }
    // }

    
    
    // const transaction_result = await newPayment.transactionEntry();
    // newPayment.transaction_id = transaction_result.transaction_id;

    let payAmt = params.payment_amt;
    let instNo = params.installment_no;

    if(params.payment_amt === params.each_payment_amt){
      if(params.due_installment_amt === 0){
        newPayment.total_paid = newPayment.total_paid + params.payment_amt;
        await newPayment.paymentSubmit();

        newPayment.schedule_status = 1;
        await newPayment.updateSchedule();
      }else if(params.due_installment_amt > 0){
          
          let due = params.due_installment_amt;

          newPayment.due_installment_amt = 0;
          newPayment.sub_installment_no = newPayment.sub_installment_no + 1;
          newPayment.payment_amt = params.due_installment_amt;
          newPayment.total_paid = newPayment.total_paid + params.due_installment_amt;
          const payment = await newPayment.paymentSubmit();
          
          newPayment.schedule_status = 1;
          await newPayment.updateSchedule();
          
          payAmt = payAmt - due;         
          newPayment.due_installment_amt = params.each_payment_amt - payAmt;
          newPayment.sub_installment_no = 1;
          newPayment.payment_amt = payAmt;
          newPayment.total_paid = newPayment.total_paid + payAmt;
          newPayment.installment_no = instNo + 1;
          newPayment.payment_date = dateMaker(newPayment.payment_date, params.frequency);
          const payment1 = await newPayment.paymentSubmit();
          
          newPayment.schedule_status = 2;
          await newPayment.updateSchedule(); 
        }
    }



    if(params.payment_amt < params.each_payment_amt){
      
      if(params.due_installment_amt === 0){
        newPayment.total_paid = newPayment.total_paid + params.payment_amt;
        newPayment.due_installment_amt = params.each_payment_amt - params.payment_amt;
        newPayment.sub_installment_no = 1;
        const payment = await newPayment.paymentSubmit();
        
        newPayment.schedule_status = 2;
        await newPayment.updateSchedule(); 
      }else if(params.due_installment_amt > 0){
        if(params.due_installment_amt >= params.payment_amt){
          newPayment.total_paid = newPayment.total_paid + params.payment_amt;
          newPayment.due_installment_amt = params.due_installment_amt - params.payment_amt;
          newPayment.sub_installment_no = newPayment.sub_installment_no + 1;
          const payment = await newPayment.paymentSubmit();
          
          if(params.due_installment_amt == params.payment_amt){
            newPayment.schedule_status = 1;
          }else{
            newPayment.schedule_status = 2;            
          }
          await newPayment.updateSchedule(); 
        }else if(params.due_installment_amt < params.payment_amt){
          let due = params.due_installment_amt;
         
          newPayment.due_installment_amt = 0;
          newPayment.sub_installment_no = newPayment.sub_installment_no + 1;
          newPayment.payment_amt = params.due_installment_amt;
          newPayment.total_paid = newPayment.total_paid + params.due_installment_amt;
          const payment = await newPayment.paymentSubmit();

          newPayment.schedule_status = 1;
          await newPayment.updateSchedule(); 

          payAmt = payAmt - due;         
          newPayment.due_installment_amt = params.each_payment_amt - payAmt;
          newPayment.sub_installment_no = 1;
          newPayment.payment_amt = payAmt;
          newPayment.total_paid = newPayment.total_paid + payAmt;
          newPayment.installment_no = instNo + 1;
          newPayment.payment_date = dateMaker(newPayment.payment_date, params.frequency);
          const payment1 = await newPayment.paymentSubmit();
          newPayment.schedule_status = 2;
          await newPayment.updateSchedule(); 
        }
      }
    }

    if(params.payment_amt > params.each_payment_amt){
      
        if(params.due_installment_amt > 0){
          let dueAmt = params.due_installment_amt;
          newPayment.payment_amt = dueAmt;
          newPayment.total_paid = newPayment.total_paid + dueAmt;
          newPayment.installment_no = instNo;
          newPayment.sub_installment_no = params.sub_installment_no + 1;
          newPayment.due_installment_amt = 0;
          const payment = await newPayment.paymentSubmit();

          newPayment.schedule_status = 1;
          await newPayment.updateSchedule(); 

          instNo = instNo + 1;
          payAmt = payAmt - dueAmt;
          newPayment.sub_installment_no = 0;
          newPayment.payment_date =  dateMaker(newPayment.payment_date, params.frequency);
        }

        let eachPayAmt =params.each_payment_amt;
        let advanceTime = Math.ceil(payAmt/eachPayAmt);        

        for(let i=1; i<= advanceTime; i++){
            if(payAmt >= eachPayAmt){
              newPayment.payment_amt = eachPayAmt;
              newPayment.total_paid =  newPayment.total_paid + eachPayAmt;
              newPayment.installment_no = instNo;
              instNo = instNo + 1;
              
              newPayment.schedule_status = 1;
            }else{
              newPayment.payment_amt = payAmt;
              newPayment.total_paid = newPayment.total_paid + payAmt;
              newPayment.installment_no = instNo;
              newPayment.sub_installment_no = 1;
              newPayment.due_installment_amt = eachPayAmt - payAmt;

              newPayment.schedule_status = 2;              
            }
            const payment = await newPayment.paymentSubmit();
            await newPayment.updateSchedule(); 
            payAmt = payAmt - eachPayAmt;
            newPayment.payment_date =  dateMaker(newPayment.payment_date, params.frequency);
          }
    }
    res.send({});

  } catch (error) {
    next(error);
  }
};



// const editInstallment = async function (req, res, next) {
//   const data = JSON.parse(req.body.data);
//   let attachments = '';
//   req.files.map((file) => {
//     attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
//   });

// 	let orderParams = {
//     document :  attachments,
//     created_by : req.decoded.id,
//     user_id : req.decoded.user_id,

//     payment_table_id : data.payment_table_id,
//     order_id : data.order_id,
//     customer_id: data.customer_id,
//     installment_no : Number(data.installment_no),
//     payment_date: data.payment_date,
//     payment_amt : Number(data.payment_amt),
//     late_fee : Number(data.late_fee),
//     interest_amt : Number(data.interest_amt),
//     total_paid : Number(data.total_paid),
//     due_installment_amt : Number(data.due_installment_amt),
//     sub_installment_no : Number(data.sub_installment_no),    
//     payment_rec_date : data.payment_rec_date,
//     comment : data.comment,     
//   };

// 	try{
//     const newDoc = new UploadDocument(orderParams);
//     const newQuery = new Order(orderParams);

//     if(orderParams.document !== "" && orderParams.document != undefined){
//       await newDoc.uploadPaymentDoc();
//     }

//     if(orderParams.comment !== "" && orderParams.comment != undefined){
//       await newQuery.leaveCommentForPayment();
//     }

//     const result = await newQuery.updateInstallment();
//     await newQuery.deadTocurrentInstallment();

//     res.send({isSuccessful : result});
// 	}catch(err){
//     next(error);
// 	}
// };


const assignToFinance = async function(req, res, next) {
  let params = {
    user_id : req.decoded.user_id,
    assigned_to: req.body.assigned_to, 
    order_id: req.body.id,
    customer_id : req.body.customer_id,
    created_by : req.decoded.id,
    order_type : req.body.order_type,
    order_type_id : req.body.order_type_id,
  };

  try {
    const newActivity = new Order(params);
    await newActivity.assignToFinance();

    let orderTypeResult = [];
    let noOfPayment = 0;

    if(params.order_type === 1){
      newActivity.fixedOrderId = params.order_type_id;
      orderTypeResult = await newActivity.getFixedOrder();
      noOfPayment =  orderTypeResult[0].no_of_payment;
    } else if(params.order_type === 2){
      newActivity.flexOrderId = params.order_type_id;
      orderTypeResult = await newActivity.getFlexOrder();
      noOfPayment =  orderTypeResult[0].before_delivery_amt;
    }
    

    let paymentDate = moment(orderTypeResult[0].first_payment).format("YYYY-MM-DD");
    let paymentScheduleArray = [];
    
    for(let i=1; i<= noOfPayment; i++){
      paymentScheduleArray.push(
        [params.order_id, params.customer_id, i, paymentDate, 0, 1, params.created_by],
      );      
      paymentDate = dateMaker(paymentDate, orderTypeResult[0].frequency);
    }

    newActivity.paymentScheduleArray = paymentScheduleArray;

    await newActivity.createdPaymentSchedule();    

    
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
    sales_type_id : req.body.sales_type_id,
    renting_for_id : req.body.renting_for_id,
    sales_person_id : req.body.sales_person_id,
    
    converted_to : req.body.converted_to,
    ezidebit_uid : req.body.ezidebit_uid,
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

      const result = await newOrder.postOrder();

      if(req.body.converted_to !== 0){
        if(req.body.converted_name === 'lead'){
          newOrder.convertedLead(function(res){});
        } else if(req.body.converted_name === 'enquiry'){
          newOrder.convertedEnquiry(function(res){});
        }
      }

      if(orderParams.budget_list.budget_note != "" && orderParams.budget_list.budget_note != undefined){
        newOrder.budget_id = result.budget_id;
        newOrder.order_id = result.order_id;
        newOrder.comment = orderParams.budget_list.budget_note;
        await newOrder.postBudgetComment();
      }
        
        const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
        res.send({ order: order});
    }catch(err){
      next(err);
    }
  }else{
    console.log('Invalid or Incomplete Credentials');
    res.send('invalid');
  }
};

const editOrder = async function (req, res, next) {
  // console.log('req.order',req.body);
  
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
      sales_type_id : req.body.sales_type_id,
      renting_for_id : req.body.renting_for_id,
      sales_person_id : req.body.sales_person_id,
      ezidebit_uid : req.body.ezidebit_uid,
      order_status : req.body.order_status,
    };

    if(orderParams.user_id!= '' 
    && orderParams.products_id!= '' 
    && orderParams.order_type!= null 
    && orderParams.budget_list != null 
    && orderParams.payment_mode!= null 
    && orderParams.assigned_to != null 
    && (orderParams.flexOrderType!=null || orderParams.fixedOrderType!= null)){
      try{
        const newOrder = new Order(orderParams);  

        if(orderParams.order_status === 11 ){
          await new Order({user_id : req.decoded.user_id, order_id : req.body.o_id}).regenerateOrder();
        }        
        const result = await newOrder.editOrder();        
        const order = await new Order({user_id : req.decoded.user_id}).getOrderList();
        
          res.send({ order: order});
        
      }catch(err){
        next(err);
      }
    }else{
      console.log('Invalid or Incomplete Credentials');
      res.send('invalid');
    }
  };

  
  const submitDeliveredProduct = async function (req, res, next) {
    let orderParams = {
      id : req.body.id,
      user_id: req.decoded.user_id,  
      userid: req.decoded.userId,    
      product_brand : req.body.product_brand,
      product_color : req.body.product_color,
      product_cost : req.body.product_cost,
      specification : req.body.specification,
      invoice_number : req.body.invoice_number,
      delivery_date : req.body.delivery_date,
      purchase_from : req.body.purchase_from,

      products_id : req.body.product_id,
      customer_id : req.body.customer_id,
      related_to : req.body.related_to,
      
      order_id: req.body.order_id,
      user_role: req.body.user_role,
      comment: req.body.comment, 

      assigned_to: req.body.assigned_to,       
      delivered_date: req.body.delivered_date, 
      delivered_time: req.body.delivered_time,

      created_by : req.decoded.id,
    };
    // console.log('req.',orderParams);
    
    try {
      const newOrder = new Order(orderParams);

      const postComment = await newOrder.postComment();
      const delivered   = await newOrder.Delivered();
      const postProductDetail = await newOrder.submitDeliveredProduct();
      
      const order = await newOrder.getOrderList();
      res.send({ order: order});

    } catch (error) {
      next(error);
    }
  };


  const getProductAndCategoryName = async function(req, res, next) {
    let orderParams = {
      user_id: req.decoded.user_id,      
      products_id : req.body.product_id,
    };
    try {
      const newOrder = new Order(orderParams);
      const result = await newOrder.getProductAndCategoryName();
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  const getDeliveredProductData = async function(req, res, next) {
    let orderParams = {
      id: req.body.order_id,
      user_id: req.decoded.user_id, 
      customer_id : req.body.customer_id,
    };
    try {
      const newOrder = new Order(orderParams);
      const result = await newOrder.getDeliveredProductData();
      res.send(result);
    } catch (error) {
      next(error);
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
        try{

          const budget = await new Order({user_id : req.decoded.user_id, budgetId: req.body.data.budget_id, customer_id: req.body.data.customer_id}).getBudget();
          const budgetComment = await new Order({user_id : req.decoded.user_id, customer_id: req.body.data.customer_id}).getBudgetComments();
          const flexOrder = await new Order({user_id : req.decoded.user_id, flexOrderId: req.body.data.order_type_id}).getFlexOrder();
          const customer = await new Order({user_id : req.decoded.user_id, lastInsertId : req.body.data.customer_id}).getCustomerDetails();
          const franchise = await new Order({user_id : req.decoded.user_id}).getCompanyDetail();
          const product = await new Order({products_id: req.body.data.product_id}).getProductDetail();
          const user = await new Order({user_id : req.decoded.user_id, id: req.decoded.id}).getCSRDetail();
          const bankDetail = await new Customer({user_id : req.decoded.user_id, customer_id: req.body.data.customer_id}).getCustomerBankDetail();

          res.send({ budget: budget, orderType:flexOrder, customer: customer, franchise: franchise, product:product, user: user, budgetComment: budgetComment, bankDetail: bankDetail });

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
      try{
        const budget = await new Order({user_id : req.decoded.user_id, budgetId: req.body.data.budget_id, customer_id: req.body.data.customer_id}).getBudget();
        const budgetComment = await new Order({user_id : req.decoded.user_id, customer_id: req.body.data.customer_id}).getBudgetComments();
        const fixedOrder = await  new Order({user_id : req.decoded.user_id, fixedOrderId: req.body.data.order_type_id}).getFixedOrder();
        const customer = await new Order({user_id : req.decoded.user_id, lastInsertId : req.body.data.customer_id}).getCustomerDetails();
        const franchise = await new Order({user_id : req.decoded.user_id}).getCompanyDetail();
        const product = await new Order({products_id: req.body.data.product_id}).getProductDetail();
        const user = await new Order({user_id : req.decoded.user_id, id: req.decoded.id}).getCSRDetail();
        const bankDetail = await new Customer({user_id : req.decoded.user_id, customer_id: req.body.data.customer_id}).getCustomerBankDetail();

        res.send({ budget: budget, orderType:fixedOrder, customer: customer, franchise: franchise, product:product, user: user, budgetComment: budgetComment, bankDetail: bankDetail });

      }catch(err){
        next(err);
      }
    }
  };


  const getSalesTypeList = async function(req, res, next) {
    try {
      const list = await new Order({user_id : req.decoded.user_id}).getSalesTypeList();
      res.send(list);
    } catch (error) {
      next(error);
    }
  };
  const getSalesPersonList = async function(req, res, next) {
    try {
      const list = await new Order({user_id : req.decoded.user_id}).getSalesPersonList();
      res.send(list);
    } catch (error) {
      next(error);
    }
  };  
  
  const getRentingForList = async function(req, res, next) {
    try {
      const list = await new Order({user_id : req.decoded.user_id}).getRentingForList();  
      res.send(list);
    } catch (error) {
      next(error);
    }
  };


  
  // const getSingleTransactionDetail = async function(req, res, next) {
  //   try {
  //     const result = await new Order({user_id: req.decoded.user_id, transaction_id: req.body.transaction_id}).getSingleTransactionDetail();
  //     // console.log('getSingleTransactionDetail',result);
  
  //     res.send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  
  
  const getReceivedPaymentsList = async function(req, res, next) {
    try {
      const result = await new Order({user_id: req.decoded.user_id}).getReceivedPaymentsList();
      res.send(result);
    } catch (error) {
      next(error);
    }
  };


  const fetchMissedPaymentData = async function(req, res, next) {
    try {
      const result = await new Order({user_id: req.decoded.user_id}).fetchMissedPaymentData();
      res.send(result);
    } catch (error) {
      next(error);
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
  // getFullPaymentHistory,
  paymentSubmit, 
  Delivered,
  getDeliveredProductData,
  getProductAndCategoryName,
  submitDeliveredProduct,
  getRentingForList,
  getSalesTypeList,
  getSalesPersonList,
  getBudgetComments,
  // editInstallment,
  // getSingleTransactionDetail,
  getReceivedPaymentsList,
  fetchMissedPaymentData,
  getSingleOrderData,
  archiveOrder,
  getPaymentSchedule,
};