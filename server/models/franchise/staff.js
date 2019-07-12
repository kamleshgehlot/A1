const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQL.js');
const utils = require("../../utils");


var Staff = function (params) {
  // console.log("params@@@@@@@@@@@", params);
  
  this.franchise_id = params.franchise_id;
  this.id = params.id;
  this.first_name = params.first_name;
  this.last_name = params.last_name;
  this.location = params.location;
  this.contact = params.contact;
  this.email = params.email;
  
  this.pre_company_name = params.pre_company_name;
  this.pre_company_address = params.pre_company_address;
  this.pre_company_contact = params.pre_company_contact;
  this.pre_position = params.pre_position;
  this.duration = params.duration;
  this.resume = params.resume;
  this.cover_letter = params.cover_letter;
  this.employment_docs = params.employment_docs;
  
  this.user_id = params.user_id;
  this.password = params.password;
  this.role = params.role;
  this.created_by = params.created_by;

};

Staff.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({database : dbName["prod"]});
        connection.query('select city from franchise where id = "'+that.franchise_id+'"', function (error, rows, fields) {
          if (!error) {
            const frachiseDbName = 'rentronics_franchise_' + rows[0].city.substring(0, 4).toLowerCase();
            connection.changeUser({database : frachiseDbName});
            connection.query('insert into staff(first_name, last_name, location, contact, email, pre_company_name, pre_company_address, pre_company_contact, pre_position, duration, user_id, password, role, employment_docs, created_by) values ("'+that.first_name+'","'+that.last_name+'","'+that.location+'","'+that.contact+'","'+that.email+'","'+that.pre_company_name+'","'+that.pre_company_address+'","'+that.pre_company_contact+'","'+that.pre_position+'", "'+that.duration+'", "'+that.user_id+'", AES_ENCRYPT("' + that.password + '", "secret"), "'+that.role+'", "'+that.employment_docs+'", "'+that.created_by+'")', function (error, rows, fields) {
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
        })
      } else {
        console.log("Error...", error);
        reject(error);
      }

      connection.release();
      console.log('Staff Added for Franchise %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Staff.prototype.update = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
       
      if (!error) {
        connection.changeUser({database : dbName["prod"]});
        connection.query('select city from franchise where id = "'+that.franchise_id+'"', function (error, rows, fields) {
          if (!error) {
        const frachiseDbName = 'rentronics_franchise_' + rows[0].city.substring(0, 4).toLowerCase();
        connection.changeUser({database : frachiseDbName});

        // connection.query('update staff set first_name = "'+that.first_name+'", last_name = "'+that.last_name+'", location = "'+that.location+'", contact = "'+that.contact+'", email = "'+that.email+'", pre_company_name = "'+that.pre_company_name+'", pre_company_address = "'+that.pre_company_address+'", pre_company_contact = "'+that.pre_company_contact+'", pre_position = "'+that.pre_position+'", duration = "'+that.duration+'", role =  "'+that.role+'", employment_docs = "'+that.employment_docs+'" WHERE id = "'+that.id+'")', function (error, rows, fields) {
          connection.query('update staff set first_name = "'+that.first_name+'", last_name = "'+that.last_name+'", location = "'+that.location+'", contact = "'+that.contact+'", email = "'+that.email+'", pre_company_name = "'+that.pre_company_name+'", pre_company_address = "'+that.pre_company_address+'", pre_company_contact = "'+that.pre_company_contact+'", pre_position = "'+that.pre_position+'", duration = "'+that.duration+'", role =  "'+that.role+'", employment_docs = "'+that.employment_docs+'" WHERE id = "'+that.id+'"', function (error, rows, fields) {
              if (!error) {
                resolve(rows);
              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
        }
     });
    }
       else {
        console.log("Error...", error);
        reject(error);
      }

      connection.release();
      console.log('Staff Added for Franchise %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Staff.prototype.all = function () {
        const that = this;
        return new Promise(function (resolve, reject) {
          connection.getConnection(function (error, connection) {
            if (error) {
              throw error;
            }
            if (!error) {
              // connection.changeUser({database : dbName["prod"]});
              // connection.query('select city from franchise where id = "'+that.franchise_id+'"', function (error, rows, fields) {
              // const frachiseDbName = 'rentronics_franchise_' + rows[0].city.substring(0, 4).toLowerCase();
              connection.changeUser({database : "rentronics_franchise_" + that.user_id.split('_')[1]});
              connection.query('select id, first_name, last_name, location, contact, email, pre_company_name, pre_company_address, pre_company_contact, pre_position, duration, user_id, role, employment_docs, created_by from staff order by id desc', function (error, rows, fields) {
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


module.exports = Staff;