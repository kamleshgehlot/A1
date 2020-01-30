const ProductManager = require('../models/ProductManager');

const getTabRelatedRecord = async function(req, res, next) {
  const params = {        
    user_id: req.decoded.user_id,
    tabValue: req.body.tabValue,
  };
  // console.log('product manager...', params);
  try {
    
    const activity = new ProductManager(params);

    if(req.body.tabValue === 0){
      const result = await activity.getAllRelatedRecord();
      let productList = result.productList;
      const orderedProduct = result.orderedProduct;
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
      res.send({productList: combineResult});
    }else if(req.body.tabValue === 1){
      const result = await activity.getDeliveredRelatedRecord();
      let productList = result.productList;
      const orderedProduct = result.orderedProduct;
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
        // console.log('combineResult', combineResult)
      }
      res.send({productList: combineResult});      
    }
  } catch (error) {
    next(error);
  }
};


const getRentedOrder = async function(req, res, next) {
  const params = {
    user_id: req.decoded.user_id,
    productId: req.body.productId,
    product_state: req.body.product_state,
  };
  
  try {
    const activity = new ProductManager(params);
    const result = await activity.getRentedOrder();      
    res.send({orderList: result});
  } catch (error) {
    next(error);
  }
};


// const getDeliveryReport = async function(req, res, next) {
//   const ReportParams = {
//     required_type : req.body.required_type,
//     to_date : req.body.to_date,
//     from_date : req.body.from_date,
//     user_id: req.decoded.user_id,
//   };

  
//   try {
//     const newReport = new Report(ReportParams);
    
//     const result = await newReport.getDeliveryReport();      
//     res.send(result);
    

//   } catch (error) {
//     next(error);
//   }
// };


// const getTaskReport = async function(req, res, next) {
//   const ReportParams = {
//     to_date : req.body.to_date,
//     from_date : req.body.from_date,
//     user_id: req.decoded.user_id,
//   };
  
//   try {
//     const newReport = new Report(ReportParams);
    
//     const result = await newReport.getTaskReport();      
//     res.send(result);
//   } catch (error) {
//     next(error);
//   }
// };


// const getDueTaskReport = async function(req, res, next) {
//   const ReportParams = {
//     today_date : req.body.today_date,
//     user_id: req.decoded.user_id,
//   };
  
//   try {
//     const newReport = new Report(ReportParams);
//     const result = await newReport.getDueTaskReport();      
//     res.send(result);

//   } catch (error) {
//     next(error);
//   }
// };
module.exports = {
  getTabRelatedRecord,  
  getRentedOrder
};
