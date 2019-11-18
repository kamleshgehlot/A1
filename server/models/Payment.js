const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

var Payments = function (params) {
    // console.log('params',params);
    this.user_id = params.user_id ;
    this.BankFailedReason = params.data.BankFailedReason ;
    this.BankReceiptID = params.data.BankReceiptID ;
    this.BankReturnCode = params.data.BankReturnCode ;
    this.CustomerName = params.data.CustomerName ;
    this.DebitDate = params.data.DebitDate ;
    this.EzidebitCustomerID = params.data.EzidebitCustomerID ;
    this.InvoiceID = params.data.InvoiceID ;
    this.PaymentAmount = params.data.PaymentAmount ;
    this.PaymentID = params.data.PaymentID ;
    this.PaymentMethod = params.data.PaymentMethod ;
    this.PaymentReference = params.data.PaymentReference ;
    this.PaymentSource = params.data.PaymentSource ;
    this.PaymentStatus = params.data.PaymentStatus ;
    this.ScheduledAmount = params.data.ScheduledAmount ;
    this.TransactionFeeClient = params.data.TransactionFeeClient ;
    this.TransactionFeeCustomer = params.data.TransactionFeeCustomer ;
    this.YourGeneralReference = params.data.YourGeneralReference ;
    this.YourSystemReference = params.data.YourSystemReference ;
};


Payments.prototype.addPayments = function () {
  const that =this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        const values = [
          that.BankFailedReason,
          that.BankReceiptID,
          that.BankReturnCode,
          that.CustomerName,
          that.DebitDate,
          that.EzidebitCustomerID,
          that.InvoiceID,
          that.PaymentAmount,
          that.PaymentID,
          that.PaymentMethod,
          that.PaymentReference,
          that.PaymentSource,
          that.PaymentStatus,
          '',
          that.ScheduledAmount,
          that.TransactionFeeClient,
          that.TransactionFeeCustomer,
          '',
          that.YourGeneralReference,
          that.YourSystemReference,
        ];
        
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])}); 
        connection.query(`INSERT INTO payments(bankFailedReason, bankReceiptID, bankReturnCode, customerName, debitDate, eziDebitCustomerID, invoiceID, paymentAmount, paymentID, paymentMethod, paymentReference, paymentSource, paymentStatus, settlementDate, scheduledAmount, transactionFeeClient, transactionFeeCustomer, transactionTime, yourGeneralReference, yourSystemReference) VALUES (?)`,[values], (error, rows, fields) => {
            if (error) {
              console.log('Error...', error);
              reject(error);
            } else {
              resolve(rows);
            }
          }
        );
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};

Payments.prototype.removeExistingRows = function () {
  const that =this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])}); 
        connection.query('TRUNCATE TABLE `payments`', (error, rows, fields) => {
            if (error) {
              console.log('Error...', error);
              reject(error);
            } else {
              resolve(rows);
            }
          }
        );
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};
module.exports = Payments;