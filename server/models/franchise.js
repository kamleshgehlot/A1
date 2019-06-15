const connection = require("../lib/connection.js");

const Franchise = function (params) {
  this.id = params.id;
  this.name = params.name;
  this.location = params.location;
  this.contact = params.contact; //utils.randomString(11);
  this.abn = params.abn;
  this.is_active = params.is_active;
  this.created_by = params.created_by;
};

Franchise.prototype.register = function (newUser) {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      let values = [
        [that.name, that.location, that.contact, that.abn, that.is_active, that.created_by]
      ]

      if (!error) {
        connection.query('INSERT INTO franchise(name,location,contact,abn,is_active,created_by) VALUES ?', [values], function (error, rows, fields) {

          if (!error) {
            let franchise_id = rows.insertId;

            resolve({ franchise_id: franchise_id });
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
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch((error) => {
    reject(error);
  });
  // });
};

Franchise.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.query('select u.id as user_id, f.name as frandhise_name, u.franchise_id, f.name, f.location, f.contact, f.abn, u.is_active, u.created_at from user u inner join franchise f on u.franchise_id = f.id', function (error, rows, fields) {

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

module.exports = Franchise;