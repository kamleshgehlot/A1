const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const Report = function (params) {
  this.customer_name = params.customer_name;
  this.customer_id = params.customer_id;
  this.customer_contact = params.customer_contact;
  this.order_id = params.order_id;
  this.from_date = params.from_date;
  this.to_date = params.to_date;
  this.user_id = params.user_id;
  this.required_type = params.required_type;

};

Report.prototype.getFinanceReport = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select c.id, c.customer_name, c.address, c.city, c.postcode, c.telephone, c.mobile, c.email, c.gender, c.is_working, c.dob, c.id_type, c.other_id_type, c.id_number, c.expiry_date, c.is_adult, c.id_proof, c.alt_c1_name, c.alt_c1_address, c.alt_c1_contact, c.alt_c1_relation, c.alt_c2_name, c.alt_c2_address, c.alt_c2_contact, c.alt_c2_relation, c.is_active, c.state, c.created_by, u.name AS created_by_name, ci.employer_name, ci.employer_address, ci.employer_telephone, ci.employer_email, ci.employer_tenure from customer as c inner join customer_income as ci on c.id = ci.cust_id INNER JOIN user as u on c.created_by = u.id WHERE c.id = "'+that.customer_id+'" OR c.customer_name = "'+that.customer_name+'" OR c.mobile = "'+that.customer_contact+'"', function (error, rows, fields) {
            if (!error && rows != "") {
              let cust_id = rows[0].id;
              connection.query('SELECT o.id, o.order_id, c.id as customer_id, c.customer_name, c.address, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, DATE_FORMAT(o.delivered_time, \'%T\') delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, DATE_FORMAT(o.delivery_time, \'%T\') delivery_time, o.budget_id, os.order_status as order_status_name, d.document as uploaded_doc from orders as o inner join customer as c on o.customer_id = c.id INNER JOIN order_status as os on o.order_status = os.id LEFT JOIN order_document as d on o.id = d.order_id WHERE o.is_active = 1 AND o.customer_id ="'+cust_id+'" ORDER BY o.id DESC', function (error, orderRows, fields) {
                if (!error && rows != "") {
                  resolve({customerData: rows, OrderData: orderRows, isAvailable: 1});
                } else {
                  console.log("Error...", error);
                  resolve({customerData: rows, OrderData: [], isAvailable: 1});
                  // reject(error);
                }
              });
            } else {
              console.log("Error...", error);
              resolve({customerData: [], OrderData: [], isAvailable: 0});
            }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


Report.prototype.getOrderReport = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select p.id, p.order_id, p.customer_id, p.installment_no, DATE_FORMAT(p.payment_date,\'%Y-%m-%d\') payment_date, DATE_FORMAT(p.payment_rec_date,\'%Y-%m-%d\') payment_rec_date, p.payment_amt, p.total_paid from payment_status as p WHERE p.order_id = "'+that.order_id+'" AND p.customer_id = "'+that.customer_id+'" AND DATE_FORMAT(p.payment_rec_date, \'%Y-%m-%d\') BETWEEN  DATE_FORMAT("'+that.from_date+'",\'%Y-%m-%d\') AND DATE_FORMAT("'+that.to_date+'" ,\'%Y-%m-%d\')', function (error, rows, fields) {
            if (!error) {
              resolve(rows);
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
};



Report.prototype.getDeliveryReport = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
        let query = '';
        if(that.required_type===2){
          query = 'SELECT o.id, o.order_id, c.id as customer_id, c.customer_name, c.address, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, DATE_FORMAT(o.delivered_time, \'%T\') delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, DATE_FORMAT(o.delivery_time, \'%T\') delivery_time, o.budget_id, os.order_status as order_status_name, d.document as uploaded_doc from orders as o inner join customer as c on o.customer_id = c.id INNER JOIN order_status as os on o.order_status = os.id LEFT JOIN order_document as d on o.id = d.order_id WHERE o.is_active = 1 AND o.order_status = 4 AND DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') BETWEEN  DATE_FORMAT("'+that.from_date+'", \'%Y-%m-%d\') AND DATE_FORMAT("'+that.to_date+'" ,\'%Y-%m-%d\') ORDER BY o.delivery_date, o.delivery_time';
        }
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          // connection.query('SELECT o.id, o.order_id, c.id as customer_id, c.customer_name, c.address, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.order_status, o.assigned_to, o.order_type, o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, DATE_FORMAT(o.delivered_time, \'%T\') delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, DATE_FORMAT(o.delivery_time, \'%T\') delivery_time, o.budget_id, os.order_status as order_status_name, d.document as uploaded_doc from orders as o inner join customer as c on o.customer_id = c.id INNER JOIN order_status as os on o.order_status = os.id LEFT JOIN order_document as d on o.id = d.order_id WHERE o.is_active = 1 AND o.order_status = 4 AND DATE_FORMAT(o.order_date, \'%Y-%m-%d\') BETWEEN  DATE_FORMAT("'+that.from_date+'", \'%Y-%m-%d\') AND DATE_FORMAT("'+that.to_date+'" ,\'%Y-%m-%d\') ORDER BY o.delivery_date DESC, o.delivery_time', function (error, rows, fields) {
            connection.query(query, function (error, rows, fields) {
            if (!error && rows != "") {
              resolve({ orderData: rows, isAvailable: 1});
              // console.log('pending', rows);
            } else {
              console.log("Error...", error);
              resolve({orderData: [], isAvailable: 0});
              reject(error);
            }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



module.exports = Report;
