const ProductManager = require('../models/ProductManager');

const combineResult = (params) => {
  let productList = params.productList;
  const orderedProduct = params.orderedProduct;
  let combineResult = [];
  
  if(productList !== "" && productList !== null && productList !== undefined && orderedProduct !== "" && orderedProduct !== null && orderedProduct !== undefined){
    (productList.length > 0 ? productList : []).map((product, index) => {
      (orderedProduct.length > 0 ? orderedProduct : []).map(count => {
        if(product.id === count.product_id){
          product.total_rented = count.total_rented;
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
    tabValue: req.body.tabValue,
  };
  
  try {
    const activity = new ProductManager(params);
    const result = await activity.getRentedOrder();      
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
