const connection = require("../lib/connection.js");
const utils = require("../utils");

var Accountant = function (params) {
  this.id = params.id;
  this.name= params.name;
  this.email= params.email;
  this.contact= params.contact;
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





Accountant.prototype.update = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        console.log("type..........", that);
        
        connection.changeUser({ database: 'rentronics' });

        let values = [that.name, that.email, that.contact, that.id]

			connection.query('UPDATE accountant set name = ?, email = ?, contact = ? WHERE id = ?', values, function (error, rows, fields) {
          if (!error) {
            resolve(rows);
          } else {
            console.log('Error...', error);
            reject(error);
          }
        });
        
      } else {
        console.log('Error...', error);
        reject(error);
      }

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch(error => {
    throw error;
  });
};

module.exports = Accountant;