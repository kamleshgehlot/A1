const connection = require('../../lib/connection.js');
const utils = require('../../utils');

const Brand = function(params) {
  this.id = params.id;
  this.brand_name = params.brand_name;
};


Brand.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({database : 'rentronics'});
      connection.query('select * from brand', function (error, rows, fields) {

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
module.exports = Brand;
