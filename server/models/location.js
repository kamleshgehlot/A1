const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQL.js');

const Location = function(params) {
  this.id = params.id;
  this.city = params.city;
  this.city_code = params.city_code;
};

Location.prototype.getAll = function() {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName["prod"]});
      connection.query('select id, city, city_code from location', (error, rows, fields) => {
        if (!error) {
          resolve(rows);
        } else {
          console.log('Error...', error);
          reject(error);
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
};

module.exports = Location;
