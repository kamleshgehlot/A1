const connection = require("../lib/connection.js");


Franchise.prototype.register = function (newUser) {
  const that = this;
  const dbName = "rentronics_franchise_" + that.name;
  
  return new Promise(function (resolve, reject) {
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("CREATE DATABASE " + dbName, function (err, result) {
        if (err) throw err;
       
          // In API when You getting DBName dbName you can use
          
console.log("dbName...........", dbName);
getConnectionNew(dbName).query('CREATE TABLE `user` ( id INT NOT NULL AUTO_INCREMENT, franchise_id INT, name VARCHAR(50) NOT NULL, user_id VARCHAR(10) NOT NULL, password blob NOT NULL, designation VARCHAR(50) NULL, mobile_no VARCHAR(50) NULL, email VARCHAR(50) NULL, role_id INT NOT NULL, is_active TINYINT NULL, created_by INT NULL, created_at timestamp null default current_timestamp, PRIMARY KEY (id));', function(err, rows, fields) {
            if (!err)
              console.log('The solution is: ', rows);
            else
              console.log('Error while performing Query.')          
          });
        console.log("Database created");
      });
    });
  //   connection.getConnection(function (error, connection) {
  //     if (error) {
  //       throw error;
  //     }

  //     let values = [
  //       [that.name, that.location, that.contact, that.abn, that.is_active, that.created_by]
  //     ]

  //     if (!error) {
  //       connection.query('INSERT INTO franchise(name,location,contact,abn,is_active,created_by) VALUES ?', [values], function (error, rows, fields) {

  //         if (!error) {
  //           let franchise_id = rows.insertId;

  //           resolve({ franchise_id: franchise_id });
  //         } else {
  //           console.log("Error...", error);
  //           reject(error);
  //         }
  //       });
  //     } else {
  //       console.log("Error...", error);
  //       reject(error);
  //     }

  //     connection.release();
  //     console.log('Process Complete %d', connection.threadId);
  //   });
  // }).catch((error) => {
  //   reject(error);
  // });
  });
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