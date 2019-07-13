var connection = require("../lib/connection.js");
const dbName = require('../lib/databaseMySQL.js');

var Auth = function (params) {
  this.name = params.name;
  this.password = params.password;
};

Auth.prototype.login = function (newUser) {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      let values = [that.name, 1];

      if (that.name.split('_').length > 2) {
        console.log("inside if condition for validation");
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.name.split('_')[1]) });
      } else {
        console.log("inside else condition for validation", values);
        connection.changeUser({ database: dbName["prod"] });
      }
      connection.query('Select AES_DECRYPT(`password`, \'secret\') AS password, u.id, u.franchise_id, u.name as user_name, u.user_id, r.name as role_name from user u inner join role r on u.role_id = r.id where u.user_id=? and u.is_active = ?', values, function (error, rows, fields) {
        // connection.query('Select password, u.id, u.franchise_id, u.name as user_name, u.user_id, r.name as role_name from user u inner join role r on u.role_id = r.id where u.user_id=? and u.is_active = ?', values, function (error, rows, fields) {

        if (!error) {
          resolve(rows);
        } else {
          console.log("Error...", error);
          reject(error)
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
};

module.exports = Auth;