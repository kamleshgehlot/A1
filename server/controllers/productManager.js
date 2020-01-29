const ProductManager = require('../models/ProductManager');

const getTabRelatedRecord = async function(req, res, next) {
  const params = {        
    user_id: req.decoded.user_id,
    tabValue: req.body.tabValue,
  };
  
  try {    
    console.log(params)
    const activity = new ProductManager(params);

    if(req.body.tabValue === 0){
      const result = await activity.getTabRelatedRecord();      
      // console.log('result....',result)
      // console.log('....',Object.values(result))
    }
    

    // const result = await newReport.getTabRelatedRecord();      
    res.send([]);
  } catch (error) {
    next(error);
  }
};


// const getOrderReport = async function(req, res, next) {
//   const ReportParams = {
//     customer_id : req.body.customer_id,
//     order_id : req.body.order_id,
//     to_date : req.body.to_date,
//     from_date : req.body.from_date,
//     user_id: req.decoded.user_id,
//   };
  
//   try {
//     const newReport = new Report(ReportParams);
//     const result = await newReport.getOrderReport();      
//     res.send(result);
//   } catch (error) {
//     next(error);
//   }
// };


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
};
