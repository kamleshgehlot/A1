const connection = require("../lib/connection.js");
const dbName = require('../lib/databaseMySQL.js');

const Franchise = function (params) {
  // this.id = params.id;
  this.uid = params.uid;
  this.password = params.password;
  this.name = params.name;
  this.city = params.city;
  this.city_code = params.city_code;
  this.suburb = params.suburb;
  this.abn = params.abn;
  this.state = params.state;
  this.created_by = params.created_by;
  this.company_id = params.company_id;

  //frachise id for updation
  this.f_id = params.f_id;
};


var table = "CREATE TABLE IF NOT EXISTS `user` ( `id` INT NOT NULL AUTO_INCREMENT, `franchise_id`  INT, name VARCHAR(50) NOT NULL, `user_id` VARCHAR(10) NOT NULL, `password` blob NOT NULL, `designation` VARCHAR(50) NULL, `mobile_no` VARCHAR(50) NULL, `email` VARCHAR(50) NULL, `role_id` INT NOT NULL, `state` TINYINT NULL, `created_by` INT NULL, `created_at` timestamp null default current_timestamp, PRIMARY KEY (id));";
var table1 = "CREATE TABLE IF NOT EXISTS `role` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `state` TINYINT NULL, `created_by` INT NOT NULL,`created_at` timestamp null default current_timestamp,PRIMARY KEY (id));";
const userRole = "CREATE TABLE IF NOT EXISTS `user_role` (id INT NOT NULL AUTO_INCREMENT,user_id INT NOT NULL,role_id INT NOT NULL,state TINYINT NULL,created_by INT NOT NULL,created_at timestamp null default current_timestamp,PRIMARY KEY (id));";

Franchise.prototype.register = function (newUser) {
  const that = this;
  return new Promise(function (resolve, reject) {
    console.log("franchise..........", that)
    const dbName = 'rentronics_franchise_' + that.uid.split('_')[1];

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      else if(!error) {
        connection.query('CREATE DATABASE IF NOT EXISTS ??', dbName, function (error, rows, fields) {
          if (!error) {
            connection.changeUser({database : dbName["prod"]});
            connection.query(table, function(err) {
              
              connection.query(table1, function(err) {

              connection.query(userRole, function(err) {
              if (err) {
                console.log('error in creating tables', err);
                return;
              }

              let values1 = [
                [2,'Admin',1,1],
                [3,'CSR',1,1],
                [4,'Finance',1,1],
                [5,'Delivery',1,1],
                [6,'HR',1,1]
              ]

              // connection.changeUser({database : dbName});
              // connection.query('INSERT INTO `role`(`id`, `name`, `state`, `created_by`) VALUES ?', [values1], function (error, rows, fields) {
                if (error) {
                  console.log("Error...", error);
                  reject(error);
                }

              if (!error) {
              let values = [
                [that.uid, that.password, that.name, that.city, that.city_code, that.suburb, that.abn, that.state, that.created_by, that.company_id]
              ]

              connection.changeUser({database : dbName["prod"]});
              connection.query('INSERT INTO franchise(uid,name,city,city_code,suburb,abn,state,created_by,company_id) VALUES ("' + that.uid + '", "' + that.name + '", "' + that.city + '", "' + that.city_code + '", "' + that.suburb + '", "' + that.abn + '", "' + that.state + '", "' + that.created_by + '", "' + that.company_id + '")', function (error, rows, fields) {

                if (!error) {
                  let franchise_id = rows.insertId;
                  resolve({ franchise_id: franchise_id });
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            }
          
            connection.release();
            console.log('Process Complete %d', connection.threadId);
          });
          // });
        });
              console.log('created a new table');
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

      
    });
  }).catch((error) => {
    console.log("error....", error);
    throw error;
  });
  // // });
};




































Franchise.prototype.update = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      let values = [that.uid, that.name, that.city, that.city_code, that.suburb, that.abn, that.state, that.f_id];

      if (!error) {
        connection.changeUser({database : dbName["prod"]});
        connection.query('update franchise set uid = "' + that.uid + '", name = "' + that.name + '", city= "' + that.city + '", suburb = "' + that.suburb + '", abn ="' + that.abn + '", state ="' + that.state + '"  WHERE id = "' + that.f_id + '"', function (error, rows, fields) {
          if (!error) {
            connection.query('select company_id from franchise where id="' + that.f_id + '"', function (error, rows, fields){
            if (!error) {
              resolve(rows);
            }
            })
            
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















Franchise.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      // console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName["prod"]});
      connection.query('select f.id, f.uid, f.name as franchise_name, f.city, f.city_code, f.state, c.name as company_name, c.location as company_location, c.director, c.contact, c.alt_contact, c.website, c.nbzn, f.suburb, f.abn,  c.director, c.email, c.contact, a.name as accountant_name, a.email as accountant_email, a.contact as accountant_contact from franchise f inner join company c on f.company_id = c.id inner join accountant a on c.accountant_id = a.id order by f.id desc', function (error, rows, fields) {
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