const connection = require("../lib/connection.js");
const dbName = require('../lib/databaseMySQL.js');
var encryptionHelper = require("../lib/simple-nodejs-iv-encrypt-decrypt.js");
var algorithm = encryptionHelper.CIPHERS.AES_256;

const utils = require("../utils");

var User = function (params) {
  this.franchise_id = params.franchise_id;
  this.director_id = params.director_id;
  this.company_id = params.company_id;

  this.name = params.name;

  this.designation = params.designation;
  this.role_id = params.role_id;
  this.is_active = params.is_active;
  this.created_by = params.created_by;
  this.user_details = params.user_details;

  this.user_id = params.user_id;
  this.password = params.password;

  // for update - param
  // this.f_id = params.f_id;
};

User.prototype.register = function () {
  var directors_id;
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select id from company where company_id = "' + that.company_id + '"', function (error, rows, fields) {
          // console.log(rows[0].id);
          directors_id = rows;

          let userValues = [
          ];

          // encryptionHelper.getKeyAndIV("1234567890abcdefghijklmnopqrstuv", function (result) { //using 32 byte key

          (that.user_details || []).map((data, index) => {
            //   var encText = encryptionHelper.encryptText(algorithm, data.key, data.iv, data.password, "base64");

            //   userValues.push([that.franchise_id,directors_id[index].id,data.director,data.uid, encText,that.designation,that.role_id,that.is_active,that.created_by])
            // });
            connection.query('INSERT INTO user(franchise_id,director_id, name,user_id,password,designation,role_id,is_active,created_by) VALUES ("' + that.franchise_id + '", "' + directors_id[index].id + '", "' + data.director + '", "' + data.uid + '", AES_ENCRYPT("' + data.password + '", "secret"), "' + that.designation + '", "' + that.role_id + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {

              if (!error) {
                connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_details[0].uid.split('_')[1]) });
                connection.query('INSERT INTO user(franchise_id,director_id, name,user_id,password,designation,role_id,is_active,created_by) VALUES ("' + that.franchise_id + '", "' + directors_id[index].id + '", "' + data.director + '", "' + data.uid + '", AES_ENCRYPT("' + data.password + '", "secret"), "' + that.designation + '", "' + that.role_id + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {
                  if (!error) {
                    const id = rows.insertId;
                    resolve({ userName: that.name, userId: that.user_id, password: that.password, id: id });
                  } else {
                    console.log("Error...", error);
                    reject(error);
                  }
                });
              }
            });
          });
          // })
        });

      } else {
        console.log("Error...", error);
        reject(error);
      }

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


User.prototype.update = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      const values = [that.name, that.designation, that.role_id, that.director_id];

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('UPDATE user set name = ?, designation = ?, role_id = ?  WHERE director_id = ?', values, function (error, rows, fields) {
          if (!error) {
            // resolve({ userName: that.name, userId: that.userId, password: that.password });
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error)
          }
        });
      } else {
        console.log("Error...", error);
        reject(error)
      }

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};

// User.prototype.all = function () {
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       console.log('Process Started %d All', connection.threadId);

//       if (error) {
//         throw error;
//       }

//       connection.changeUser({database : dbName["prod"]});
//       connection.query('select u.id, f.name as companyName, u.franchise_id, u.name, u.user_id, u.designation, u.mobile_no, u.email, u.created_at from user u inner join franchise f on u.franchise_id = f.id where u.is_active=?', [isActive], function (error, rows, fields) {

//         if (!error) {
//           resolve(rows);
//         } else {
//           console.log("Error...", error);
//           reject(error);
//         }

//         connection.release();
//         console.log('Process Complete %d', connection.threadId);
//       });
//     });
//   });
// }

// User.prototype.getStaff = function () {
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       console.log('Process Started %d All', connection.threadId);

//       if (error) {
//         throw error;
//       }

//       const isActive = 1;

//       connection.query('select id, name, user_id, u.created_at from user on u.franchise_id = f.id where u.is_active=?', [isActive], function (error, rows, fields) {

//         if (!error) {
//           resolve(rows);
//         } else {
//           console.log("Error...", error);
//           reject(error);
//         }

//         connection.release();
//         console.log('Process Complete %d', connection.threadId);
//       });
//     });
//   });
// }

module.exports = User;