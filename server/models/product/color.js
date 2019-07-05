const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQL.js');

const utils = require('../../utils');

const Color = function(params) {
  this.id = params.id;
  this.color = params.color;
};


Color.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName["prod"]});
      connection.query('select * from color', function (error, rows, fields) {

        if (!error) {
          resolve(rows);
        } else {
          console.log("Error...", error);
          reject(error);
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
}
module.exports = Color;
