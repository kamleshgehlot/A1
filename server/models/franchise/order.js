const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");


var Order = function (params) {
  console.log("params", params);
  this.id = params.id;
  this.user_id = params.user_id;
  this.userid = params.userid;

  this.order_id = params.order_id;
  this.customer_id = params.customer_id;
  this.customer_type = params.customer_type;
  this.products_id = params.products_id;
  this.order_type = params.order_type;
  this.order_type_id = params.order_type_id;
  this.flexOrderType = params.flexOrderType;
  this.fixedOrderType = params.fixedOrderType;
  this.payment_mode = params.payment_mode;
  this.order_date = params.order_date; 
  this.budget_list = params.budget_list;

  this.assigned_to = params.assigned_to;
  this.is_active = params.is_active;
  this.created_by =  params.created_by;
  this.updated_by =  params.updated_by;
  this.related_to = params.related_to;

  this.lastInsertId = params.lastInsertId; 
  this.budget_id = params.budgetId;
  this.fixedOrderId = params.fixedOrderId;
  this.flexOrderId = params.flexOrderId;
  
  this.converted_to = params.converted_to;

  this.installment_no = params.installment_no;
  this.last_installment_no = params.last_installment_no;
  this.payment_date= params.payment_date;
  this.payment_amt = params.payment_amt;
  this.total_paid = params.total_paid;
  this.installment_before_delivery = params.installment_before_delivery;
  this.delivered_date = params.delivered_date;
  this.delivered_time = params.delivered_time;
  this.payment_rec_date = params.payment_rec_date;
  // this.status = params.status;
  this.user_role = params.user_role;
  this.comment = params.comment;
      
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
            [that.customer_id, budget_list.work, budget_list.benefits, budget_list.accomodation, budget_list.childcare, budget_list.rent, budget_list.power, budget_list.telephone, budget_list.mobile, budget_list.vehicle, budget_list.transport, budget_list.food, budget_list.credit_card, budget_list.loan, budget_list.other_expenditure, budget_list.pre_order_exp, budget_list.income, budget_list.expenditure, budget_list.surplus, budget_list.afford_amt, that.is_active, that.created_by]
          ];
          connection.query('INSERT INTO budget(customer_id, work, benefits, accomodation, childcare, rent, power, landline_phone, mobile_phone, vehicle_finance, public_transport, food, credit_store_cards, loans_hire_purchase, other_expenditure, pre_order_exp, total_income, total_expenditure, total_surplus, afford_amt, is_active, created_by) VALUES ?',[budgetValues],function (error, rows, fields) {
            if (!error) {
                const budget_id = rows.insertId;
                // const fixedOrderQuery = '';
                // const fixedOrderQuery = '';
                if(that.fixedOrderType!=null){
                  const fixedValues = that.fixedOrderType;
                  let fixedOrderValues =[
                    [that.customer_id, fixedValues.int_unpaid_bal, fixedValues.cash_price, fixedValues.delivery_fee, fixedValues.ppsr_fee, fixedValues.frequency, fixedValues.first_payment, fixedValues.last_payment, fixedValues.duration, fixedValues.no_of_payment, fixedValues.each_payment_amt, fixedValues.total_payment_amt, fixedValues.before_delivery_amt, fixedValues.exp_delivery_date, fixedValues.exp_delivery_time, fixedValues.minimum_payment_amt, fixedValues.intrest_rate, fixedValues.intrest_rate_per, fixedValues.total_intrest, that.is_active, that.created_by]
                  ];
                  // console.log('fixedValues',fixedOrderValues);
                  // console.log('fixedValues2', that.fixedOrderType);
                  connection.query('INSERT INTO fixed_order(customer_id, int_unpaid_bal, cash_price, delivery_fee, ppsr_fee, frequency, first_payment, last_payment, duration, no_of_payment, each_payment_amt, total_payment_amt, before_delivery_amt, exp_delivery_date, exp_delivery_time, minimum_payment_amt, interest_rate, interest_rate_per, total_interest, is_active, created_by) VALUES ?',[fixedOrderValues],function (error, rows, fields) {
                    if (!error) {
                      const lastInsertId = rows.insertId;
                      // console.log('fixed ..id', rows.insertId);
                      let orderValues = [
                        [that.order_id, that.customer_id, that.customer_type, that.products_id, that.related_to, that.order_type, lastInsertId, budget_id, that.payment_mode, that.assigned_to, that.order_date, fixedValues.exp_delivery_date, fixedValues.exp_delivery_time, 1, that.is_active, that.created_by]
                      ];
                      connection.query('INSERT INTO orders(order_id, customer_id, customer_type, product_id, product_related_to, order_type, order_type_id, budget_id, payment_mode, assigned_to, order_date, delivery_date, delivery_time, order_status, is_active, created_by) VALUES ?',[orderValues],function (error, rows, fields) {
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
                    [that.customer_id, flexValues.goods_rent_price, flexValues.ppsr_fee, flexValues.liability_fee, flexValues.weekly_total, flexValues.frequency, flexValues.first_payment,  flexValues.duration, flexValues.no_of_payment, flexValues.each_payment_amt, flexValues.total_payment_amt, flexValues.before_delivery_amt, flexValues.exp_delivery_date, flexValues.exp_delivery_time, flexValues.bond_amt, that.is_active, that.created_by]
                  ];
                  connection.query('INSERT INTO flex_order(customer_id, goods_rent_price, ppsr_fee, liability_fee, weekly_total, frequency, first_payment, duration, no_of_payment, each_payment_amt, total_payment_amt, before_delivery_amt, exp_delivery_date, exp_delivery_time, bond_amt, is_active, created_by) VALUES ?',[flexOrderValues],function (error, rows, fields) {
                    if (!error) {
                      const lastInsertId = rows.insertId;
                      // console.log('fixed ..id', rows.insertId);
                      let orderValues = [
                        [that.order_id, that.customer_id, that.customer_type, that.products_id, that.related_to, that.order_type, lastInsertId, budget_id, that.payment_mode, that.assigned_to, that.order_date,  flexValues.exp_delivery_date, flexValues.exp_delivery_time, 1, that.is_active, that.created_by]
                      ];
                      connection.query('INSERT INTO orders(order_id, customer_id, customer_type, product_id, product_related_to, order_type, order_type_id, budget_id, payment_mode, assigned_to, order_date, delivery_date, delivery_time, order_status, is_active, created_by) VALUES ?',[orderValues],function (error, rows, fields) {
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.editOrder = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });

          const budget_list = that.budget_list;
          // let budgetValues = [
          //   [budget_list.work, budget_list.benefits, budget_list.accomodation, budget_list.childcare, budget_list.rent, budget_list.power, budget_list.telephone, budget_list.mobile, budget_list.vehicle, budget_list.transport, budget_list.food, budget_list.credit_card, budget_list.loan, budget_list.other_expenditure, budget_list.income, budget_list.expenditure, budget_list.surplus, budget_list.afford_amt, that.is_active, that.updated_by]
          // ];
          connection.query('UPDATE budget set work= "'+budget_list.work+'", benefits= "'+budget_list.benefits+'", accomodation= "'+budget_list.accomodation+'", childcare= "'+budget_list.childcare+'", rent= "'+budget_list.rent+'", power= "'+budget_list.power+'", landline_phone= "'+budget_list.telephone+'", mobile_phone= "'+budget_list.mobile+'", vehicle_finance= "'+budget_list.vehicle+'", public_transport= "'+budget_list.transport+'", food= "'+budget_list.food+'", credit_store_cards= "'+budget_list.credit_card+'", loans_hire_purchase= "'+budget_list.loan+'", other_expenditure= "'+budget_list.other_expenditure+'", pre_order_exp= "'+budget_list.pre_order_exp+'", total_income= "'+budget_list.income+'", total_expenditure= "'+budget_list.expenditure+'", total_surplus= "'+budget_list.surplus+'", afford_amt= "'+budget_list.afford_amt+'", is_active ='+that.is_active+',  updated_by ="'+that.updated_by+'" WHERE id = '+that.budget_id+'',function (error, rows, fields) {
            if (!error) {
                if(that.fixedOrderType!=null){
                  const fixedValues = that.fixedOrderType;
                  // let fixedOrderValues =[
                  //   [that.customer_id, fixedValues.int_unpaid_bal, fixedValues.cash_price, fixedValues.delivery_fee, fixedValues.ppsr_fee, fixedValues.frequency, fixedValues.first_payment, fixedValues.last_payment, fixedValues.no_of_payment, fixedValues.each_payment_amt, fixedValues.total_payment_amt, fixedValues.before_delivery_amt, fixedValues.exp_delivery_at, fixedValues.minimum_payment_amt, fixedValues.intrest_rate, fixedValues.intrest_rate_per, fixedValues.total_intrest, that.is_active, that.created_by]
                  // ];
                  connection.query('UPDATE fixed_order set int_unpaid_bal = "'+fixedValues.int_unpaid_bal+'", cash_price = "'+fixedValues.cash_price+'", delivery_fee = "'+fixedValues.delivery_fee+'", ppsr_fee = "'+fixedValues.ppsr_fee+'", frequency = "'+fixedValues.frequency+'", first_payment = "'+fixedValues.first_payment+'", last_payment = "'+fixedValues.last_payment+'", duration = "'+fixedValues.duration+'", no_of_payment = "'+fixedValues.no_of_payment+'", each_payment_amt = "'+fixedValues.each_payment_amt+'", total_payment_amt = "'+fixedValues.total_payment_amt+'", before_delivery_amt = "'+fixedValues.before_delivery_amt+'", exp_delivery_date = "'+fixedValues.exp_delivery_date+'", exp_delivery_time = "'+fixedValues.exp_delivery_time+'", minimum_payment_amt = "'+fixedValues.minimum_payment_amt+'", interest_rate = "'+fixedValues.interest_rate+'", interest_rate_per = "'+fixedValues.interest_rate_per+'", total_interest = "'+fixedValues.total_interest+'", is_active = "'+that.is_active+'", updated_by ="'+that.updated_by+'" WHERE id = "'+that.order_type_id+'"',function (error, rows, fields) {
                    if (!error) {
                      // const lastInsertId = rows.insertId;
                      // // console.log('fixed ..id', rows.insertId);
                      // let orderValues = [
                      //   [that.order_id, that.customer_id, that.products_id, that.order_type, lastInsertId, budget_id, that.payment_mode, that.assigned_to, that.order_date, that.is_active, that.created_by]
                      // ];
                      connection.query('UPDATE orders set product_id = "'+that.products_id+'", product_related_to = "'+that.related_to+'", payment_mode = "'+that.payment_mode+'", assigned_to = "'+that.assigned_to+'", delivery_date = "'+fixedValues.exp_delivery_date+'", delivery_time = "'+fixedValues.exp_delivery_time+'", is_active = "'+that.is_active+'", updated_by="'+that.updated_by+'" WHERE id = "'+that.id+'"',function (error, rows, fields) {
                        if (!error) {
                          // console.log('order inserted', rows.insertId);
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
                } 
                if(that.flexOrderType!=null){
                  const flexValues = that.flexOrderType;
                  // let flexOrderValues =[
                  //   [that.customer_id, flexValues.goods_rent_price, flexValues.ppsr_fee, flexValues.liability_fee, flexValues.weekly_total, flexValues.frequency, flexValues.first_payment, flexValues.no_of_payment, flexValues.each_payment_amt, flexValues.total_payment_amt, flexValues.before_delivery_amt, flexValues.exp_delivery_at, flexValues.bond_amt, that.is_active, that.created_by]
                  // ];
                  connection.query('UPDATE flex_order set goods_rent_price = "'+flexValues.goods_rent_price+'", ppsr_fee = "'+flexValues.ppsr_fee+'", liability_fee = "'+flexValues.liability_fee+'", weekly_total = "'+flexValues.weekly_total+'", frequency = "'+flexValues.frequency+'", first_payment = "'+flexValues.first_payment+'", duration = "'+flexValues.duration+'",  no_of_payment = "'+flexValues.no_of_payment+'", each_payment_amt = "'+flexValues.each_payment_amt+'", total_payment_amt = "'+flexValues.total_payment_amt+'", before_delivery_amt = "'+flexValues.before_delivery_amt+'", exp_delivery_date = "'+flexValues.exp_delivery_date+'", exp_delivery_time = "'+flexValues.exp_delivery_time+'", bond_amt = "'+flexValues.bond_amt+'", is_active = "'+that.is_active+'", updated_by = "'+that.updated_by+'" WHERE id = "'+that.order_type_id+'"',function (error, rows, fields) {
                    if (!error) {
                      // const lastInsertId = rows.insertId;
                      // console.log('fixed ..id', rows.insertId);
                      // let orderValues = [
                      //   [that.order_id, that.customer_id, that.products_id, that.order_type, lastInsertId, budget_id, that.payment_mode, that.assigned_to, that.order_date, that.is_active, that.created_by]
                      // ];

                      connection.query('UPDATE orders set product_id = "'+that.products_id+'", product_related_to = "'+that.related_to+'", payment_mode = "'+that.payment_mode+'", assigned_to = "'+that.assigned_to+'", delivery_date = "'+flexValues.exp_delivery_date+'", delivery_time = "'+flexValues.exp_delivery_time+'",  is_active = "'+that.is_active+'", updated_by="'+that.updated_by+'" WHERE id = "'+that.id+'"',function (error, rows, fields) {
                        if (!error) {
                          // console.log('order inserted', rows.insertId);
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
  throw error;
});
};



// Order.prototype.getBudget = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('SELECT customer_id, work, benefits, accomodation, childcare, rent, power, landline_phone as telephone, mobile_phone as mobile, vehicle_finance as vehicle, public_transport as transport, food, credit_store_cards as credit_card, loans_hire_purchase as loan, other_expenditure, total_income as income, total_expenditure as expenditure, total_surplus as surplus, afford_amt, is_active, created_by from budget where id = "'+that.budget_id+'"',function (error, rows, fields) {
//             if (!error) {
//               console.log('rows...',rows);
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
//       console.log('Order Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };


Order.prototype.getBudget = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT customer_id, work, benefits, accomodation, childcare, rent, power, landline_phone as telephone, mobile_phone as mobile, vehicle_finance as vehicle, public_transport as transport, food, credit_store_cards as credit_card, loans_hire_purchase as loan, other_expenditure, total_income as income, total_expenditure as expenditure, total_surplus as surplus, afford_amt, is_active, created_by from budget where id = "'+that.budget_id+'"',function (error, rows, fields) {
            if (!error) {
              // console.log('rows order---',rows)
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

// Order.prototype.getOldBudget = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('SELECT b.customer_id, b.work, b.benefits, b.accomodation, b.childcare, b.rent, b.power, b.landline_phone as telephone, b.mobile_phone as mobile, b.vehicle_finance as vehicle, b.public_transport as transport, b.food, b.credit_store_cards as credit_card, b.loans_hire_purchase as loan, b.other_expenditure, b.total_income as income, b.total_expenditure as expenditure, b.total_surplus as surplus, b.afford_amt, b.is_active, o.created_by, o.assigned_to from budget as b INNER JOIN orders as o on b.id = o.budget_id  where b.id != "'+that.budget_id+'" && b.customer_id= "'+that.customer_id+'" && o.assigned_to= 4 && b.is_active = 1 order by b.id desc',function (error, rows, fields) {
//           // connection.query('SELECT b.customer_id, b.work, b.benefits, b.accomodation, b.childcare, b.rent, b.power, b.landline_phone as telephone, b.mobile_phone as mobile, b.vehicle_finance as vehicle, b.public_transport as transport, b.food, b.credit_store_cards as credit_card, b.loans_hire_purchase as loan, b.other_expenditure, b.total_income as income, b.total_expenditure as expenditure, b.total_surplus as surplus, b.afford_amt, b.is_active, o.created_by, o.assigned_to from budget as b INNER JOIN orders as o on b.id = o.budget_id  where b.customer_id= "'+that.customer_id+'" && o.assigned_to= 4 && b.is_active = 1 order by b.id desc',function (error, rows, fields) {
//             console.log('rows old---',rows)
//             if (!error) {
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
//       console.log('Order Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };



Order.prototype.getExistingBudget = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
           connection.query('SELECT b.customer_id, b.work, b.benefits, b.accomodation, b.childcare, b.rent, b.power, b.landline_phone as telephone, b.mobile_phone as mobile, b.vehicle_finance as vehicle, b.public_transport as transport, b.food, b.credit_store_cards as credit_card, b.loans_hire_purchase as loan, b.other_expenditure, b.total_income as income, b.total_expenditure as expenditure, b.total_surplus as surplus, b.afford_amt, b.is_active, o.created_by, o.assigned_to from budget as b INNER JOIN orders as o on b.id = o.budget_id  where b.customer_id= "'+that.customer_id+'" && b.is_active = 1 order by b.id desc',function (error, rows, fields) {
        // connection.query('SELECT b.customer_id, b.work, b.benefits, b.accomodation, b.childcare, b.rent, b.power, b.landline_phone as telephone, b.mobile_phone as mobile, b.vehicle_finance as vehicle, b.public_transport as transport, b.food, b.credit_store_cards as credit_card, b.loans_hire_purchase as loan, b.other_expenditure, b.total_income as income, b.total_expenditure as expenditure, b.total_surplus as surplus, b.afford_amt, b.is_active, o.created_by, o.assigned_to from budget as b INNER JOIN orders as o on b.id = o.budget_id  where b.customer_id= "'+that.customer_id+'" && o.assigned_to= 4',function (error, rows, fields) {
            if (!error) {
              console.log('rows exist---',rows)
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Order.prototype.getFixedOrder = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT * from fixed_order where id = "'+that.fixedOrderId+'"',function (error, rows, fields) {
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.getFlexOrder = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT * from flex_order where id = "'+that.flexOrderId+'"',function (error, rows, fields) {
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.getPaymentHistory = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT * from payment_status where order_id = "'+that.id+'" ORDER BY installment_no DESC',function (error, rows, fields) {
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Order.prototype.paymentSubmit = function () {
  const that = this;
  // console.log('that', that);
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });

        // let Values = [
        //   [that.order_id, that.customer_id, that.installment_no, that.payment_date, that.payment_amt, that.total_paid, that.created_by]
        // ];
        connection.query('INSERT INTO payment_status(order_id, customer_id, installment_no, payment_date, payment_rec_date, payment_amt, total_paid, created_by) VALUES ("'+that.order_id+'", "'+that.customer_id+'", "'+that.installment_no+'", "'+that.payment_date+'", "'+that.payment_rec_date+'", "'+that.payment_amt+'", "'+ that.total_paid+'", "'+ that.created_by+'")', function (error, rows, fields) {
            if (!error) {
                  if(that.installment_before_delivery === that.installment_no){
                    connection.query('UPDATE orders SET order_status = 4 where id = "'+that.order_id+'"', function (error, rows, fields) {
                      if(!error){
                        resolve(rows);
                      }else{
                        console.log("Error...", error);
                        reject(error);
                      }
                    });
                  }
                  if(that.installment_no === that.last_installment_no){
                      // connection.query('UPDATE orders SET order_status = 8 where id = "'+that.order_id+'"', function (error, rows, fields) {
                      connection.query('UPDATE orders as o INNER JOIN budget as b ON (o.budget_id = b.id) SET o.order_status = 8, b.is_active = 0 where o.id = "'+that.order_id+'"', function (error, rows, fields) {
                    if(!error){
                            resolve(rows);
                      }else{
                        console.log("Error...", error);
                        reject(error);
                      }
                    });
                  }else{
                    resolve(rows);                    
                  }
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
      console.log('payment Added for Franchise Staff %d', connection.threadId);
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
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
        connection.query('SELECT c.*,  i.name as id_type_name from customer as c inner join id_type as i on c.id_type = i.id where c.id = "'+that.lastInsertId+'"',function (error, rows, fields) {
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
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
        // connection.query('SELECT o.id, o.order_id, c.id as customer_id, c.customer_name, c.address, c.mobile, c.telephone, o.customer_type, o.order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.budget_id from orders as o inner join customer as c on o.customer_id = c.id WHERE o.is_active = 1 ORDER BY o.id DESC',function (error, rows, fields) {
          connection.query('SELECT o.id, o.order_id, c.id as customer_id, c.customer_name, c.address, c.mobile, c.telephone, o.customer_type, o.order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.delivery_doc_uploaded, o.delivered_date, o.delivered_time, o.delivery_date, o.delivery_time, o.budget_id, os.order_status as order_status_name, d.document as uploaded_doc from orders as o inner join customer as c on o.customer_id = c.id INNER JOIN order_status as os on o.order_status = os.id LEFT JOIN order_document as d on o.id = d.order_id WHERE o.is_active = 1 ORDER BY o.id DESC',function (error, rows, fields) {
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};




Order.prototype.assignToFinance = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('UPDATE orders SET assigned_to = 4, order_status = 3 WHERE id = "'+that.id+'"',function (error, rows, fields) {
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Order.prototype.assignToDelivery = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('UPDATE orders SET assigned_to= 5, order_status = 5 where id = "'+that.id+'"', function (error, rows, fields) {
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.Delivered = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('UPDATE orders SET assigned_to= 5, order_status = 6, delivered_date= "'+that.delivered_date+'", delivered_time= "'+that.delivered_time+'" where id = "'+that.id+'"', function (error, rows, fields) {
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


// Order.prototype.convertedList = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
    
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('select id, Order_id, customer_name, contact, interested_product_id, is_active, created_by from Order WHERE converted_to = 1 order by id desc',function (error, rows, fields) {
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
//       console.log('Order Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };


// Order.prototype.convert = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
    
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('update Order set converted_to = 1 WHERE id = "'+that.Order_id+'"',function (error, rows, fields) {
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
//       console.log('Order Added for Franchise Staff %d', connection.threadId);
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Order.prototype.getCompanyDetail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select franchise_id from user where id = 1',function (error, rows, fields) {
            if (!error) {
              connection.changeUser({ database: dbName["prod"]});
              connection.query('select company_id from franchise where id = "'+rows[0].franchise_id+'"',function (error, rows, fields) {                
                connection.query('select name as franchise_name, nbzn, location, director as director_name, email, contact, alt_contact, website from company where company_id = "'+rows[0].company_id+'" limit 1',function (error, rows, fields) {
                  resolve(rows);
                });
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
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};





Order.prototype.getProductDetail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName["prod"]});
        connection.query('select * from product where id IN('+that.products_id+')',function (error, rows, fields) {                
            resolve(rows);
        });
        } else {
          console.log("Error...", error);
          reject(error);
        }
      connection.release();
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Order.prototype.getCSRDetail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
console.log(that.id);
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select name from user where id = "'+that.id+'"',function (error, rows, fields) {   
          resolve(rows);
        });
        } else {
          console.log("Error...", error);
          reject(error);
        }
      connection.release();
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.convertedLead = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {       
        if(that.converted_to!==0){
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
            if (!error) {
              const franchise_id=rows[0].franchise_id;
              connection.changeUser({ database: dbName["prod"] });
              connection.query('update leads set converted_to="2",converted_by="'+that.userid+'", converted_by_f_id="'+franchise_id+'" where id="'+that.converted_to+'"',function (error, rows, fields) {
                if (!error) {
                  // console.log("rows...",rows);
                resolve(rows);
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            }else {
              console.log("Error...", error);
              reject(error);
            }
        })
      }else { 
        resolve(rows);
      }
    } else {
      console.log("Error...", error);
      reject(error);
    }
        
      connection.release();
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.convertedEnquiry = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {       
        if(that.converted_to!==0){
            if (!error) {
              connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
              connection.query('update enquiry set converted_to = 1 WHERE id = "'+that.converted_to+'"',function (error, rows, fields) {
                if (!error) {
                  // console.log("rows...",rows);
                resolve(rows);
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            }else {
              console.log("Error...", error);
              reject(error);
            }        
      }else { 
        resolve(rows);
      }
    } else {
      console.log("Error...", error);
      reject(error);
    }
        
      connection.release();
      console.log('Order Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.postComment = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          let queryData = [
            [that.order_id, that.userid, that.user_role, that.comment, 1]
          ];
            connection.query('INSERT INTO order_comment(order_id, created_by, user_role, comment, is_active) VALUES ?',[queryData],function (error, rows, fields) {
              if (!error) {              
                          resolve({isSucceeded: 1});
                    } else {
                      console.log("Error...", error);
                      // reject(error);
                      resolve();
                    }
                  });
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
          connection.release();
          console.log('Order Added for Franchise Staff %d', connection.threadId);
        });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.getComment = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
           connection.query('select o.id, o.order_id, o.created_by, u.name as created_by_name, o.user_role, o.comment, o.is_active, o.created_at from order_comment as o INNER JOIN user as u on o.created_by = u.id where o.order_id = "'+that.order_id+'" order by o.id DESC',function (error, rows, fields) {
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
          console.log('Order Added for Franchise Staff %d', connection.threadId);
        });
  }).catch((error) => {
    throw error;
  });
};

module.exports = Order;