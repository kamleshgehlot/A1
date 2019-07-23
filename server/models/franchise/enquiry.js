const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var Enquiry = function (params) {
  console.log("params", params);
  this.user_id = params.user_id;
};

Enquiry.prototype.getnewid = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select id from enquiry order by id desc limit 1',function (error, rows, fields) {
            if (!error) {
              console.log('rowsssss..',rows);
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
      console.log('Customer Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};




module.exports = Enquiry;