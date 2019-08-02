const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var Order = function (params) {
  console.log("params", params);
  this.user_id = params.user_id;

    
  this.enquiry_id = params.enquiry_id;
  this.customer_name= params.customer_name;
  this.contact= params.contact;
  this.interested_product_id= params.interested_product_id;
  this.is_active = params.is_active;
  this.created_by =params.created_by;
  this.converted_to = params.converted_to;
  this.convert_by_lead=params.convert_by_lead;
};


// Order.prototype.postOrder = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
//         let values = [
//           [that.enquiry_id,that.customer_name,that.contact,that.interested_product_id,that.is_active,that.converted_to,that.created_by]
//         ]
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('INSERT INTO enquiry(enquiry_id, customer_name, contact, interested_product_id, is_active, converted_to, created_by) VALUES ?',[values],function (error, rows, fields) {
//             if (!error) {
//                 if(that.convert_by_lead!=0){
//                   connection.changeUser({ database: dbName["prod"] });
//                   connection.query('update leads set converted_to="1" where id="'+that.convert_by_lead+'"',function (error, rows, fields) {
//                     if (!error) {
//                       // console.log("rows...",rows);
//                         resolve(rows);
//                         } else {
//                           console.log("Error...", error);
//                           reject(error);
//                         }
//                   });
//                 }
//             } else {
//               console.log("Error...", error);
//               reject(error);
//             }
//           })
          
//       } else {
//         console.log("Error...", error);
//         reject(error);
//       }
//       connection.release();
//       console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };




// Enquiry.prototype.getAll = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
    
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('select id, enquiry_id, customer_name, contact, interested_product_id, is_active, created_by from enquiry WHERE converted_to != 1 order by id desc',function (error, rows, fields) {
//             if (!error) {
//               // console.log("rows...",rows);
//                 resolve(rows);
//                 } else {
//                   console.log("Error...", error);
//                   reject(error);
//                 }
//           })
          
//       } else {
//         console.log("Error...", error);
//         reject(error);
//       }
//       connection.release();
//       console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };


// Enquiry.prototype.convertedList = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
    
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('select id, enquiry_id, customer_name, contact, interested_product_id, is_active, created_by from enquiry WHERE converted_to = 1 order by id desc',function (error, rows, fields) {
//             if (!error) {
//               // console.log("rows...",rows);
//                 resolve(rows);
//                 } else {
//                   console.log("Error...", error);
//                   reject(error);
//                 }
//           })
          
//       } else {
//         console.log("Error...", error);
//         reject(error);
//       }
//       connection.release();
//       console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };


// Enquiry.prototype.convert = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
    
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('update enquiry set converted_to = 1 WHERE id = "'+that.enquiry_id+'"',function (error, rows, fields) {
//             if (!error) {
//               // console.log("rows...",rows);
//                 resolve(rows);
//                 } else {
//                   console.log("Error...", error);
//                   reject(error);
//                 }
//           })
          
//       } else {
//         console.log("Error...", error);
//         reject(error);
//       }
//       connection.release();
//       console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };



Order.prototype.getnewid = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select id from orders order by id desc limit 1',function (error, rows, fields) {
            if (!error) {
                resolve(rows);
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          })
          
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

module.exports = Order;