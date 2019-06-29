const connection = require("../lib/connection.js");
const utils = require("../utils");

var Accountant = function (params) {
  this.name= params.name;
  this.email= params.email;
  this.contact= params.contact;
  
console.log('model dataaaaaaaaaa',params);
};
Accountant.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({database : 'rentronics'});
        connection.query('INSERT INTO accountant(name,email,contact) VALUES ("' + that.name + '", "' + that.email + '", "' + that.contact + '")', function (error, rows, fields) {


              if (!error) {
                let accountant_id = rows.insertId;
                resolve({ accountant_id: accountant_id });
              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
          
      } else {
        console.log("Error...", error);
        reject(error);
      }

      connection.release();
      console.log('Accountant Added %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

module.exports = Accountant;