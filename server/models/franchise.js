const connection = require("../lib/connection.js");

const Franchise = function (params) {
  this.uid = params.uid;
  this.name = params.name;
  this.city = params.city;
  this.city_code = params.city_code;
  this.suburb = params.suburb;
  this.abn = params.abn;
  this.is_active = params.is_active;
  this.created_by = params.created_by;
  this.company_id = params.company_id;
  
};

// var table = "CREATE TABLE IF NOT EXISTS `user` ( `id` INT NOT NULL AUTO_INCREMENT, `franchise_id`  INT, name VARCHAR(50) NOT NULL, `user_id` VARCHAR(10) NOT NULL, `password` blob NOT NULL, `designation` VARCHAR(50) NULL, `mobile_no` VARCHAR(50) NULL, `email` VARCHAR(50) NULL, `role_id` INT NOT NULL, `is_active` TINYINT NULL, `created_by` INT NULL, `created_at` timestamp null default current_timestamp, PRIMARY KEY (id));";
// var table1 = "CREATE TABLE IF NOT EXISTS `role` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `is_active` TINYINT NULL, `created_by` INT NOT NULL,`created_at` timestamp null default current_timestamp,PRIMARY KEY (id));";

Franchise.prototype.register = function (newUser) {
  const that = this;
  return new Promise(function (resolve, reject) {
    // const dbName = 'rentronics_franchise_' + that.user_id.split('_')[1];

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      // if (!error) {
      //   connection.query('CREATE DATABASE IF NOT EXISTS ??', dbName, function (error, rows, fields) {

          // if (!error) {
          //   connection.changeUser({database : dbName});
          //   connection.query(table, function(err) {

          //     connection.query(table1, function(err) {

              // if (err) {
              //   console.log('error in creating tables', err);
              //   return;
              // }

              // let values1 = [
              //   [2,'Admin',1,1],
              //   [3,'CSR',1,1],
              //   [4,'Finance',1,1],
              //   [5,'Delivery',1,1],
              //   [6,'HR',1,1]
              // ]

              // connection.changeUser({database : dbName});
              // connection.query('INSERT INTO `role`(`id`, `name`, `is_active`, `created_by`) VALUES ?', [values1], function (error, rows, fields) {
              //   if (error) {
              //     console.log("Error...", error);
              //     reject(error);
              //   }

              if (!error) {
              let values = [
                [that.uid, that.name, that.city, that.city_code, that.suburb, that.abn, that.is_active, that.created_by, that.company_id]
              ]

              connection.changeUser({database : 'rentronics'});
              connection.query('INSERT INTO franchise(uid,name,city,city_code,suburb,abn,is_active,created_by,company_id) VALUES ?', [values], function (error, rows, fields) {

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
          });
        
              // console.log('created a new table');
            // });
      // //     } else {
      // //       console.log("Error...", error);
      // //       reject(error);
      // //     }
      // // });

      // // } else {
      // //   console.log("Error...", error);
      // //   reject(error);
      // }

      
  //   });
  // }).catch((error) => {
  //   reject(error);
  // });
  // // });
};

// Franchise.prototype.all = function () {
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       console.log('Process Started %d All', connection.threadId);

//       if (error) {
//         throw error;
//       }

//       connection.changeUser({database : 'rentronics'});
//       connection.query('select u.id as user_id, f.name as frandhise_name, u.franchise_id, f.name, f.location, f.contact, f.abn, u.is_active, u.created_at from user u inner join franchise f on u.franchise_id = f.id', function (error, rows, fields) {

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

module.exports = Franchise;