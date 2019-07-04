const connection = require('../lib/connection.js');

const StaffPosition = function(params) {
  this.id= params.id;
  this.position= params.position;
  this.created_at= params.created_at;
};


StaffPosition.prototype.getAll = function() {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({ database: 'rentronics' });
      connection.query('select * from staff_position', (error, rows, fields) => {
        if (!error) {
          console.log("rows..",rows);
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

module.exports = StaffPosition;
