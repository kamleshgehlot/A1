const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var UploadDocument = function (params) {
  console.log("params", params);
  
  this.order_id = params.order_id;
  this.created_by =  params.created_by;
  this.document = params.document;
  this.user_id = params.user_id;
};



UploadDocument.prototype.uploadDoc = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          let queryData = [
            [that.order_id, that.document, that.created_by]
          ];
            connection.query('INSERT INTO order_document(order_id, document, created_by) VALUES ?',[queryData],function (error, rows, fields) {
              if (!error) {
                  // console.log("INSERT...", rows.insertId);
                  connection.query('UPDATE orders SET doc_upload_status = 1, order_status = 2 where id = "'+that.order_id+'"',function (error, rows, fields) {
                    if (!error) {
                      // console.log("rows...", rows);
                          resolve({rows, isUploaded: 1});
                        } else {
                          console.log("Error...", error);
                          // reject(error);
                          resolve();
                        }
                      });
                    } else {
                      console.log("Error...", error);
                      // reject(error);
                      resolve();
                    }
                  });
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          connection.release();
          console.log('Order Added for Franchise Staff %d', connection.threadId);
        });
  }).catch((error) => {
    throw error;
  });
};



UploadDocument.prototype.uploadDeliveryDoc = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          let queryData = [
            [that.order_id, that.document, that.created_by]
          ];
            connection.query('INSERT INTO delivery_document(order_id, document, created_by) VALUES ?',[queryData],function (error, rows, fields) {
              if (!error) {              
                  connection.query('UPDATE orders SET delivery_doc_uploaded = 1 where id = "'+that.order_id+'"',function (error, rows, fields) {
                    if (!error) {
                          resolve({rows, isUploaded: 1});
                          // resolve(rows);
                        } else {
                          console.log("Error...", error);
                          // reject(error);
                          resolve();
                        }
                      });
                    } else {
                      console.log("Error...", error);
                      // reject(error);
                      resolve();
                    }
                  });
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          connection.release();
          console.log('Order Added for Franchise Staff %d', connection.threadId);
        });
  }).catch((error) => {
    throw error;
  });
};

module.exports = UploadDocument;