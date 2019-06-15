const connection = require("../lib/connection.js");
const utils = require("../utils");

var User = function (params) {
  this.id = params.id;
  this.franchise_id   = params.franchise_id ;
  this.name = params.name;
  this.user_id = params.user_id;
  this.password = params.password; //utils.randomString(11);
  this.designation = params.designation;
  this.mobile_no = params.mobile_no;
  this.email = params.email;
  this.role_id = params.role_id;
  this.is_active = params.is_active;
  this.created_by = params.created_by;
};

User.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.query('INSERT INTO user(franchise_id,name,user_id,password,designation,mobile_no,email,role_id,is_active,created_by) VALUES ("' + that.franchise_id + '", "' + that.name + '", "' + that.user_id + '", AES_ENCRYPT("' + that.password + '", "secret"), "' + that.designation + '", "' + that.mobile_no + '", "' + that.email + '", "' + that.role_id + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {

          if (!error) {
            resolve({ userName: that.name, userId: that.userId, password: that.password });
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

User.prototype.update = function (newUser) {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      const values = [that.companyId, that.organizationId, that.name, that.userId, that.password, that.designation, that.address, that.area, that.mobileNo, that.email, that.role, that.id];

      if (!error) {
        connection.query('Update user set companyId = "' + that.companyId + '", organizationId = "' + that.organizationId + '", name = "' + that.name + '", userId = "' + that.userId + '", password = AES_ENCRYPT("' + that.password + '", "secret"), designation = "' + that.designation + '", address = "' + that.address + '", area = "' + that.area + '", mobileNo = "' + that.mobileNo + '", email = "' + that.email + '", role = "' + that.role + '" Where Id = "' + that.id + '"', values, function (error, rows, fields) {

          if (!error) {
            resolve({ userName: that.name, userId: that.userId, password: that.password });
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

User.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      const isActive = 1;

      connection.query('select u.id, f.name as companyName, u.franchise_id, u.name, u.user_id, u.designation, u.mobile_no, u.email, u.created_at from user u inner join franchise f on u.franchise_id = f.id where u.is_active=?', [isActive], function (error, rows, fields) {

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


User.prototype.getUniqueNames = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      const isActive = 1;

      connection.query('select u.id as value, u.name as text from user u where u.isActive=? and u.companyId is not null order by u.name', [isActive], function (error, rows, fields) {

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

module.exports = User;