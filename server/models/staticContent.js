const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const StaticContent = function (params) {
 
};

StaticContent.prototype.getWeekDayList = function () {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('SELECT `id`, `week_day`, `is_active`, `created_at` FROM `week_day_list` WHERE is_active = 1', (error, rows, fields) => {
        if (!error) {
          resolve(rows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
      });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



StaticContent.prototype.getPaymentModeList = function () {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('SELECT `id`, `payment_mode`, `is_active` FROM `payment_mode` WHERE is_active = 1', (error, rows, fields) => {
        if (!error) {
          resolve(rows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
      });

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};

module.exports = StaticContent;
