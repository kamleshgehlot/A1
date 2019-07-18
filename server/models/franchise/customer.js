const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var Customer = function (params) {
  console.log("params@@@@@@@@@@@", params);
  
  this.id = params.id;
  this.customer_name  = params.customer_name;
  this.address  = params.address;
  this.city  = params.city;
  this.postcode  = params.postcode;
  this.telephone  = params.telephone;
  this.mobile  = params.mobile;
  this.email  = params.email;
  this.gender  = params.gender;
  this.is_working  = params.is_working;
  this.dob  = params.dob;
  this.id_type  = params.id_type;
  this.id_number = params.id_number;
  this.expiry_date  = params.expiry_date;
  this.is_adult  = params.is_adult;
  this.id_proof  = params.id_proof;

  this.alt_c1_name = params.alt_c1_name;
  this.alt_c1_address = params.alt_c1_address;
  this.alt_c1_contact = params.alt_c1_contact;
  this.alt_c1_relation = params.alt_c1_relation;
  this.alt_c2_name = params.alt_c2_name;
  this.alt_c2_address = params.alt_c2_address;
  this.alt_c2_contact = params.alt_c2_contact;
  this.alt_c2_relation = params.alt_c2_relation;

  this.employer_name = params.employer_name;
  this.employer_address = params.employer_address;
  this.employer_telephone = params.employer_telephone;
  this.employer_email = params.employer_email;
  this.employer_tenure = params.employer_tenure;

  this.is_active = params.is_active,
  this.created_by = params.created_by;
  this.user_id = params.user_id;
};

Customer.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        // let values=[that.customer_name,that.address,that.city,that.postcode,that.telephone,that.mobile,that.email,that.gender,that.is_working,that.dob,that.id_type,that.id_number,that.expiry_date,that.is_adult,that.id_proof,that.alt_c1_name,that.alt_c1_address,that.alt_c1_contact,that.alt_c1_relation,that.alt_c2_name,that.alt_c2_address,that.alt_c2_contact,that.alt_c2_relation,that.is_active,that.created_by];
        let values=[
          [that.customer_name,that.address,that.city,that.postcode,that.telephone,that.mobile,that.email,that.gender,that.is_working,that.dob,that.id_type,that.id_number,that.expiry_date,that.is_adult,that.id_proof,that.alt_c1_name,that.alt_c1_address,that.alt_c1_contact,that.alt_c1_relation,that.alt_c2_name,that.alt_c2_address,that.alt_c2_contact,that.alt_c2_relation,that.is_active,that.created_by]
        ];

        // console.log("dataname", dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) );

        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('INSERT INTO customer(customer_name,address,city,postcode,telephone,mobile,email,gender,is_working,dob,id_type,id_number,expiry_date,is_adult,id_proof,alt_c1_name,alt_c1_address,alt_c1_contact,alt_c1_relation,alt_c2_name,alt_c2_address,alt_c2_contact,alt_c2_relation,is_active,created_by) VALUES ?', [values], function (error, rows, fields) {
          
          if (!error) {
                const savedCustomerId = rows.insertId;
                connection.query('INSERT INTO customer_income(cust_id, employer_name, employer_address, employer_telephone, employer_email, employer_tenure, is_active, created_by) values ("' + savedCustomerId + '","' + that.employer_name + '","' + that.employer_address + '","' + that.employer_telephone + '","' + that.employer_email + '","' + that.employer_tenure + '","' + that.is_active + '","' + that.created_by + '")', function (error, rows, fields) {
                  if (!error) {
                    resolve(rows);
                  } else {
                    console.log("Error...", error);
                    reject(error);
                  }
                });
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
      console.log('Customer Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Customer.prototype.update = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {

        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('UPDATE customer SET customer_name = "' +that.customer_name + '", address = "' + that.address + '", city = "' + that.city + '", postcode = "' + that.postcode + '", telephone = "' + that.telephone + '", mobile = "' + that.mobile + '", email = "' + that.email + '", gender = "' + that.gender + '", is_working = "' + that.is_working + '", dob = "' + that.dob+ '", id_type = "' +that.id_type + '", id_number = "' +that.id_number + '", expiry_date = "' + that.expiry_date + '", is_adult = "' + that.is_adult + '", id_proof = "' + that.id_proof + '", alt_c1_name = "' + that.alt_c1_name+ '", alt_c1_address = "' + that.alt_c1_address+ '", alt_c1_contact = "' + that.alt_c1_contact+ '", alt_c1_relation = "' + that.alt_c1_relation + '", alt_c2_name = "' + that.alt_c2_name + '", alt_c2_address = "' + that.alt_c2_address+ '", alt_c2_contact = "' + that.alt_c2_contact+ '", alt_c2_relation = "' + that.alt_c2_relation+ '", is_active = "' + that.is_active+ '" WHERE id= "'+that.id+'"', function (error, rows, fields) {
          if (!error) {
                connection.query('UPDATE customer_income SET employer_name = "'+that.employer_name+'", employer_address = "'+that.employer_address+'", employer_telephone = "'+that.employer_telephone+'", employer_email = "'+that.employer_email+'", employer_tenure = "'+that.employer_tenure+'", is_active = "'+that.is_active+'" WHERE cust_id = "'+that.id+'"', function (error, rows, fields) {
                  if (!error) {
                    resolve(rows);
                  } else {
                    console.log("Error...", error);
                    reject(error);
                  }
                });
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
      console.log('Customer Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Customer.prototype.all = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select c.id, c.customer_name, c.address, c.city, c.postcode, c.telephone, c.mobile, c.email, c.gender, c.is_working, c.dob, c.id_type, c.id_number, c.expiry_date, c.is_adult, c.id_proof, c.alt_c1_name, c.alt_c1_address, c.alt_c1_contact, c.alt_c1_relation, c.alt_c2_name, c.alt_c2_address, c.alt_c2_contact, c.alt_c2_relation, c.is_active, c.created_by, ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure from customer as c inner join customer_income as ci on c.id = ci.cust_id order by c.id desc', function (error, rows, fields) {
          if (!error) {
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
        // });
      }
      else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


Customer.prototype.getidtypelist = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select id, name, is_active from id_type order by name', function (error, rows, fields) {
          if (!error) {
            resolve(rows);
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
        // });
      }
      else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


module.exports = Customer;