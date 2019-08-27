const connection = require("../lib/connection.js");
const dbName = require('../lib/databaseMySQLNew.js');

const Franchise = function (params) {
  // this.id = params.id;

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
  // this.com_id = params.com_id;
  this.email = params.email;
};



const user = "CREATE TABLE IF NOT EXISTS `user` ( `id` INT NOT NULL AUTO_INCREMENT, `franchise_id`  INT, `director_id` INT, status bool not null DEFAULT FALSE, name VARCHAR(50) NOT NULL, `user_id` VARCHAR(20) NOT NULL, `password` BLOB NOT NULL, `token` VARCHAR(100) NULL, `account_id` VARCHAR(100) NULL, `designation` VARCHAR(50) NULL, `role_id` INT NOT NULL, `is_active` TINYINT NULL, `created_by` INT NULL, `created_at` timestamp null default current_timestamp, PRIMARY KEY (id));";
const role = "CREATE TABLE IF NOT EXISTS `role` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `state` TINYINT NULL, `created_by` INT NOT NULL,`created_at` timestamp null default current_timestamp,PRIMARY KEY (id));";
const userRole = "CREATE TABLE IF NOT EXISTS `user_role` (id INT NOT NULL AUTO_INCREMENT,user_id INT NOT NULL,role_id INT NOT NULL,state TINYINT NULL,created_by INT NOT NULL,created_at timestamp null default current_timestamp,PRIMARY KEY (id));";
const staff = "CREATE TABLE IF NOT EXISTS `staff` ( `id` int(11) NOT NULL AUTO_INCREMENT, `franchise_user_id` INT NOT NULL, `first_name` varchar(20) NOT NULL,`last_name` varchar(20) DEFAULT NULL, `location` varchar(200) NOT NULL, `contact` varchar(10) NOT NULL, `email` varchar(50) NOT NULL, `pre_company_name` varchar(30) DEFAULT NULL, `pre_company_address` varchar(200) DEFAULT NULL, `pre_company_contact` varchar(10) DEFAULT NULL, `pre_position` varchar(100) DEFAULT NULL, `duration` varchar(80) DEFAULT NULL, `user_id` varchar(20) NOT NULL, `password` blob NOT NULL, `role` varchar(20) NULL, `employment_docs` varchar(500) DEFAULT NULL, `created_by` tinyint(4) NOT NULL, `updated_by` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const task = "CREATE TABLE IF NOT EXISTS `task` ( `id` int(10) NOT NULL AUTO_INCREMENT,  `task_id` varchar(10) NOT NULL,  `task_description` varchar(255) DEFAULT NULL,  `is_active` TINYINT(5) NOT NULL, `created_at` timestamp NOT NULL DEFAULT current_timestamp(),`created_by` INT NULL,  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(), `updated_by` INT NULL, PRIMARY KEY (id));";
const taskAssign = "CREATE TABLE IF NOT EXISTS `task_assign` ( `id` int(10) NOT NULL AUTO_INCREMENT,  `task_id` varchar(10) NOT NULL, `assign_role` int(11) DEFAULT NULL, `assigned_to` int(11) DEFAULT NULL,  `start_date` varchar(25) DEFAULT NULL, `due_date` varchar(25) DEFAULT NULL,  `completion_date` VARCHAR(25) DEFAULT NULL, `message` TEXT DEFAULT NULL, `document` TEXT DEFAULT NULL, `status` int(11)  NOT NULL,  `is_active` TINYINT(5) NOT NULL, `created_at` timestamp NOT NULL DEFAULT current_timestamp(),`created_by` INT NULL,  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(), `updated_by` INT NULL, PRIMARY KEY (id));";
const customer = "CREATE TABLE IF NOT EXISTS `customer` (`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `customer_name` varchar(50) NOT NULL, `address` varchar(200) NOT NULL, `city` varchar(70) NOT NULL, `postcode` varchar(10) DEFAULT NULL, `telephone` varchar(10) DEFAULT NULL, `mobile` varchar(10) DEFAULT NULL, `email` varchar(100) DEFAULT NULL, `gender` varchar(15) NOT NULL, `is_working` tinyint(4) NOT NULL, `dob` varchar(30) DEFAULT NULL, `id_type` int(11) DEFAULT NULL, `other_id_type` VARCHAR(255) DEFAULT NULL, `id_number` varchar(30) DEFAULT NULL, `expiry_date` varchar(30) NOT NULL, `is_adult` tinyint(4) NOT NULL, `id_proof` varchar(500) DEFAULT NULL, `other_id_proof` varchar(500) DEFAULT NULL, `alt_c1_name` varchar(50) DEFAULT NULL, `alt_c1_address` varchar(200) DEFAULT NULL, `alt_c1_contact` varchar(10) DEFAULT NULL, `alt_c1_relation` varchar(20) DEFAULT NULL, `alt_c2_name` varchar(50) DEFAULT NULL, `alt_c2_address` varchar(200) DEFAULT NULL, `alt_c2_contact` varchar(10) DEFAULT NULL, `alt_c2_relation` varchar(20) DEFAULT NULL, `state` tinyint(4) NOT NULL, `is_active` tinyint(4) NOT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const customer_income = "CREATE TABLE IF NOT EXISTS `customer_income` (`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `cust_id` int(11) DEFAULT NULL, `employer_name` varchar(100) DEFAULT NULL, `employer_address` varchar(200) DEFAULT NULL, `employer_telephone` varchar(10) DEFAULT NULL, `employer_email` varchar(50) DEFAULT NULL, `employer_tenure` varchar(50) DEFAULT NULL, `state` tinyint(4) NOT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` tinyint(4) DEFAULT NULL, `updated_by` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const customer_state = "CREATE TABLE IF NOT EXISTS customer_state(id tinyint(4) NOT NULL AUTO_INCREMENT, state_name VARCHAR(20) NOT NULL, is_active tinyint(4) NOT NULL, PRIMARY KEY(id));";
const idProof = "CREATE TABLE  IF NOT EXISTS `id_type` (`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const enquiry = "CREATE TABLE IF NOT EXISTS enquiry(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `enquiry_id` varchar(10) NOT NULL, `customer_name` varchar(50) NOT NULL, `contact` varchar(10) DEFAULT NULL, `interested_product_id` varchar(20) NOT NULL, `converted_to` tinyint(4) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const orders = "CREATE TABLE IF NOT EXISTS orders(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `order_id` varchar(50) NOT NULL, `customer_id` int(11) NOT NULL, `customer_type` TINYINT(4) DEFAULT NULL, `product_id` varchar(255) NOT NULL, `product_related_to` varchar(255) DEFAULT NULL, `order_type` tinyint(4) NOT NULL, `order_type_id` int(11) NOT NULL, `budget_id` int(11) NOT NULL, payment_mode tinyint(4) NOT NULL, `assigned_to` tinyint(4) NOT NULL, `order_date` varchar(50) NOT NULL, `order_status` TINYINT(4) DEFAULT NULL, `doc_upload_status` TINYINT(4) NOT NULL DEFAULT '0', `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const payment_mode = "CREATE TABLE IF NOT EXISTS payment_mode(`id` tinyint(4) NOT NULL AUTO_INCREMENT, `payment_mode` VARCHAR(50) NOT NULL, `is_active` tinyint(4) NOT NULL, PRIMARY KEY(id))";
const budget = "CREATE TABLE IF NOT EXISTS budget(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `customer_id` int(11) UNSIGNED NOT NULL, `work` double(10,2) DEFAULT NULL, `benefits` double(10,2) DEFAULT NULL, `accomodation` double(10,2) DEFAULT NULL, `childcare` double(10,2) DEFAULT NULL, `rent` double(10,2) DEFAULT NULL, `power` double(10,2) DEFAULT NULL, `landline_phone` double(10,2) DEFAULT NULL, `mobile_phone` double(10,2) DEFAULT NULL, `vehicle_finance` double(10,2) DEFAULT NULL, `public_transport` double(10,2) DEFAULT NULL, `food` double(10,2) DEFAULT NULL, `credit_store_cards` double(10,2) DEFAULT NULL, `loans_hire_purchase` double(10,2) DEFAULT NULL, `other_expenditure` double(10,2) DEFAULT NULL, `pre_order_exp` double(10,2) DEFAULT NULL, `total_income` double(10,2) DEFAULT NULL, `total_expenditure`  double(10,2) DEFAULT NULL, `total_surplus` double(10,2) DEFAULT NULL, `afford_amt` double(10,2) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const flex_order = "CREATE TABLE IF NOT EXISTS flex_order(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `customer_id` int(11) UNSIGNED NOT NULL, `goods_rent_price` double(10,2) DEFAULT NULL, `ppsr_fee` double(10,2) DEFAULT NULL, `liability_fee` double(10,2) DEFAULT NULL, `weekly_total` double(10,2) DEFAULT NULL, `frequency` int(11) DEFAULT NULL, `first_payment` varchar(50) DEFAULT NULL, `no_of_payment` double(10,2) DEFAULT NULL, `each_payment_amt` double(10,2) DEFAULT NULL, `total_payment_amt` double(10,2) DEFAULT NULL, `before_delivery_amt` double(10,2) DEFAULT NULL, `exp_delivery_at` timestamp DEFAULT CURRENT_TIMESTAMP, `bond_amt` double(10,2) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const fixed_order = "CREATE TABLE IF NOT EXISTS fixed_order(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `customer_id` int(11) UNSIGNED NOT NULL, `int_unpaid_bal` double(10,2) DEFAULT NULL, `cash_price` double(10,2) DEFAULT NULL, `delivery_fee` double(10,2) DEFAULT NULL, `ppsr_fee` double(10,2) DEFAULT NULL, `frequency` int(11) DEFAULT NULL, `first_payment` varchar(50) DEFAULT NULL, `last_payment` varchar(50) DEFAULT NULL, `no_of_payment` double(10,2) DEFAULT NULL, `each_payment_amt` double(10,2) DEFAULT NULL, `total_payment_amt` double(10,2) DEFAULT NULL, `before_delivery_amt` double(10,2) DEFAULT NULL, `exp_delivery_at` timestamp DEFAULT CURRENT_TIMESTAMP, `minimum_payment_amt` double(10,2) DEFAULT NULL, `interest_rate` double(10,2) DEFAULT NULL, `interest_rate_per` double(10,2) DEFAULT NULL, `total_interest` double(10,2) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const order_document = "CREATE TABLE IF NOT EXISTS order_document(`id` int(11) NOT NULL AUTO_INCREMENT, `order_id` int(11) NOT NULL, `document` varchar(255) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const payment_status = "CREATE TABLE IF NOT EXISTS payment_status (`id` bigint(20) NOT NULL AUTO_INCREMENT, `order_id` int(11) DEFAULT NULL, `customer_id` int(11) DEFAULT NULL, `installment_no` int(11) DEFAULT NULL, `payment_date` varchar(50) DEFAULT NULL, `payment_amt` double DEFAULT NULL, `total_paid` double DEFAULT NULL, `status` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const order_status = "CREATE TABLE IF NOT EXISTS order_status (`id` int(11) NOT NULL AUTO_INCREMENT, `order_status` varchar(50) NOT NULL, PRIMARY KEY(id))";

// const leads = "CREATE TABLE  IF NOT EXISTS `leads` (`id` int(10) NOT NULL AUTO_INCREMENT,`lead_id` varchar(255) , `franchise_id` int(10) NOT NULL,  `message` TEXT DEFAULT NULL, `document` TEXT DEFAULT NULL, `converted_to` varchar(255)  DEFAULT NULL,`is_active` tinyint(4) DEFAULT NULL, `created_by` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";

Franchise.prototype.register = function (newUser) {
  const that = this;
  return new Promise(function (resolve, reject) {
    const frachiseDbName = dbName.getFullName(dbName["prod"], that.city.substring(0, 2).toLowerCase() + that.suburb.substring(0, 2).toLowerCase());
    // console.log("franchise database name..........", frachiseDbName)

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      else if (!error) {
        connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', frachiseDbName, function (error, rows, fields) {
          if (rows.length === 0) {

            connection.query('CREATE DATABASE IF NOT EXISTS ??', frachiseDbName, function (error, rows, fields) {
              if (!error) {
                connection.changeUser({ database: frachiseDbName });
                connection.query(user, function (err) {
                  connection.query(role, function (err) {
                    connection.query(userRole, function (err) {
                      connection.query(staff, function (err) {
                        connection.query(task, function (err) {
                          connection.query(taskAssign, function (err) {
                            connection.query(customer,function(err){
                              connection.query(customer_income,function(err){
                                connection.query(customer_state,function(err){
                                connection.query(idProof,function(err){
                                  connection.query(enquiry,function(err){
                                    connection.query(orders,function(err){
                                      connection.query(budget,function(err){
                                        connection.query(payment_mode,function(err){
                                          connection.query(flex_order,function(err){
                                            connection.query(fixed_order,function(err){
                                              connection.query(order_document,function(err){
                                                connection.query(payment_status, function(err){
                                                  connection.query(order_status, function(err){

                                  // connection.query(leads,function(err){
                            if (err) {
                              console.log('error in creating tables', err);
                              return;
                            }

                            let values1 = [
                              [2, 'Admin', 1, 1],
                              [3, 'CSR', 1, 1],
                              [4, 'Finance', 1, 1],
                              [5, 'Delivery', 1, 1],
                              [6, 'HR', 1, 1]
                            ]
                            
                            let idTypeData = [
                              [1, 'Passport', 1, 1],
                              [2, 'Driving Licence', 1, 1],
                              [3, 'Medicare', 1, 1]
                            ]

                            let cust_state = [
                              [1, 'Active', 1],
                              [2, 'Hold', 1],
                              [3, 'Completed', 1]
                            ]

                            
                            let pay_mode = [
                              [1, 'EasyPay', 1],
                              [2, 'Credit', 1],
                              [3, 'Debit', 1],
                              [4, 'PayPal', 1],
                              [5, 'Cash', 1],
                            ]

                            let order_status_data = [
                              [1, 'Created'],
                              [2, 'In Progress'],
                              [3, 'Awaiting Payment'],
                              [4, 'Under Delivery'], 
                              [5, 'Delivered'],
                              [6, 'Awaiting Remaining'],
                              [7, 'Completed'],
                            ]

                           connection.changeUser({ database: frachiseDbName });
                            connection.query('INSERT INTO `role`(`id`, `name`, `state`, `created_by`) VALUES ?', [values1], function (error, rows, fields) {
                              connection.query('INSERT INTO `id_type`(`id`, `name`, `is_active`, `created_by`) VALUES ?', [idTypeData], function (error, rows, fields) {
                                connection.query('INSERT INTO `customer_state`(`id`, `state_name`, `is_active`) VALUES ?', [cust_state], function (error, rows, fields) {
                                  connection.query('INSERT INTO `payment_mode`(`id`, `payment_mode`, `is_active`) VALUES ?', [pay_mode], function (error, rows, fields) {
                                    connection.query('INSERT INTO `order_status`(`id`, `order_status`) VALUES ?', [order_status_data], function (error, rows, fields) {
                              if (error) {
                                console.log("Error in inserting records...", error);
                                reject(error);
                              }

                              if (!error) {
                                let values = [
                                  [that.uid, that.password, that.name, that.city, that.city_code, that.suburb, that.abn, that.state, that.created_by, that.company_id]
                                ]

                                connection.changeUser({ database: dbName["prod"] });
                                connection.query('INSERT INTO franchise(name,fdbname,city,city_code,suburb,abn,state,created_by,company_id) VALUES ( "' + that.name + '", "' + frachiseDbName + '", "' + that.city + '", "' + that.city_code + '", "' + that.suburb + '", "' + that.abn + '", "' + that.state + '", "' + that.created_by + '", "' + that.company_id + '")', function (error, rows, fields) {

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
                        });
                          });
                        });
                      });
                    });
                        });
                      });
                      });
                        });
                      });
                    });
                    });
                  });
                    });
                          });
                        });
                        });
                      });
                    });
                    });
                  });
                  console.log('created a new table');
                });
              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
          } else {
            connection.changeUser({ database: dbName["prod"] });
            connection.query('SELECT id from franchise where fdbname = ?', frachiseDbName, function (error, rows, fields) {
              console.log("Frachise DB already exists............", rows);
              if (!error) {
                resolve({ franchise_id: rows[0].id });
              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
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
        connection.changeUser({ database: dbName["prod"] });
        connection.query('update franchise set name = "' + that.name + '", city= "' + that.city + '", suburb = "' + that.suburb + '", abn ="' + that.abn + '", state ="' + that.state + '"  WHERE id = "' + that.f_id + '"', function (error, rows, fields) {
          if (!error) {
            // connection.query('select company_id from franchise where id="' + that.f_id + '"', function (error, rows, fields){
            // if (!error) {
            resolve(rows);
            // }
            // })
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



Franchise.prototype.verifyEmail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if(!error){
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select u.id as `u_id`, c.id as `director_id`, c.director, c.email, u.user_id from company as c INNER JOIN user as u on c.id = u.director_id WHERE c.email = "'+that.email+'" AND u.status = 1', function (error, rows, fields) {
          if (!error) {
            if(rows.length ===0){
              connection.query('select email from accountant where email = "'+that.email+'"', function (error, rows, fields) {
                if (!error) {
                  if(rows.length===0){
                    connection.query('select email from master_staff where email = "'+that.email+'"', function (error, rows, fields) {
                      if (!error) {
                        if(rows.length===0){
                          connection.query('select fdbname from franchise', function (error, rows, fields) {
                            if (!error) {
                              if(rows.length>0){
                                
                                (rows.length>0 ? rows : []).map((dbname, index)=>{
                                  connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', dbname.fdbname, function (error, rows, fields) {
                                    if (rows.length > 0) {
                                    // console.log('fdbname map---',dbname.fdbname);
                                    connection.changeUser({ database:  dbname.fdbname});
                                    connection.query('select email from staff where email = "'+that.email+'"', function (error, rows, fields) {
                                      if (!error) {
                                        if(rows.length===0){
                                          connection.query('select email from customer where email = "'+that.email+'"', function (error, rows, fields) {
                                            if (!error) {
                                              if(rows.length===0){
                                                connection.query('select employer_email from customer_income where employer_email = "'+that.email+'"', function (error, rows, fields) {
                                                  if (!error) {
                                                    resolve(rows);
                                                  }else {
                                                    console.log("Error...", error);
                                                    reject(error);
                                                  }
                                                });
                                              }else{
                                                resolve(rows);
                                              }
                                            }else {
                                              console.log("Error...", error);
                                              reject(error);
                                            }
                                          });
                                        }else{
                                          resolve(rows);
                                        }
                                      }else {
                                        console.log("Error...", error);
                                        reject(error);
                                      }
                                    })
                                  }
                                  });
                                });
                              }else{
                                resolve(rows);
                              }
                            }else {
                              console.log("Error...", error);
                              reject(error);
                            }
                          });
                        }else{
                          resolve(rows);
                        }
                      }else {
                        console.log("Error...", error);
                        reject(error);
                      }
                    });
                  }else{
                    resolve(rows);
                  }
                }else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            }else{
              resolve(rows);
            }
          }else {
                console.log("Error...", error);
                reject(error);
              }
        });
        // connection.query('select u.id as `u_id`, c.id as `director_id`, c.director, c.email, u.user_id from company as c INNER JOIN user as u on c.id = u.director_id WHERE c.email = "'+that.email+'" AND u.status = 0', function (error, rows, fields) {
        //   if (!error) {
        //     (rows.length > 0 ? rows : []).map((data,index) => { 
        //       connection.query('update user set token = "", account_id = "" where id = '+data.u_id+' ', function (error, rows, fields) {
        //         if (!error) {
        //           console.log(rows);
        //           if(!rows[0]){
        //             resolve(rows);
        //               console.log('okkk');
        //           }
        //         }else {
        //           console.log("Error...", error);
        //           reject(error);
        //         }
        //       })
        //     });
        //   // }
        // } else {
        //     console.log("Error...", error);
        //     reject(error);
        //   }
        // });
      }
        connection.release();
        console.log('Process Complete %d', connection.threadId);
      
    });
  });
}




Franchise.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      // console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('SELECT u.franchise_id, u.director_id, u.user_id, AES_DECRYPT(`password`, \'secret\') AS password, u.designation, u.role_id, u.is_active, c.name as company_name, c.nbzn, c.location as company_location, c.director, c.email, c.contact, c.alt_contact, c.website, c.accountant_id, f.name as franchise_name, f.company_id, f.city, f.city_code, f.suburb, f.state, a.name as accountant_name, a.email as accountant_email, a.contact as accountant_contact from user u INNER JOIN company c on u.director_id = c.id INNER JOIN franchise f on u.franchise_id = f.id INNER JOIN accountant a on c.accountant_id = a.id order by f.id desc', function (error, rows, fields) {
        if (!error) {  
          let datas = [];
          (rows && rows.length > 0 ? rows : []).map(data =>{
            let pass = data.password.toString('utf8');
            data.password = pass;
            // console.log('passss',data);
            datas.push(data);
          });
          resolve(datas);
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