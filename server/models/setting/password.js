const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQL.js');

const Password = function(params) {
  this.current_password=params.current_password;
    this.new_password=params.new_password;
    this.user_id = params.user_id;
    this.franchise_id = params.franchise_id;
  console.log('ppppp--------',params);
};

Password.prototype.update = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({database : dbName["prod"]});
        connection.query('select fdbname from franchise where id= "' + that.franchise_id + '"',(error, rows, fields) => {
        if (!error) {
          // console.log("ddddd", rows);
          const frachiseDbName = rows[0].fdbname;
          connection.changeUser({database : frachiseDbName});
          connection.query('update user set password = AES_ENCRYPT("' + that.new_password + '", "secret") where user_id="'+that.user_id+'"', function (error, rows, fields) {
              if (!error) {
                console.log('pass-----',rows);
                resolve({rows});
              } else {
                console.log("Error...", error);
                reject(error);
              }
            
        });
        connection.changeUser({database :  dbName["prod"]});
        connection.query('update user set password = AES_ENCRYPT("' + that.new_password + '", "secret") where user_id="'+that.user_id+'"', function (error, rows, fields) {
            if (!error) {
              console.log('passuser-----',rows);
              resolve({rows});
            } else {
              console.log("Error...", error);
              reject(error);
            }
          
      });
      } else {
        console.log("Error...", error);
        reject(error);
      }
    })
    }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Password.prototype.pwd = function () {
  
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName["prod"]});
      connection.query('Select AES_DECRYPT(`password`, \'secret\') AS password from user where user_id="'+that.user_id+'"', function (error, rows, fields) {
        if (!error) {
          console.log('password model----',rows);
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
module.exports = Password;
