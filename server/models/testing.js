const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const Testing = function (params) {
  
};

Testing.prototype.getAll = function () {

  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      // connection.changeUser({ database: dbName["prod"] });
      // connection.query('select id, city, city_code from location order by city', (error, rows, fields) => {
      //   if (!error) {
      //     resolve(rows);
      //   } else {
      //     console.log('Error...', error);
      //     reject(error);
      //   }
      // });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


Testing.prototype.getSelectedArea = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      // console.log("params...",that);
      // connection.changeUser({ database: dbName["prod"] });
      // connection.query('select suburb from franchise WHERE city = ? AND city_code = ? AND state != 4', [that.city_name, that.city_code], (error, rows, fields) => {
      //   if (!error) {
      //     let suburb = [''];
      //     (rows.length > 0 ? rows : []).map((data, index) => {
      //       suburb.push(data.suburb);
      //     })
      //     // console.log("sub..",suburb);
      //     connection.query('select id, area_name, city_id, is_active from area where city_id = "' + that.city_id + '" AND area_name NOT IN (?) order by area_name', [suburb], (error, rows, fields) => {
      //       if (!error) {
      //         resolve(rows);
      //       } else {
      //         console.log('Error...', error);
      //         reject(error);
      //       }
      //     })
      //   } else {
      //     console.log('Error...', error);
      //     reject(error);
      //   }
      // });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};

module.exports = Testing;
