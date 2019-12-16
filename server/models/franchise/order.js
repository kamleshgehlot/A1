const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');
const utils = require("../../utils");
const {setDBDateFormat} = require('../../utils/datetime.js')


var Order = function (params) {
  // console.log("params", params);
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
  this.renting_for_id = params.renting_for_id,
  this.sales_type_id = params.sales_type_id,
  this.sales_person_id = params.sales_person_id,

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
  this.due_installment_amt = params.due_installment_amt;
  this.sub_installment_no = params.sub_installment_no;
  // this.status = params.status;
  this.user_role = params.user_role;
  this.comment = params.comment;

  this.refund = params.refund;
  this.cancel_by = params.cancel_by;
  this.cancel_reason = params.cancel_reason;
  this.cancellation_charge = params.cancellation_charge;


  this.product_brand = params.product_brand;
  this.product_color = params.product_color;
  this.product_cost = params.product_cost;
  this.specification = params.specification;
  this.invoice_number = params.invoice_number;
  this.delivery_date = params.delivery_date;
  this.purchase_from = params.purchase_from;

  this.paymentScheduleArray = params.paymentScheduleArray;
  this.schedule_status = params.schedule_status;
  
  this.ezidebit_uid = params.ezidebit_uid;
  this.order_status = params.order_status;
  this.payment_schedule_date = params.payment_schedule_date;

  this.payment_status = params.payment_status;

  this.searchText = params.searchText; 
  // this.interest_amt = params.interest_amt;
  // this.late_fee = params.late_fee;
  // this.payment_table_id = params.payment_table_id;
  // this.transaction_date = params.transaction_date;
  // this.transaction_amt = params.transaction_amt;
  // this.transaction_id = params.transaction_id;
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
            [that.customer_id, budget_list.work, budget_list.benefits, budget_list.accomodation, budget_list.childcare, budget_list.rent, budget_list.power, budget_list.telephone, budget_list.mobile, budget_list.vehicle, budget_list.vehicle_fuel, budget_list.transport, budget_list.food, budget_list.credit_card, budget_list.loan, budget_list.other_income, budget_list.other_expenditure, budget_list.pre_order_exp, budget_list.income, budget_list.expenditure, budget_list.surplus, budget_list.afford_amt,  budget_list.paid_day, budget_list.debited_day,  1, that.created_by]
          ];
          connection.query('INSERT INTO budget(customer_id, work, benefits, accomodation, childcare, rent, power, landline_phone, mobile_phone, vehicle_finance, vehicle_fuel, public_transport, food, credit_store_cards, loans_hire_purchase, other_income, other_expenditure, pre_order_exp, total_income, total_expenditure, total_surplus, afford_amt, paid_day, debited_day,  is_active, created_by) VALUES ?',[budgetValues],function (error, rows, fields) {
            if (!error) {
                const budget_id = rows.insertId;                
                if(that.fixedOrderType!=null){
                  const fixedValues = that.fixedOrderType;
                  let fixedOrderValues =[
                    [that.customer_id, fixedValues.int_unpaid_bal, fixedValues.cash_price, fixedValues.delivery_fee, fixedValues.ppsr_fee, fixedValues.liability_wavier_fee, fixedValues.frequency, fixedValues.first_payment, fixedValues.last_payment, fixedValues.duration, fixedValues.no_of_payment, fixedValues.each_payment_amt, fixedValues.total_payment_amt, fixedValues.before_delivery_amt, fixedValues.exp_delivery_date, fixedValues.exp_delivery_time, fixedValues.minimum_payment_amt, fixedValues.intrest_rate, fixedValues.intrest_rate_per, fixedValues.total_intrest, that.is_active, that.created_by]
                  ];                  
                  connection.query('INSERT INTO fixed_order(customer_id, int_unpaid_bal, cash_price, delivery_fee, ppsr_fee, liability_wavier_fee, frequency, first_payment, last_payment, duration, no_of_payment, each_payment_amt, total_payment_amt, before_delivery_amt, exp_delivery_date, exp_delivery_time, minimum_payment_amt, interest_rate, interest_rate_per, total_interest, is_active, created_by) VALUES ?',[fixedOrderValues],function (error, rows, fields) {
                    if (!error) {
                      const lastInsertId = rows.insertId;
                      let orderValues = [
                        [that.order_id, that.ezidebit_uid, that.customer_id, that.customer_type, that.products_id, that.related_to, that.sales_person_id, that.sales_type_id, that.renting_for_id, that.order_type, lastInsertId, budget_id, that.payment_mode, that.assigned_to, that.order_date, fixedValues.exp_delivery_date, fixedValues.exp_delivery_time, 1, that.is_active, that.created_by]
                      ];
                      connection.query('INSERT INTO orders(order_id, ezidebit_uid, customer_id, customer_type, product_id, product_related_to, sales_person_id, sales_type_id, renting_for_id, order_type, order_type_id, budget_id, payment_mode, assigned_to, order_date, delivery_date, delivery_time, order_status, is_active, created_by) VALUES ?',[orderValues],function (error, rows, fields) {
                        if (!error) {
                          resolve({order_id: rows.insertId, budget_id : budget_id});
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
                    [that.customer_id, flexValues.goods_rent_price, flexValues.ppsr_fee, flexValues.liability_fee, flexValues.weekly_total, flexValues.frequency, flexValues.first_payment,  flexValues.each_payment_amt, flexValues.before_delivery_amt, flexValues.exp_delivery_date, flexValues.exp_delivery_time, flexValues.bond_amt, that.is_active, that.created_by]
                  ];
                  connection.query('INSERT INTO flex_order(customer_id, goods_rent_price, ppsr_fee, liability_fee, weekly_total, frequency, first_payment, each_payment_amt, before_delivery_amt, exp_delivery_date, exp_delivery_time, bond_amt, is_active, created_by) VALUES ?',[flexOrderValues],function (error, rows, fields) {
                    if (!error) {
                      const lastInsertId = rows.insertId;
                      let orderValues = [
                        [that.order_id, that.ezidebit_uid, that.customer_id, that.customer_type, that.products_id, that.related_to, that.sales_person_id, that.sales_type_id, that.renting_for_id, that.order_type, lastInsertId, budget_id, that.payment_mode, that.assigned_to, that.order_date,  flexValues.exp_delivery_date, flexValues.exp_delivery_time, 1, that.is_active, that.created_by]
                      ];
                      connection.query('INSERT INTO orders(order_id, ezidebit_uid, customer_id, customer_type, product_id, product_related_to, sales_person_id, sales_type_id, renting_for_id, order_type, order_type_id, budget_id, payment_mode, assigned_to, order_date, delivery_date, delivery_time, order_status, is_active, created_by) VALUES ?',[orderValues],function (error, rows, fields) {
                        if (!error) {
                          resolve({order_id: rows.insertId, budget_id : budget_id});
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
          let budgetValues =  [budget_list.work, budget_list.benefits, budget_list.accomodation, budget_list.childcare, budget_list.rent, budget_list.power, budget_list.telephone, budget_list.mobile, budget_list.vehicle, budget_list.vehicle_fuel, budget_list.transport, budget_list.food, budget_list.credit_card, budget_list.loan, budget_list.other_income, budget_list.other_expenditure, budget_list.pre_order_exp, budget_list.income, budget_list.expenditure, budget_list.surplus, budget_list.afford_amt,  budget_list.paid_day, budget_list.debited_day,  that.is_active, that.updated_by, that.budget_id];

          // connection.query('UPDATE budget set work= "'+budget_list.work+'", benefits= "'+budget_list.benefits+'", accomodation= "'+budget_list.accomodation+'", childcare= "'+budget_list.childcare+'", rent= "'+budget_list.rent+'", power= "'+budget_list.power+'", landline_phone= "'+budget_list.telephone+'", mobile_phone= "'+budget_list.mobile+'", vehicle_finance= "'+budget_list.vehicle+'", vehicle_fuel = "'+budget_list.vehicle_fuel+'", public_transport= "'+budget_list.transport+'", food= "'+budget_list.food+'", credit_store_cards= "'+budget_list.credit_card+'", loans_hire_purchase= "'+budget_list.loan+'", other_income = "'+budget_list.other_income+'", other_expenditure= "'+budget_list.other_expenditure+'", pre_order_exp= "'+budget_list.pre_order_exp+'", total_income= '+budget_list.income+', total_expenditure= '+budget_list.expenditure+', total_surplus= "'+budget_list.surplus+'", afford_amt= "'+budget_list.afford_amt+'", paid_day = "'+budget_list.paid_day+'", debited_day = "'+budget_list.debited_day+'",  is_active ='+that.is_active+',  updated_by ="'+that.updated_by+'" WHERE id = '+that.budget_id+'',function (error, rows, fields) {
            connection.query('UPDATE budget set work= ?, benefits= ?, accomodation= ?, childcare= ?, rent= ?, power= ?, landline_phone= ?, mobile_phone= ?, vehicle_finance= ?, vehicle_fuel = ?, public_transport= ?, food= ?, credit_store_cards= ?, loans_hire_purchase= ?, other_income = ?, other_expenditure= ?, pre_order_exp= ?, total_income= ?, total_expenditure= ?, total_surplus= ?, afford_amt= ?, paid_day = ?, debited_day = ?,  is_active = ?,  updated_by = ? WHERE id =  ?', budgetValues, function (error, rows, fields) {
            if (!error) {
                if(that.fixedOrderType!=null){
                  const fixedValues = that.fixedOrderType;
                 
                  connection.query('UPDATE fixed_order set int_unpaid_bal = "'+fixedValues.int_unpaid_bal+'", cash_price = "'+fixedValues.cash_price+'", delivery_fee = "'+fixedValues.delivery_fee+'", ppsr_fee = "'+fixedValues.ppsr_fee+'", liability_wavier_fee = "'+fixedValues.liability_wavier_fee+'", frequency = "'+fixedValues.frequency+'", first_payment = "'+fixedValues.first_payment+'", last_payment = "'+fixedValues.last_payment+'", duration = "'+fixedValues.duration+'", no_of_payment = "'+fixedValues.no_of_payment+'", each_payment_amt = "'+fixedValues.each_payment_amt+'", total_payment_amt = "'+fixedValues.total_payment_amt+'", before_delivery_amt = "'+fixedValues.before_delivery_amt+'", exp_delivery_date = "'+fixedValues.exp_delivery_date+'", exp_delivery_time = "'+fixedValues.exp_delivery_time+'", minimum_payment_amt = "'+fixedValues.minimum_payment_amt+'", interest_rate = "'+fixedValues.interest_rate+'", interest_rate_per = "'+fixedValues.interest_rate_per+'", total_interest = "'+fixedValues.total_interest+'", is_active = "'+that.is_active+'", updated_by ="'+that.updated_by+'" WHERE id = "'+that.order_type_id+'"',function (error, rows, fields) {
                    if (!error) {
                      
                      connection.query('UPDATE orders set ezidebit_uid = "'+ that.ezidebit_uid +'", product_id = "'+that.products_id+'", product_related_to = "'+that.related_to+'", sales_person_id = "'+ that.sales_person_id +'", sales_type_id = "'+that.sales_type_id+'", renting_for_id = "'+that.renting_for_id+'", payment_mode = "'+that.payment_mode+'", assigned_to = "'+that.assigned_to+'", delivery_date = "'+fixedValues.exp_delivery_date+'", delivery_time = "'+fixedValues.exp_delivery_time+'", is_active = "'+that.is_active+'", updated_by="'+that.updated_by+'" WHERE id = "'+that.id+'"',function (error, rows, fields) {
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
                } 
                if(that.flexOrderType!=null){
                  const flexValues = that.flexOrderType;
                                    
                  connection.query('UPDATE flex_order set goods_rent_price = "'+flexValues.goods_rent_price+'", ppsr_fee = "'+flexValues.ppsr_fee+'", liability_fee = "'+flexValues.liability_fee+'", weekly_total = "'+flexValues.weekly_total+'", frequency = "'+flexValues.frequency+'", first_payment = "'+flexValues.first_payment+'", each_payment_amt = "'+flexValues.each_payment_amt+'", before_delivery_amt = "'+flexValues.before_delivery_amt+'", exp_delivery_date = "'+flexValues.exp_delivery_date+'", exp_delivery_time = "'+flexValues.exp_delivery_time+'", bond_amt = "'+flexValues.bond_amt+'", is_active = "'+that.is_active+'", updated_by = "'+that.updated_by+'" WHERE id = "'+that.order_type_id+'"',function (error, rows, fields) {
                    if (!error) {
                      connection.query('UPDATE orders set ezidebit_uid = "'+ that.ezidebit_uid +'", product_id = "'+that.products_id+'", product_related_to = "'+that.related_to+'", sales_person_id = "'+ that.sales_person_id +'", sales_type_id = "'+that.sales_type_id+'", renting_for_id = "'+that.renting_for_id+'", payment_mode = "'+that.payment_mode+'", assigned_to = "'+that.assigned_to+'", delivery_date = "'+flexValues.exp_delivery_date+'", delivery_time = "'+flexValues.exp_delivery_time+'",  is_active = "'+that.is_active+'", updated_by="'+that.updated_by+'" WHERE id = "'+that.id+'"',function (error, rows, fields) {
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
                }
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

Order.prototype.getBudget = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) }); 
          connection.query('SELECT o.order_id, o.id as o_id, b.id, b.customer_id, b.work, b.benefits, b.accomodation, b.childcare, b.rent, b.power, b.landline_phone as telephone, b.mobile_phone as mobile, b.vehicle_finance as vehicle, b.vehicle_fuel, b.public_transport as transport, b.food, b.credit_store_cards as credit_card, b.loans_hire_purchase as loan, b.other_income, b.other_expenditure,  b.paid_day, b.debited_day,  pd.week_day as paid_day_name, dd.week_day as debited_day_name, b.total_income as income, b.total_expenditure as expenditure, b.total_surplus as surplus, b.afford_amt, b.pre_order_exp, b.is_active, o.order_type, (CASE o.order_type WHEN 1 THEN fix.each_payment_amt WHEN 2 THEN flex.each_payment_amt END) as each_payment_amt from budget as b LEFT JOIN orders as o ON b.id = o.budget_id LEFT JOIN fixed_order as fix ON o.order_type_id = fix.id LEFT JOIN flex_order as flex ON o.order_type_id = flex.id LEFT JOIN week_day_list as pd ON b.paid_day = pd.id LEFT JOIN week_day_list as dd ON dd.id = b.debited_day where b.customer_id= "'+that.customer_id+'" AND b.id = "'+that.budget_id+'" order by b.id desc',function (error, rows, fields) {          
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

Order.prototype.getExistingBudget = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });                            
        connection.query('SELECT o.order_id, o.id as o_id, b.id, b.customer_id, b.work, b.benefits, b.accomodation, b.childcare, b.rent, b.power, b.landline_phone as telephone, b.mobile_phone as mobile, b.vehicle_finance as vehicle, b.vehicle_fuel, b.public_transport as transport, b.food, b.credit_store_cards as credit_card, b.loans_hire_purchase as loan, b.other_income, b.other_expenditure,  b.paid_day, b.debited_day,  pd.week_day as paid_day_name, dd.week_day as debited_day_name, b.total_income as income, b.total_expenditure as expenditure, b.total_surplus as surplus, b.afford_amt, b.pre_order_exp, b.is_active, o.order_type, (CASE o.order_type WHEN 1 THEN fix.each_payment_amt WHEN 2 THEN flex.each_payment_amt END) as each_payment_amt from budget as b LEFT JOIN orders as o ON b.id = o.budget_id LEFT JOIN fixed_order as fix ON o.order_type_id = fix.id LEFT JOIN flex_order as flex ON o.order_type_id = flex.id LEFT JOIN week_day_list as pd ON b.paid_day = pd.id LEFT JOIN week_day_list as dd ON dd.id = b.debited_day where b.customer_id= "'+that.customer_id+'" order by b.id desc',function (error, rows, fields) {
            if (!error) {
              // console.log('rows exist---',rows)
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




Order.prototype.submitCancel = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('UPDATE orders SET order_status = "'+that.cancel_by+'", is_active = 0, refund_amt = "'+that.refund+'", cancel_reason = "'+that.cancel_reason+'", cancellation_charge = "'+that.cancellation_charge+'" where id = "'+that.id+'"',function (error, rows, fields) {
            if (!error) {
              connection.query('UPDATE budget SET is_active = 0 where id = "'+that.budget_id+'"',function (error, rows, fields) {
                if (!error) {
                  if(that.order_type == 1){
                  connection.query('UPDATE fixed_order SET is_active = 0 where id = "'+that.order_type_id+'"',function (error, rows, fields) {
                    if (!error) {
                        resolve(rows);
                        } else {
                          console.log("Error...", error);
                          reject(error);
                        }
                    })
                  }else if (that.order_type == 2){
                    connection.query('UPDATE flex_order SET is_active = 0 where id = "'+that.order_type_id+'"',function (error, rows, fields) {
                      if (!error) {
                        resolve(rows);
                          } else {
                            console.log("Error...", error);
                            reject(error);
                          }
                      })
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

Order.prototype.getBudgetHistory = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        // connection.query('SELECT b.id, b.customer_id, b.work, b.benefits, b.accomodation, b.childcare, b.rent, b.power, b.landline_phone as telephone, b.mobile_phone as mobile, b.vehicle_finance as vehicle, b.public_transport as transport, b.food, b.credit_store_cards as credit_card, b.loans_hire_purchase as loan, b.other_expenditure, b.total_income as income, b.total_expenditure as expenditure, b.total_surplus as surplus, b.afford_amt,  b.pre_order_exp, b.is_active, b.created_by, u.name as created_by_name from budget as b INNER JOIN user as u on b.created_by = u.id where b.customer_id= "'+that.customer_id+'" order by b.id desc',function (error, rows, fields) {          
          connection.query('SELECT b.id, b.customer_id, b.work, b.benefits, b.accomodation, b.childcare, b.rent, b.power, b.landline_phone as telephone, b.mobile_phone as mobile, b.vehicle_finance as vehicle, b.vehicle_fuel, b.public_transport as transport, b.food, b.credit_store_cards as credit_card, b.loans_hire_purchase as loan, b.other_income, b.other_expenditure,  b.paid_day, b.debited_day, pd.week_day as paid_day_name, dd.week_day as debited_day_name, b.total_income as income, b.total_expenditure as expenditure, b.total_surplus as surplus, b.afford_amt,  b.pre_order_exp, b.is_active,  DATE_FORMAT(b.created_at, \'%W %d %M %Y %H:%i:%s\') created_at, b.created_by, u.name as created_by_name, o.order_id from budget as b INNER JOIN user as u on b.created_by = u.id LEFT JOIN orders as o on b.id = o.budget_id LEFT JOIN week_day_list as pd ON b.paid_day = pd.id LEFT JOIN week_day_list as dd ON dd.id = b.debited_day where b.customer_id= "'+that.customer_id+'" order by b.id desc',function (error, rows, fields) {
            if (!error) {
              // console.log('rows exist---',rows)
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




Order.prototype.updateBudget = function () {
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
            [that.customer_id, budget_list.work, budget_list.benefits, budget_list.accomodation, budget_list.childcare, budget_list.rent, budget_list.power, budget_list.telephone, budget_list.mobile, budget_list.vehicle, budget_list.vehicle_fuel, budget_list.transport, budget_list.food, budget_list.credit_card, budget_list.loan, budget_list.other_income, budget_list.other_expenditure,  budget_list.pre_order_exp, budget_list.income, budget_list.expenditure, budget_list.surplus, budget_list.afford_amt, budget_list.paid_day, budget_list.debited_day, 0, that.created_by]
          ];
          
          connection.query('INSERT INTO budget(customer_id, work, benefits, accomodation, childcare, rent, power, landline_phone, mobile_phone, vehicle_finance, vehicle_fuel, public_transport, food, credit_store_cards, loans_hire_purchase, other_income, other_expenditure, pre_order_exp, total_income, total_expenditure, total_surplus, afford_amt, paid_day, debited_day, is_active, created_by) VALUES ?',[budgetValues],function (error, rows, fields) {
            if (!error) {
              resolve({budget_id : rows.insertId});
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        }
            connection.release();
            console.log('Budget Updated for Franchise Staff %d', connection.threadId);
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
        connection.query('SELECT `id`, `customer_id`, `int_unpaid_bal`, `cash_price`, `delivery_fee`, `ppsr_fee`, `discount`, `liability_wavier_fee`, `frequency`, DATE_FORMAT(`first_payment`,  \'%Y-%m-%d\') as `first_payment`, DATE_FORMAT(`last_payment`,  \'%Y-%m-%d\') as `last_payment`, `duration`, `no_of_payment`, `each_payment_amt`, `total_payment_amt`, `before_delivery_amt`, DATE_FORMAT(`exp_delivery_date`,  \'%Y-%m-%d\') as `exp_delivery_date`,  DATE_FORMAT(`exp_delivery_time`, \'%h:%i:%p\') as exp_delivery_time, `minimum_payment_amt`, `interest_rate`, `interest_rate_per`, `total_interest`, `is_active`, `created_by`, `updated_by`, `created_at`, `updated_at` FROM `fixed_order` where id = "'+that.fixedOrderId+'"',function (error, rows, fields) {
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
        connection.query('SELECT `id`, `customer_id`, `goods_rent_price`, `ppsr_fee`, `liability_fee`, `weekly_total`, `frequency`, DATE_FORMAT(`first_payment`,  \'%Y-%m-%d\') as first_payment, `duration`, `each_payment_amt`, `before_delivery_amt`, DATE_FORMAT(`exp_delivery_date`, \'%Y-%m-%d\') as exp_delivery_date, DATE_FORMAT(`exp_delivery_time`, \'%h:%i:%p\') as exp_delivery_time, `bond_amt`, `is_active`, `created_by`, `updated_by`, `created_at`, `updated_at` FROM `flex_order` where id = "'+that.flexOrderId+'"',function (error, rows, fields) {
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
        connection.query('SELECT * from payment_status where order_id = "'+that.id+'" AND is_active = 1 ORDER BY installment_no, sub_installment_no',function (error, rows, fields) {
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


Order.prototype.getPaymentSchedule = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT * from payment_schedule where order_id = "'+that.order_id+'" AND is_active = 1 ORDER BY installment_no',function (error, rows, fields) {
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
      console.log('Payment Schedule fetched %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



// Order.prototype.getFullPaymentHistory = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('SELECT * from payment_status where order_id = "'+that.id+'" ORDER BY installment_no, sub_installment_no',function (error, rows, fields) {
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


Order.prototype.getRequiredDataToCancel = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('SELECT SUM(p.payment_amt) as total_rec_amt, COUNT(p.installment_no) as total_paid_installment, DATE_FORMAT(MAX(p.payment_rec_date), \'%Y-%m-%d\')  as last_payment_date from payment_status as p WHERE p.order_id = "'+that.id+'"',function (error, rows, fields) {
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



// Order.prototype.transactionEntry = function () {
//   const that = this;
//   // console.log('that', that);
//   return new Promise(function (resolve, reject) {

//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
        
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         let Values = [
//           [that.customer_id, that.order_id, that.transaction_date, that.transaction_amt, that.late_fee, that.interest_amt, that.status, 1,  that.created_by]
//         ];
//         connection.query('INSERT INTO transaction(customer_id, order_id, transaction_date,	transaction_amt,	late_fee,	interest_amt,	status,	is_active,	created_by) VALUES ?',[Values], function (error, rows, fields) {
//             if (!error) {
//                   resolve({transaction_id : rows.insertId});
//             } else {
//               console.log("Error...", error);
//               reject(error);
//             }
//           })
//       } else {
//         console.log("Error...", error);
//         reject(error);
//       }
//       connection.release();
//       console.log('transactionEntry Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };



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
        // connection.query('INSERT INTO payment_status(order_id, customer_id, transaction_id, installment_no, sub_installment_no, payment_date, payment_rec_date, payment_amt, late_fee, interest_amt, total_paid, due_installment_amt, created_by) VALUES ("'+that.order_id+'", "'+that.customer_id+'", "'+ that.transaction_id +'", "'+that.installment_no+'", "'+ that.sub_installment_no +'", "'+that.payment_date+'", "'+that.payment_rec_date+'", "'+that.payment_amt+'", "'+that.late_fee+'", "'+that.interest_amt+'", "'+ that.total_paid+'", "'+that.due_installment_amt+'", "'+ that.created_by+'")', function (error, rows, fields) {
        connection.query('INSERT INTO payment_status(order_id, customer_id, installment_no, sub_installment_no, payment_date, payment_rec_date, payment_amt, total_paid, due_installment_amt, status, created_by) VALUES ("'+that.order_id+'", "'+that.customer_id+'", "'+that.installment_no+'", "'+ that.sub_installment_no +'", "'+that.payment_date+'", "'+that.payment_rec_date+'", "'+that.payment_amt+'", "'+ that.total_paid+'", "'+that.due_installment_amt+'", "' +that.payment_status + '", "'+ that.created_by+'")', function (error, rows, fields) {
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
        // connection.query('SELECT c.id, c.customer_name, c.address, c.city, c.postcode, c.telephone, c.mobile, c.email, c.gender, c.is_working, c.dob, c.id_type, c.other_id_type, c.dl_version_number, c.id_number, c.expiry_date, c.is_adult, c.id_proof, c.other_id_proof, c.alt_c1_name, c.alt_c1_address, c.alt_c1_contact, c.alt_c1_relation, c.alt_c2_name, c.alt_c2_address, c.alt_c2_contact, c.alt_c2_relation, c.state, c.is_verified, c.is_active, c.created_by,c.created_at, c.updated_by, c.updated_at, ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure, i.name as id_type_name from customer as c inner join id_type as i on c.id_type = i.id INNER JOIN customer_income as ci on c.id = ci.cust_id where c.id = "'+that.lastInsertId+'"',function (error, rows, fields) {
          connection.query('SELECT c.*,  ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure, i.name as id_type_name from customer as c inner join id_type as i on c.id_type = i.id INNER JOIN customer_income as ci on c.id = ci.cust_id where c.id = "'+that.lastInsertId+'"',function (error, rows, fields) {
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





Order.prototype.getSingleOrderData = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        // connection.query('SELECT o.id, o.order_id, c.id as customer_id, c.customer_name, c.address, c.mobile, c.telephone, o.customer_type, o.order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.budget_id from orders as o inner join customer as c on o.customer_id = c.id WHERE o.is_active = 1 ORDER BY o.id DESC',function (error, rows, fields) {
          connection.query('SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN \'Fix Order\' ELSE \'Flex Order\' END as \'order_type_name\', o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, DATE_FORMAT(o.delivered_time, \'%h:%i:%p\') as delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, DATE_FORMAT(o.delivery_time, \'%h:%i:%p\') delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as \'payment_mode_name\',  stl.sales_type_name, o.sales_person_id, u.name as sales_person_name from orders as o LEFT join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id where o.id = "'+ that.order_id +'"',function (error, rows, fields) {
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
          connection.query('SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN \'Fix Order\' ELSE \'Flex Order\' END as \'order_type_name\', o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, DATE_FORMAT(o.delivered_time, \'%h:%i:%p\') delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, DATE_FORMAT(o.delivery_time, \'%h:%i:%p\') delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as \'payment_mode_name\',  stl.sales_type_name, o.sales_person_id, u.name as sales_person_name from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id ORDER BY o.id DESC',function (error, rows, fields) {
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



Order.prototype.isScheduleExist = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select * from payment_schedule where order_id = "' +that.order_id+ '"',function (error, rows, fields) {
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
      console.log('Checked Payment Schedule Existance %d', connection.threadId);
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
        connection.query('UPDATE orders SET assigned_to = 4, order_status = 3 WHERE id = "'+that.order_id+'"',function (error, rows, fields) {
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



Order.prototype.getProductAndCategoryName = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName["prod"]});
        connection.query('select p.id as product_id, p.name as product_name, mc.category as main_category, c.category as category, sc.category as sub_category from product as p INNER JOIN category as mc on p.maincat = mc.id INNER JOIN category as c on p.category = c.id INNER JOIN category as sc on p.subcat = sc.id where p.id = "'+that.products_id+'"',function (error, productRows, fields) {
          resolve(productRows);
        });
        } else {
          console.log("Error...", error);
          reject(error);
        }
      connection.release();
      console.log('Data Selected %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Order.prototype.submitDeliveredProduct = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        const Values = [
          [that.id, that.customer_id, that.products_id, that.related_to, that.invoice_number, that.purchase_from, that.product_cost, that.product_color, that.product_brand,  that.delivery_date, that.specification, 1, that.created_by]
        ]

        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('INSERT INTO delivered_product_detail(order_id, customer_id, product_id, related_to, invoice_number, purchase_from, product_cost, product_color, product_brand, delivery_date, specification, is_active, created_by) VALUES ?',[Values],function (error, productRows, fields) {
          resolve(productRows);
        });
        } else {
          console.log("Error...", error);
          reject(error);
        }
      connection.release();
      console.log('Data Selected %d', connection.threadId);
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
// console.log(that.id);
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        // connection.query('select u.name, s.location, s.contact, s.email from user as u INNER JOIN staff as s on u.id = s.franchise_user_id where u.id = "'+that.id+'"',function (error, rows, fields) {   
          connection.query('select (SELECT name from user where id = 1) as director_name, u.name, s.location, s.contact, s.email from user as u INNER JOIN staff as s on u.id = s.franchise_user_id where u.id = "'+that.id+'"',function (error, rows, fields) {   
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



Order.prototype.postBudgetComment = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          let queryData = [
            [that.customer_id, that.order_id, that.budget_id, that.comment, 1, that.created_by]
          ];
            connection.query('INSERT INTO budget_comment(customer_id, order_id, budget_id, comment, is_active, created_by) VALUES ?',[queryData],function (error, rows, fields) {
              if (!error) {              
                    resolve({isSucceeded: 1});
                  } else {
                    console.log("Error...", error);
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
           connection.query('select o.id, o.order_id, o.created_by, u.name as created_by_name, o.user_role, o.comment, o.is_active, DATE_FORMAT(o.created_at, \'%W %d %M %Y %H:%i:%s\') created_at from order_comment as o INNER JOIN user as u on o.created_by = u.id where o.order_id = "'+that.order_id+'" order by o.id DESC',function (error, rows, fields) {
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



Order.prototype.getBudgetComments = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
           connection.query('select b.id, b.customer_id, b.order_id, b.budget_id, b.created_by, u.name as created_by_name, b.comment, b.is_active, b.created_at from budget_comment as b INNER JOIN user as u on b.created_by = u.id where b.customer_id = "'+that.customer_id+'" order by b.id DESC',function (error, rows, fields) {
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



Order.prototype.getDeliveredProductData = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
           connection.query('select dp.id, dp.order_id, dp.customer_id, dp.product_id, dp.related_to, dp.invoice_number, dp.purchase_from, dp.product_cost, dp.product_color, dp.product_brand, dp.delivery_date, dp.specification, dp.is_active, dp.created_by, dp.created_at, dd.document from delivered_product_detail as dp INNER JOIN delivery_document as dd on dp.order_id = dd.order_id where dp.order_id = "'+that.id+'"',function (error, rows, fields) {
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





Order.prototype.getRentingForList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
           connection.query('select * from renting_for_list',function (error, rows, fields) {
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




Order.prototype.getSalesPersonList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
           connection.query('select id, name, user_id from user where status = 1 AND role_id LIKE "%7%"',function (error, rows, fields) {
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




Order.prototype.getSalesTypeList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
           connection.query('select * from sales_type_list',function (error, rows, fields) {
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



// Order.prototype.leaveCommentForPayment = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
//           connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//           let queryData = [
//             [that.customer_id, that.order_id, that.installment_no, that.sub_installment_no, that.comment, 1, that.created_by]
//           ];
//             connection.query('INSERT INTO comment_on_payment(customer_id, order_id, installment_no, sub_installment_no, comment, is_active, created_by) VALUES ?',[queryData],function (error, rows, fields) {
//               if (!error) {              
//                   resolve(rows);                  
//                 } else {
//                   console.log("Error...", error);
//                   reject(error);
//                 }          
//             });       
//       }
//       connection.release();
//       console.log('Comment Added for Payment %d', connection.threadId);
//   }).catch((error) => {
//     throw error;
//   });
// });
// }




// Order.prototype.deadTocurrentInstallment = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
//           connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//           connection.query('UPDATE payment_status SET is_active = 0 WHERE transaction_id = "'+ that.transaction_id +'"',function (error, rows, fields) {
//             if (!error) {
//                 resolve(rows);                  
//               } else {
//                 console.log("Error...", error);
//                 reject(error);
//               }          
//           });       
//       }
//       connection.release();
//       console.log('Dead to old row in Payment %d', connection.threadId);
//   }).catch((error) => {
//     throw error;
//   });
// });
// }



// Order.prototype.updateInstallment = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
        
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('INSERT INTO payment_status(order_id, customer_id, installment_no, sub_installment_no, payment_date, payment_rec_date, payment_amt, late_fee, interest_amt, total_paid, due_installment_amt, is_active, created_by) VALUES ("'+that.order_id+'", "'+that.customer_id+'", "'+that.installment_no+'", "'+ that.sub_installment_no +'", "'+that.payment_date+'", "'+that.payment_rec_date+'", "'+that.payment_amt+'", "'+that.late_fee+'", "'+that.interest_amt+'", "'+ that.total_paid+'", "'+that.due_installment_amt+'", 1, "'+ that.created_by+'")', function (error, rows, fields) {
//             if (!error) {
//               if(rows.insertId != 0){
//                 resolve(1);
//               }else{
//                 resolve(0);
//               }              
//             } else {
//               console.log("Error...", error);
//               reject(error);
//             }
//           })
//       }
//       connection.release();
//       console.log('payment Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };




// Order.prototype.getSingleTransactionDetail = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       if (error) {
//         throw error;
//       }
//       if (!error) {
        
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         // connection.query('select * from transaction where id = "'+that.transaction_id+'"', function (error, rows, fields) {
//           connection.query('select id, customer_id, order_id, DATE_FORMAT(transaction_date, \'%Y-%m-%d\') payment_rec_date, transaction_amt as payment_amt, late_fee, interest_amt, status, is_active, created_by, created_at from transaction where id = "'+that.transaction_id+'"', function (error, rows, fields) {
//             if (!error) {
//                 resolve(rows);
//             } else {
//               console.log("Error...", error);
//               reject(error);
//             }
//           })
//       }
//       connection.release();
//       console.log('payment Added for Franchise Staff %d', connection.threadId);
//     });
//   }).catch((error) => {
//     throw error;
//   });
// };

Order.prototype.getReceivedPaymentsList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('select * from payments', function (error, rows, fields) {
            if (!error) {
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
      }
      connection.release();
      console.log('payment Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Order.prototype.filterMissedPaymentData = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        let orderType = '';
        let paymentDate = '';
        if(that.searchText === '$###_Fix_###$'){
          orderType = 1;
        }else if(that.searchText === '$###_Flex_###$'){
          orderType = 2;
        }
        if(that.searchText != '')
        {
          if(that.searchText.split('-').length === 3 ){
            paymentDate = setDBDateFormat(that.searchText);
            console.log(paymentDate)
          }
          // console.log(paymentDate)
        }
        if(orderType !== ''){
          connection.query('SELECT a.*, o.order_id as order_format_id from (select * from payment_schedule where `status` IN(0,2) order by `order_id`, `installment_no`) as a INNER JOIN orders as o ON a.order_id = o.id LEFT JOIN customer as c ON a.customer_id = c.id WHERE o.order_type = "'+ orderType +'" group by a.order_id', function (error, rows, fields) {
            if (!error) {
              resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        }else if(paymentDate !== ''){
          connection.query('SELECT a.*, o.order_id as order_format_id from (select * from payment_schedule where `status` IN(0,2) order by `order_id`, `installment_no`) as a INNER JOIN orders as o ON a.order_id = o.id LEFT JOIN customer as c ON a.customer_id = c.id WHERE a.payment_date = "' + paymentDate + '"  group by a.order_id', function (error, rows, fields) {
            if (!error) {
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        }else{         
          connection.query('SELECT a.*, o.order_id as order_format_id from (select * from payment_schedule where `status` IN(0,2) order by `order_id`, `installment_no`) as a INNER JOIN orders as o ON a.order_id = o.id LEFT JOIN customer as c ON a.customer_id = c.id WHERE (c.first_name LIKE "%' +that.searchText+ '%" OR c.last_name LIKE "%' +that.searchText+ '%" OR o.order_id LIKE "%' +that.searchText+ '%")  group by a.order_id', function (error, rows, fields) {
            if (!error) {
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
        }          
      }
      connection.release();
      console.log('List Fetch for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Order.prototype.fetchMissedPaymentData = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('SELECT a.*, o.order_id as order_format_id from (select * from payment_schedule where `status` IN(0,2) order by `order_id`, `installment_no`) as a INNER JOIN orders as o ON a.order_id = o.id group by a.order_id', function (error, rows, fields) {
            if (!error) {
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
      }
      connection.release();
      console.log('payment Added for Franchise Staff %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.createdPaymentSchedule = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('INSERT INTO payment_schedule(order_id, customer_id, installment_no, payment_date, status, is_active, created_by) VALUES ?',[that.paymentScheduleArray], function (error, rows, fields) {
            if (!error) {
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
      }
      connection.release();
      console.log('schedule created for order  %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.updateSchedule = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('UPDATE payment_schedule SET status = "'+that.schedule_status+'" WHERE order_id = "'+ that.order_id +'" AND customer_id = "'+ that.customer_id +'" AND installment_no = "'+ that.installment_no +'"', function (error, rows, fields) {
            if (!error) {
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
      }
      connection.release();
      console.log('schedule updated for order  %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.paymentReschedule = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('UPDATE payment_schedule SET payment_date = "'+that.payment_schedule_date+'" WHERE order_id = "'+ that.order_id +'" AND customer_id = "'+ that.customer_id +'" AND installment_no = "'+ that.installment_no +'"', function (error, rows, fields) {
            if (!error) {
              console.log("paymentSchedule",rows, that.payment_schedule_date, that.order_id, that.customer_id, that.installment_no)
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
      }
      connection.release();
      console.log('schedule updated for order  %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};


Order.prototype.archiveOrder = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('UPDATE orders SET order_status = 11, is_active = 0 WHERE id = "'+ that.order_id +'"', function (error, rows, fields) {
            if (!error) {
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
      }
      connection.release();
      console.log('schedule updated for order  %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};




Order.prototype.regenerateOrder = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('UPDATE orders SET order_status = 1, is_active = 1 WHERE id = "'+ that.order_id +'"', function (error, rows, fields) {
            if (!error) {
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
      }
      connection.release();
      console.log('schedule updated for order  %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};



Order.prototype.searchOrder = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN \'Fix Order\' ELSE \'Flex Order\' END as \'order_type_name\', o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, DATE_FORMAT(o.delivered_time, \'%h:%i:%p\') delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, DATE_FORMAT(o.delivery_time,\'%h:%i:%p\') delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as \'payment_mode_name\',  stl.sales_type_name, o.sales_person_id, u.name as sales_person_name from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id WHERE o.order_id LIKE  "%' + that.searchText + '%" OR o.ezidebit_uid LIKE "%' + that.searchText + '%"   ORDER BY o.id DESC', function (error, rows, fields) {
            if (!error) {
                resolve(rows);
            } else {
              console.log("Error...", error);
              reject(error);
            }
          })
      }
      connection.release();
      console.log('schedule updated for order  %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

module.exports = Order;