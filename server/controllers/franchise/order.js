const Order = require('../../models/franchise/order.js');
const UploadDocument = require('../../models/franchise/orderDocumentUpload.js');

const uploadDoc = function (req, res, next) {
  // console.log("****************Customer..................", req.body);
  // console.log("%%%%%%%%%%% Customer File %%%%%%%%%%%%%", req.files);
  // console.log("%%%%%%%%%%% Session Data %%%%%%%%%%%%%", req.decoded);



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
	     newDoc.uploadDoc().then(function(result){
            new Order({user_id : req.decoded.user_id}).getOrderList().then(function (order) {
              res.send({ order: order});
      });
    });
	}catch(err){
    console.log("Error..",err);
	}
};


const getnewid = function(req, res, next) {
  try {
    new Order({user_id: req.decoded.user_id}).getnewid().then(id => {
      res.send(id);
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


const getAll = function(req, res, next) {
  try {
    new Order({user_id : req.decoded.user_id}).getOrderList().then(function (order) {
      // console.log('hello --',order);
      res.send({ order: order });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


const getBudget = function(req, res, next) {
  console.log('rows body...',req.body);
  try {
    new Order({user_id : req.decoded.user_id, budgetId: req.body.budgetId}).getBudget().then(function (order) {
      // console.log('ordler..',order[0].customer_id)
      new Order({user_id : req.decoded.user_id, budgetId: req.body.budgetId, customer_id:  order[0].customer_id}).getOldBudget().then(function (oldBudget) {
      res.send({ order , oldBudget}); 
    });
  });
  } catch (error) {
    console.log('Error: ', error);
  }
};

const getExistingBudget = function(req, res, next) {
  console.log('rows body...',req.body);
  try {
    new Order({user_id : req.decoded.user_id, customer_id: req.body.customer_id}).getExistingBudget().then(function (oldBudget) {
      res.send({oldBudget}); 
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};


const getFixedOrder = function(req, res, next) {
  console.log('rows body...',req.body);
  try {
    new Order({user_id : req.decoded.user_id, fixedOrderId: req.body.fixedOrderId}).getFixedOrder().then(function (order) {
      res.send(order);
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

const getFlexOrder = function(req, res, next) {
  console.log('rows body...',req.body);
  try {
    new Order({user_id : req.decoded.user_id, flexOrderId: req.body.flexOrderId}).getFlexOrder().then(function (order) {
      res.send(order);
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};



const assignToFinance = function(req, res, next) {
  console.log('rows body...',req.body);
  try {
    new Order({user_id : req.decoded.user_id, assigned_to: req.body.assigned_to, id: req.body.id}).assignToFinance().then(function (order) {
      new Order({user_id : req.decoded.user_id}).getOrderList().then(function (order) {
        res.send({ order: order});
      });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};
// const convertedList = function(req, res, next) {
//   try {
//     new Order({user_id: req.decoded.user_id}).convertedList().then(enquiryList => {
//       res.send({ enquiryList });
//     });
//   } catch (error) {
//     console.log('Error: ', error);
//   }
// };


// const convert = function(req, res, next) {
//   try {
//     new Order({user_id: req.decoded.user_id, enquiry_id: req.body.enquiry_id}).convert().then(result => {
//       new Enquiry({user_id: req.decoded.user_id}).getAll().then(enquiryList => {
//         res.send({ enquiryList });
//       });
//     });
//   } catch (error) {
//     console.log('Error: ', error);
//   }
// };


const postOrder = function (req, res, next) {
console.log('eeeq.',req);
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
    related_to : req.body.related_to,
    assigned_to : req.body.assigned_to,
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
        // new Order({user_id : req.decoded.user_id, lastInsertId : result}).selectFromOrder().then(function (orderList) {
        //   new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].customer_id}).getCustomerDetails().then(function (customerList) {
        //     new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].budget_id}).getBudget().then(function (budgetList) {
              new Order({user_id : req.decoded.user_id}).getOrderList().then(function (order) {
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
          });
        });
        // });
        // });

        // console.log('resultid',lastInsertId);
        
      // });
      
    }catch(err){
      console.log("Error..",err);
    }
  }else{
    console.log('Invalid or Incomplete Credentials');
    res.send('invalid');
  }
};



const editOrder = function (req, res, next) {
  console.log('eeeq.',req.body);
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
        newOrder.editOrder().then(function(result){
          // new Order({user_id : req.decoded.user_id, lastInsertId : result}).selectFromOrder().then(function (orderList) {
          //   new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].customer_id}).getCustomerDetails().then(function (customerList) {
          //     new Order({user_id : req.decoded.user_id, lastInsertId : orderList[0].budget_id}).getBudget().then(function (budgetList) {
                new Order({user_id : req.decoded.user_id}).getOrderList().then(function (order) {
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
            });
          // });
          // });
          // });
  
          // console.log('resultid',lastInsertId);
          
        });
        
      }catch(err){
        console.log("Error..",err);
      }
    }else{
      console.log('Invalid or Incomplete Credentials');
      res.send('invalid');
    }
  };

  

  const getFlexOrderDataForPDF = function (req, res, next) {
    console.log('eeeq.',req.body);
      let orderParams = {
        user_id: req.decoded.user_id,

        franchise_id: req.decoded,
        order_id : req.body.data.id,
        customer_id: req.body.data.customer_id,


      };
      
      if(orderParams.order_id!= '' || orderParams.order_id != null){
        console.log('hello.',orderParams);
        try{
          new Order({user_id : req.decoded.user_id, budgetId: req.body.data.budget_id}).getBudget().then(function (budget) {
              console.log('budget..',budget)
              new Order({user_id : req.decoded.user_id, flexOrderId: req.body.data.order_type_id}).getFlexOrder().then(function (flexOrder) {
              console.log('flexOrder..',flexOrder)
                  new Order({user_id : req.decoded.user_id, lastInsertId : req.body.data.customer_id}).getCustomerDetails().then(function (customer) {
                    console.log('customer..',customer)
                    new Order({user_id : req.decoded.user_id}).getCompanyDetail().then(function (franchise) {
                      console.log('franchise..',franchise)
                      new Order({products_id: req.body.data.product_id}).getProductDetail().then(function (product) {
                        console.log('product..',product)
                        res.send({ budget: budget, flexOrder:flexOrder, customer: customer, franchise: franchise, product:product });
                      });
                    });
                  });
              });
              // new Order({user_id : req.decoded.user_id, budgetId: req.body.budgetId, customer_id:  order[0].customer_id}).getOldBudget().then(function (oldBudget) {
              // res.send({ order , oldBudget}); 
            // });
          });
          
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
          console.log("Error..",err);
        }
      }
      
    };
    
  


module.exports = { getnewid, uploadDoc, getFlexOrderDataForPDF, postOrder, getAll, getBudget, getExistingBudget, getFixedOrder, getFlexOrder, editOrder, assignToFinance };