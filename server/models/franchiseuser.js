const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const FranchiseUser = function (params) {
  this.id = params.id;
  this.franchise_id = params.franchise_id;
  this.director_id = params.director_id;
  this.name = params.name;
};

FranchiseUser.prototype.all = function () {
  
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
          connection.query('select id, name from user', (error, rows, fields) => {
            if (!error) {
              console.log('users----hbsd---',rows);
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

module.exports = FranchiseUser;
