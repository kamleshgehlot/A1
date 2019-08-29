const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var Staff = function (params) {
  console.log("params@@@@@@@@@@@", params);

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
  this.updated_by = params.updated_by;
  this.is_active = params.is_active;
};

Staff.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
   
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {

        // console.log("newStaff model............", that);
        let staffRoles= [];
        (that.role.split(',')).map((role,index) =>{
          staffRoles.push(role);
        });        
        // console.log('staff roles', staffRoles);


        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });


        connection.query('INSERT INTO user(franchise_id,director_id, name,user_id,password,designation,role_id,is_active,created_by) VALUES ("' + 0 + '", "' + 0 + '", "' + that.first_name + ' ' + that.last_name + '", "' + that.user_id + '", AES_ENCRYPT("' + that.password + '", "secret"), "' + that.designation + '", "' + that.role + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {
          const savedUserId = rows.insertId;
          (staffRoles.length > 0 ? staffRoles : []).map((data, index) => {
              connection.query('INSERT INTO user_role(user_id,role_id,is_active,created_by) VALUES ("' + savedUserId + '", "' + data + '", "' + that.is_active + '", "' + that.created_by + '")', function (error, rows, fields) {
                  resolve(rows);
              })
          });

          connection.query('INSERT INTO staff(franchise_user_id, first_name, last_name, location, contact, email, pre_company_name, pre_company_address, pre_company_contact, pre_position, duration, user_id, password, role, employment_docs, created_by) values ("' + savedUserId + '","' + that.first_name + '","' + that.last_name + '","' + that.location + '","' + that.contact + '","' + that.email + '","' + that.pre_company_name + '","' + that.pre_company_address + '","' + that.pre_company_contact + '","' + that.pre_position + '", "' + that.duration + '", "' + that.user_id + '", AES_ENCRYPT("' + that.password + '", "secret"), "' + that.role + '", "' + that.employment_docs + '", "' + that.created_by + '")', function (error, rows, fields) {
            if (!error) {
              resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        });
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
 if(that.employment_docs===''){
  // console.log("emplll",that.employment_docs);
  }
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select city from franchise where id = "' + that.franchise_id + '"', function (error, rows, fields) {
          if (!error) {
            connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });

            that.employment_docs==='' ? 
            // connection.query('update staff set first_name = "'+that.first_name+'", last_name = "'+that.last_name+'", location = "'+that.location+'", contact = "'+that.contact+'", email = "'+that.email+'", pre_company_name = "'+that.pre_company_name+'", pre_company_address = "'+that.pre_company_address+'", pre_company_contact = "'+that.pre_company_contact+'", pre_position = "'+that.pre_position+'", duration = "'+that.duration+'", role =  "'+that.role+'", employment_docs = "'+that.employment_docs+'" WHERE id = "'+that.id+'")', function (error, rows, fields) {
            connection.query('update staff set first_name = "' + that.first_name + '", last_name = "' + that.last_name + '", location = "' + that.location + '", contact = "' + that.contact + '", email = "' + that.email + '", pre_company_name = "' + that.pre_company_name + '", pre_company_address = "' + that.pre_company_address + '", pre_company_contact = "' + that.pre_company_contact + '", pre_position = "' + that.pre_position + '", duration = "' + that.duration + '", role =  "' + that.role + '", updated_by = "'+that.updated_by+'" WHERE id = "' + that.id + '"', function (error, rows, fields) {
              if (!error) {
                connection.query('update user set role_id = "'+that.role+'" WHERE id = "' + that.id + '"', function (error, rows, fields) { 
                  if(!error){
                    resolve(rows);
                  }
                  else {
                    console.log("Error...", error);
                    reject(error);
                  }
                });
              } else {
                console.log("Error...", error);
                reject(error);
              }
            })
            :
            connection.query('update staff set first_name = "' + that.first_name + '", last_name = "' + that.last_name + '", location = "' + that.location + '", contact = "' + that.contact + '", email = "' + that.email + '", pre_company_name = "' + that.pre_company_name + '", pre_company_address = "' + that.pre_company_address + '", pre_company_contact = "' + that.pre_company_contact + '", pre_position = "' + that.pre_position + '", duration = "' + that.duration + '", role =  "' + that.role + '", employment_docs = "' + that.employment_docs + '", updated_by = "'+that.updated_by+'" WHERE id = "' + that.id + '"', function (error, rows, fields) {
              if (!error) {
                connection.query('update user set role_id = "'+that.role+'" WHERE id = "' + that.id + '"', function (error, rows, fields) { 
                  if(!error){
                    resolve(rows);
                  }
                  else {
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
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select id, first_name, last_name, location, contact,  email, pre_company_name, pre_company_address, pre_company_contact, pre_position, duration, user_id, AES_DECRYPT(`password`, \'secret\') AS password, role, employment_docs, created_by from staff order by id desc', function (error, rows, fields) {
          if (!error) {

                let datas = [];
                (rows && rows.length > 0 ? rows : []).map(data =>{
                  let pass = data.password.toString('utf8');
                  data.password = pass;
                  datas.push(data);
                });
                
            resolve(datas);
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
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