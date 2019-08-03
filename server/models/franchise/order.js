const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var Order = function (params) {
  // console.log("params", params);

  this.user_id = params.user_id;
  this.order_id = params.order_id;
  this.customer_id = params.customer_id;
  this.products_id = params.products_id;
  this.order_type = params.order_type;
  this.flexOrderType = params.flexOrderType;
  this.fixedOrderType = params.fixedOrderType;
  this.payment_mode = params.payment_mode;
  this.order_date = params.order_date; 
  this.budget_list = params.budget_list;

  this.assigned_to = params.assigned_to;
  this.is_active = params.is_active;
  this.created_by =  params.created_by;

  this.lastInsertId = params.lastInsertId; 
};



Order.prototype.postOrder = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });

          const budget_list = that.budget_list;
          let budgetValues = [
            [that.customer_id, budget_list.work, budget_list.benefits, budget_list.accomodation, budget_list.childcare, budget_list.rent, budget_list.power, budget_list.telephone, budget_list.mobile, budget_list.vehicle, budget_list.transport, budget_list.food, budget_list.credit_card, budget_list.loan, budget_list.other_expenditure, budget_list.income, budget_list.expenditure, budget_list.surplus, budget_list.afford_amt, that.is_active, that.created_by]
          ];
          connection.query('INSERT INTO budget(customer_id, work, benefits, accomodation, childcare, rent, power, landline_phone, mobile_phone, vehicle_finance, public_transport, food, credit_store_cards, loans_hire_purchase, other_expenditure, total_income, total_expenditure, total_surplus, afford_amt, is_active, created_by) VALUES ?',[budgetValues],function (error, rows, fields) {
            if (!error) {
                const budget_id = rows.insertId;
                // const fixedOrderQuery = '';
                // const fixedOrderQuery = '';
                if(that.fixedOrderType!=null){
                  const fixedValues = that.fixedOrderType;
                  let fixedOrderValues =[
                    [that.customer_id, fixedValues.int_unpaid_bal, fixedValues.cash_price, fixedValues.delivery_fee, fixedValues.ppsr_fee, fixedValues.frequency, fixedValues.first_payment, fixedValues.last_payment, fixedValues.no_of_payment, fixedValues.each_payment_amt, fixedValues.total_payment_amt, fixedValues.before_delivery_amt, fixedValues.exp_delivery_at, fixedValues.minimum_payment_amt, fixedValues.intrest_rate, fixedValues.intrest_rate_per, fixedValues.total_intrest, that.is_active, that.created_by]
                  ];
                  connection.query('INSERT INTO fixed_order(customer_id, int_unpaid_bal, cash_price, delivery_fee, ppsr_fee, frequency, first_payment, last_payment, no_of_payment, each_payment_amt, total_payment_amt, before_delivery_amt, exp_delivery_at, minimum_payment_amt, interest_rate, interest_rate_per, total_interest, is_active, created_by) VALUES ?',[fixedOrderValues],function (error, rows, fields) {
                    if (!error) {
                      const lastInsertId = rows.insertId;
                      // console.log('fixed ..id', rows.insertId);
                      let orderValues = [
                        [that.order_id, that.customer_id, that.products_id, that.order_type, lastInsertId, budget_id, that.payment_mode, that.assigned_to, that.order_date, that.is_active, that.created_by]
                      ];
                      connection.query('INSERT INTO orders(order_id, customer_id, product_id, order_type, order_type_id, budget_id, payment_mode, assigned_to, order_date, is_active, created_by) VALUES ?',[orderValues],function (error, rows, fields) {
                        if (!error) {
                          // console.log('order inserted', rows.insertId);
                          resolve(rows.insertId);
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
                } 
                if(that.flexOrderType!=null){
                  const flexValues = that.flexOrderType;
                  let flexOrderValues =[
                    [that.customer_id, flexValues.goods_rent_price, flexValues.ppsr_fee, flexValues.liability_fee, flexValues.weekly_total, flexValues.frequency, flexValues.first_payment, flexValues.no_of_payment, flexValues.each_payment_amt, flexValues.total_payment_amt, flexValues.before_delivery_amt, flexValues.exp_delivery_at, flexValues.bond_amt, that.is_active, that.created_by]
                  ];
                  connection.query('INSERT INTO flex_order(customer_id, goods_rent_price, ppsr_fee, liability_fee, weekly_total, frequency, first_payment, no_of_payment, each_payment_amt, total_payment_amt, before_delivery_amt, exp_delivery_at, bond_amt, is_active, created_by) VALUES ?',[flexOrderValues],function (error, rows, fields) {
                    if (!error) {
                      const lastInsertId = rows.insertId;
                      // console.log('fixed ..id', rows.insertId);
                      let orderValues = [
                        [that.order_id, that.customer_id, that.products_id, that.order_type, lastInsertId, budget_id, that.payment_mode, that.assigned_to, that.order_date, that.is_active, that.created_by]
                      ];
                      connection.query('INSERT INTO orders(order_id, customer_id, product_id, order_type, order_type_id, budget_id, payment_mode, assigned_to, order_date, is_active, created_by) VALUES ?',[orderValues],function (error, rows, fields) {
                        if (!error) {
                          // console.log('order inserted', rows.insertId);
                          resolve(rows.insertId);
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
                }
            } else {
                    console.log("Error...", error);
                    reject(error);
                  }
            });


          
          
          // console.log('budget...',budget);

          
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.selectFromOrder = function () {
  const that = this;
  return new Promise(function(resolve, reject){
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('select * from orders where id = "'+that.lastInsertId+'"',function (error, rows, fields) {
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
      connection.release();
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
  throw error;
});
};



Order.prototype.getBudget = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT * from budget where id = "'+that.lastInsertId+'"',function (error, rows, fields) {
            if (!error) {
                resolve(rows);
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
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Order.prototype.getFlexOrderDetail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT * from flex_order where id = "'+that.lastInsertId+'"',function (error, rows, fields) {
            if (!error) {
                resolve(rows);
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
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.getFixedOrderDetail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT * from fixed_order where id = "'+that.lastInsertId+'"',function (error, rows, fields) {
            if (!error) {
                resolve(rows);
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
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};






Order.prototype.getCustomerDetails = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT * from customer where id = "'+that.lastInsertId+'"',function (error, rows, fields) {
            if (!error) {
                resolve(rows);
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
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.getOrderList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT o.order_id, c.id as customer_id, c.customer_name, c.mobile, c.telephone, o.order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.order_type_id, o.budget_id from orders as o inner join customer as c on o.customer_id = c.id',function (error, rows, fields) {
            if (!error) {
                resolve(rows);
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
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


// Enquiry.prototype.convertedList = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
    
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('select id, enquiry_id, customer_name, contact, interested_product_id, is_active, created_by from enquiry WHERE converted_to = 1 order by id desc',function (error, rows, fields) {
//             if (!error) {
//               // console.log("rows...",rows);
//                 resolve(rows);
//                 } else {
//                   console.log("Error...", error);
//                   reject(error);
//                 }
//           })
          
//       } else {
//         console.log("Error...", error);
//         reject(error);
//       }
//       connection.release();
//       console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };


// Enquiry.prototype.convert = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
    
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('update enquiry set converted_to = 1 WHERE id = "'+that.enquiry_id+'"',function (error, rows, fields) {
//             if (!error) {
//               // console.log("rows...",rows);
//                 resolve(rows);
//                 } else {
//                   console.log("Error...", error);
//                   reject(error);
//                 }
//           })
          
//       } else {
//         console.log("Error...", error);
//         reject(error);
//       }
//       connection.release();
//       console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };



Order.prototype.getnewid = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select id from orders order by id desc limit 1',function (error, rows, fields) {
            if (!error) {
                resolve(rows);
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
      console.log('Enquiry Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

module.exports = Order;