const soap = require('soap');
const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');
const { wsdlUrl, custUrl, digitalKey } = require("../lib/ezidebit.js");

var EzidebitPayments = function (params) {
  this.user_id = params.user_id;
  this.payment_type = params.payment_type;
  this.payment_method = params.payment_method;
  this.payment_source = params.payment_source;
  this.date_field = params.date_field;
  this.date_from = params.date_from;
  this.date_to = params.date_to;

  // this.BankFailedReason = params.data.BankFailedReason ;
  // this.BankReceiptID = params.data.BankReceiptID ;
  // this.BankReturnCode = params.data.BankReturnCode ;
  // this.CustomerName = params.data.CustomerName ;
  // this.DebitDate = params.data.DebitDate ;
  // this.EzidebitCustomerID = params.data.EzidebitCustomerID ;
  // this.InvoiceID = params.data.InvoiceID ;
  // this.PaymentAmount = params.data.PaymentAmount ;
  // this.PaymentID = params.data.PaymentID ;
  // this.PaymentMethod = params.data.PaymentMethod ;
  // this.PaymentReference = params.data.PaymentReference ;
  // this.PaymentSource = params.data.PaymentSource ;
  // this.PaymentStatus = params.data.PaymentStatus ;
  // this.ScheduledAmount = params.data.ScheduledAmount ;
  // this.TransactionFeeClient = params.data.TransactionFeeClient ;
  // this.TransactionFeeCustomer = params.data.TransactionFeeCustomer ;
  // this.YourGeneralReference = params.data.YourGeneralReference ;
  // this.YourSystemReference = params.data.YourSystemReference ;
};


EzidebitPayments.prototype.GetPayments = function () {  
  const that = this;

  return new Promise((resolve, reject) => {
    
    const payParams = {};
    payParams.DigitalKey = digitalKey;
    payParams.PaymentType = that.payment_type;
    payParams.PaymentMethod = that.payment_method;
    payParams.PaymentSource = that.payment_source;

    if(that.date_from !== "Invalid date" && that.date_to !== "Invalid date" && that.date_field !== 'NONE'){
      payParams.DateFrom = that.date_from;
      payParams.DateTo = that.date_to;
      payParams.DateField = that.date_field;
    }

    soap.createClient(wsdlUrl, (err, soapClient) => {
      soapClient.GetPayments(payParams,
      (err, result) => {
        const error = result.GetPaymentsResult.Error;
        if(error){           
          console.log('Error...', result.GetPaymentsResult.ErrorMessage);
          reject(error);
        }else{
          resolve(result.GetPaymentsResult.Data);
        }
      });
    });
  });
};


    // if(result != undefined && result != ""){
    //   const deleted = new Payments({user_id: req.decoded.user_id, data: result.GetPaymentsResult.Data.Payment[0]}).removeExistingRows();
      
    //   const payments = result.GetPaymentsResult.Data.Payment;
    //   (payments.length > 0 ? payments : []).map((data, index) => {
    //     const newPayments = new Payments({user_id: req.decoded.user_id, data: data}).addPayments();
    //   });   					
    //   res.send({isCompleted: 1});
    // }else{
    //   console.log('hello');
    //   res.send([]);
    // }

 // soapClient.GetPayments({
    //       DigitalKey: digitalKey,
    //       PaymentType: 'ALL',
    //       PaymentMethod: 'ALL',
    //       PaymentSource: 'ALL',
    //     }, function (err, result) {
    //   		console.log("GetPayments length....", result.GetPaymentsResult.Data.Payment.length);
  
    //   		if(result != undefined && result != ""){
    //   			const deleted = new Payments({user_id: req.decoded.user_id, data: result.GetPaymentsResult.Data.Payment[0]}).removeExistingRows();
            
    //   			const payments = result.GetPaymentsResult.Data.Payment;
    //   			(payments.length > 0 ? payments : []).map((data, index) => {
    //   				const newPayments = new Payments({user_id: req.decoded.user_id, data: data}).addPayments();
    //   			});   					
    //   			res.send({isCompleted: 1});
    //   		}else{
    //   			console.log('hello');
    //   			res.send([]);
    //   		}
    //     });

    // soap.createClient(wsdlUrl, function (err, soapClient) {
    //   soapClient.GetCustomerList({
    //     DigitalKey: '4E6ACAE2-E4A9-4186-ECDD-E0B9F06785B2',
    //     CustomerStatus: 'ALL',
    //     PageNumber: '1'
    //   }, function (err, result) {
    //     // console.log("GetCustomerList.....", result.GetCustomerListResult.Data.Customer);        
    //   });

    //   soapClient.GetScheduledPayments({
    //     DigitalKey: '4E6ACAE2-E4A9-4186-ECDD-E0B9F06785B2'
    //   }, function (err, result) {
    //     // console.log("GetScheduledPayments.....", result.GetScheduledPaymentsResult.Data.ScheduledPayment);
    //   });

    //   soapClient.GetPayments({
    //     DigitalKey: '4E6ACAE2-E4A9-4186-ECDD-E0B9F06785B2',
    //     PaymentType: 'ALL',
    //     PaymentMethod: 'ALL',
    //     PaymentSource: 'ALL'
    //   }, function (err, result) {
		// 		console.log("GetPayments length....", result.GetPaymentsResult.Data.Payment.length);

		// 		if(result != undefined && result != ""){
		// 			const deleted = new Payments({user_id: req.decoded.user_id, data: result.GetPaymentsResult.Data.Payment[0]}).removeExistingRows();
					
		// 			const payments = result.GetPaymentsResult.Data.Payment;
		// 			(payments.length > 0 ? payments : []).map((data, index) => {
		// 				const newPayments = new Payments({user_id: req.decoded.user_id, data: data}).addPayments();
		// 			});   					
		// 			res.send({isCompleted: 1});
		// 		}else{
		// 			console.log('hello');
		// 			res.send([]);
		// 		}
    //   });
    // });

// EzidebitPayments.prototype.addPayments = function () {
//   const that =this;
//   return new Promise((resolve, reject) => {
//     connection.getConnection((error, connection) => {
//       if (error) {
//         reject(error);
//       } else {
//         const values = [
//           that.BankFailedReason,
//           that.BankReceiptID,
//           that.BankReturnCode,
//           that.CustomerName,
//           that.DebitDate,
//           that.EzidebitCustomerID,
//           that.InvoiceID,
//           that.PaymentAmount,
//           that.PaymentID,
//           that.PaymentMethod,
//           that.PaymentReference,
//           that.PaymentSource,
//           that.PaymentStatus,
//           '',
//           that.ScheduledAmount,
//           that.TransactionFeeClient,
//           that.TransactionFeeCustomer,
//           '',
//           that.YourGeneralReference,
//           that.YourSystemReference,
//         ];
        
//         connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])}); 
//         connection.query(`INSERT INTO payments(bankFailedReason, bankReceiptID, bankReturnCode, customerName, debitDate, eziDebitCustomerID, invoiceID, paymentAmount, paymentID, paymentMethod, paymentReference, paymentSource, paymentStatus, settlementDate, scheduledAmount, transactionFeeClient, transactionFeeCustomer, transactionTime, yourGeneralReference, yourSystemReference) VALUES (?)`,[values], (error, rows, fields) => {
//             if (error) {
//               console.log('Error...', error);
//               reject(error);
//             } else {
//               resolve(rows);
//             }
//           }
//         );
//       }
//       connection.release();
//       console.log('Process Complete %d', connection.threadId);
//     });
//   });
// };

// EzidebitPayments.prototype.removeExistingRows = function () {
//   const that =this;
//   return new Promise((resolve, reject) => {
//     connection.getConnection((error, connection) => {
//       if (error) {
//         reject(error);
//       } else {
//         connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])}); 
//         connection.query('TRUNCATE TABLE `payments`', (error, rows, fields) => {
//             if (error) {
//               console.log('Error...', error);
//               reject(error);
//             } else {
//               resolve(rows);
//             }
//           }
//         );
//       }
//       connection.release();
//       console.log('Process Complete %d', connection.threadId);
//     });
//   });
// };

module.exports = EzidebitPayments;