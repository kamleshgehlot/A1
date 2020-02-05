const ProductManager = require('../models/productManager');

const combineResult = (params) => {
  let productList = params.productList;
  const orderedProduct = params.orderedProduct;
  let combineResult = [];
  
  if(productList !== "" && productList !== null && productList !== undefined && orderedProduct !== "" && orderedProduct !== null && orderedProduct !== undefined){
    (productList.length > 0 ? productList : []).map((product, index) => {
      (orderedProduct.length > 0 ? orderedProduct : []).map(count => {
        if(product.id === count.product_id){
          product.total_rented = count.total_rented;
          product.rented_order = count.rented_order;
          combineResult.push(product);
        }
      })
    })       
  }
  return combineResult;
}

const getTabRelatedRecord = async function(req, res, next) {
  const params = {        
    user_id: req.decoded.user_id,
    tabValue: req.body.tabValue,
  };
  try {
    const activity = new ProductManager(params);
    let result = [];
      if(req.body.tabValue === 0){
        result = await activity.getAllRelatedRecord();
      }else if(req.body.tabValue !== 0){
        result = await activity.getStateRelatedRecord();
      }
    const finalResult = await combineResult(result);

    res.send({productList: finalResult});
  } catch (error) {
    next(error);
  }
};


const getRentedOrder = async function(req, res, next) {
  const params = {
    user_id: req.decoded.user_id,
    productId: req.body.productId,
    rentedOrder: req.body.rentedOrder,
    tabValue: req.body.tabValue,
  };
  
  try {
    const activity = new ProductManager(params);
    const result = await activity.getRentedOrder();

    // let finalResult = [];
    // Object.values(result).map(data => {
    //   if(data.product_id !== '' && data.product_id !== undefined){        
    //     let filterList =  Object.values(data.product_id.split(',')).filter(id => id == params.productId);
    //     if(filterList !== "" && filterList.length > 0){
    //       finalResult.push(data);
    //     }
    //   }
    // });
    
    res.send({orderList: result});
  } catch (error) {
    next(error);
  }
};


const getProductState = async function(req, res, next) {
  const params = {    
    user_id: req.decoded.user_id,
  };
  console.log(params)
  try {
    const activity = new ProductManager(params);
    const result = await activity.getProductState();      
    res.send({stateList: result});    
  } catch (error) {
    next(error);
  }
};



const changeProductState = async function(req, res, next) {
  const params = {    
    user_id: req.decoded.user_id,
    productId : req.body.productId,
    orderId : req.body.orderId,
    customerId: req.body.customerId,
    tabValue: req.body.tabValue,
    newState: req.body.newState,
  };
  console.log(params)
  try {
    const activity = new ProductManager(params);
    await activity.changeProductState();
    
    let result = [];
    if(req.body.tabValue !== 0){
      result = await activity.getStateRelatedRecord();
    }
    
    const finalResult = await combineResult(result);
    const orderList = await activity.getRentedOrder();

    res.send({productList: finalResult, orderList: orderList});    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTabRelatedRecord,  
  getRentedOrder,
  getProductState,
  changeProductState
};
