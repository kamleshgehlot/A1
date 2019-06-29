const connection = require('../../lib/connection.js');

const User = function(params) {
  // parameters edit by shahrukh
  this.city = params.city;
  this.suburb = params.suburb;
  this.franchise_name = params.franchise_name;
  this.uid = params.uid;

  this.city_code = params.city_code;
  this.abn = params.abn;

  this.company_name = params.company_name;
  this.nbzn = params.nbzn;
  this.company_location = params.company_location;
  this.director = params.director;
  this.email = params.email;
  this.contact = params.contact;
  this.alt_contact = params.alt_contact;
  this.website = params.website;

  this.accountant_name = params.accountant_name;
  this.accountant_email = params.accountant_email;
  this.accountant_contact = params.accountant_contact;

  this.user_id = params.user_id;
  this.password = params.password;
  this.role_id = params.role_id;

  // srk code ends

  // this.id = params.id;
  // this.franchise_id   = params.franchise_id ;
  // this.name = params.name;
  // this.user_id = params.user_id;
  // this.password = params.password;
  // this.designation = params.designation;
  // this.mobile_no = params.mobile_no;
  // this.email = params.email;
  // this.role_id = params.role_id;
  // this.is_active = params.is_active;
  // this.created_by = params.created_by;
};

User.prototype.register = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: `rentronics_franchise_${that.user_id.split('_')[1]}` });
        connection.query(
          `INSERT INTO user(franchise_id,name,user_id,password,designation,mobile_no,email,role_id,is_active,created_by) VALUES ("${that.franchise_id}", "${that.name}", "${that.user_id}", AES_ENCRYPT("${that.password}", "secret"), "${that.designation}", "${that.mobile_no}", "${that.email}", "${that.role_id}", "${that.is_active}", "${that.created_by}")`,
          (error, rows, fields) => {
            if (!error) {
              resolve({ userName: that.name, userId: that.userId, password: that.password });
            } else {
              console.log('Error...', error);
              reject(error);
            }
          },
        );
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

User.prototype.update = function(newUser) {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      const values = [
        that.companyId,
        that.organizationId,
        that.name,
        that.userId,
        that.password,
        that.designation,
        that.address,
        that.area,
        that.mobileNo,
        that.email,
        that.role,
        that.id,
      ];

      if (!error) {
        connection.query(
          `Update user set companyId = "${that.companyId}", organizationId = "${that.organizationId}", name = "${that.name}", userId = "${that.userId}", password = AES_ENCRYPT("${that.password}", "secret"), designation = "${that.designation}", address = "${that.address}", area = "${that.area}", mobileNo = "${that.mobileNo}", email = "${that.email}", role = "${that.role}" Where Id = "${that.id}"`,
          values,
          (error, rows, fields) => {
            if (!error) {
              resolve({ userName: that.name, userId: that.userId, password: that.password });
            } else {
              console.log('Error...', error);
              reject(error);
            }
          },
        );
      } else {
        console.log('Error...', error);
        reject(error);
      }

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};

User.prototype.all = function() {
  const that = this;

  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({ database: `rentronics_franchise_${that.user_id.split('_')[1]}` });
      connection.query(
        'select u.name, u.user_id, u.is_active, u.created_at from user u',
        (error, rows, fields) => {
          if (!error) {
            resolve(rows);
          } else {
            console.log('Error...', error);
            reject(error);
          }

          connection.release();
          console.log('Process Complete %d', connection.threadId);
        },
      );
    });
  });
};

User.prototype.getStaff = function() {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      const isActive = 1;

      connection.query(
        'select id, name, user_id, u.created_at from user on u.franchise_id = f.id where u.is_active=?',
        [isActive],
        (error, rows, fields) => {
          if (!error) {
            resolve(rows);
          } else {
            console.log('Error...', error);
            reject(error);
          }

          connection.release();
          console.log('Process Complete %d', connection.threadId);
        },
      );
    });
  });
};

module.exports = User;
