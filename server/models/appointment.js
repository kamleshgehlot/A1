const connection = require("../lib/connection.js");
const dbName = require('../lib/databaseMySQLNew.js');

var Appointment = function (params) {
  this.user_id = params.user_id;
};


Appointment.prototype.membersList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      
      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
      connection.query('select u.id, u.name, u.role_id, s.email, s.contact from user as u INNER JOIN staff as s ON s.franchise_user_id = u.id WHERE u.status = 1 AND u.is_active = 1', function (error, rows, fields) {        
        if (error) {  console.log("Error...", error); reject(error);  }
          
        resolve(rows);
        
        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
}

module.exports = Appointment;