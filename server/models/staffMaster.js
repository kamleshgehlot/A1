const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const StaffMaster = function (params) {
  this.id = params.id;
  this.first_name = params.first_name
  this.last_name = params.last_name;
  this.user_id = params.user_id;
  this.password = params.password;
  this.location = params.location;
  this.contact = params.contact;
  this.email = params.email;
  this.position = params.position;
  this.created_by = params.created_by;
};


StaffMaster.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('INSERT INTO master_staff(first_name,last_name,user_id,password,location,contact,email,position,created_by) VALUES ("' + that.first_name + '", "' + that.last_name + '","' + that.user_id + '","' + that.password + '", "' + that.location + '", "' + that.contact + '" , "' + that.email + '", "' + that.position + '", "' + that.created_by + '")', function (error, rows, fields) {
          if (!error) {
            resolve({ rows });
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
    throw error;
  });
};

StaffMaster.prototype.update = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('update master_staff set first_name = "' + that.first_name + '", last_name = "' + that.last_name + '", location = "' + that.location + '", contact = "' + that.contact + '",email = "' + that.email + '", position =  "' + that.position + '" WHERE id = "' + that.id + '"', function (error, rows, fields) {
          if (!error) {
            resolve({ rows });
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
    throw error;
  });
};



StaffMaster.prototype.getAll = function () {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('select ms.id, ms.first_name, ms.last_name, ms.user_id, ms.location, ms.contact, ms.email, ms.position, sp.position as position_name, ms.created_by from master_staff ms inner join staff_position sp on ms.position = sp.id order by id desc', (error, rows, fields) => {
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

module.exports = StaffMaster;
