const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const ProductManager = function (params) {
  this.user_id = params.user_id;
  this.tabValue = params.tabValue;
  this.productId = params.productId;
  this.product_state = params.product_state;
};

ProductManager.prototype.getAllRelatedRecord = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select id, CAST(product_id AS UNSIGNED) as product_id, COUNT(product_id) total_rented from (select o.id, SUBSTRING_INDEX(SUBSTRING_INDEX(o.product_id, \',\', numbers.id), \',\', -1) product_id from status_payment as numbers inner join orders as o on CHAR_LENGTH(o.product_id) - CHAR_LENGTH(REPLACE(o.product_id, \',\', \'\')) >= numbers.id-1 ) as t GROUP BY product_id ORDER BY product_id', function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
                if(!error){
                  
                  let productIdList = Object.values(rows).map(data => {return data.product_id})                  
                  if(productIdList.length  === 0){ productIdList= ''}
                  
                  connection.changeUser({database : dbName["prod"] });
                  connection.query('select * from product where id IN(?)', [productIdList], function (error, productList, fields) {
                    if(error) {  console.log('Error...', error); reject(error); }
                    resolve({productList: productList, orderedProduct: rows});
                  });
                }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



ProductManager.prototype.getDeliveredRelatedRecord = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select id, CAST(product_id AS UNSIGNED) as product_id, COUNT(product_id) total_rented, order_status from (select o.id, o.order_status, SUBSTRING_INDEX(SUBSTRING_INDEX(o.product_id, \',\', numbers.id), \',\', -1) product_id from status_payment as numbers inner join orders as o on CHAR_LENGTH(o.product_id) - CHAR_LENGTH(REPLACE(o.product_id, \',\', \'\')) >= numbers.id-1 ) as t WHERE order_status IN(6,7) GROUP BY product_id ORDER BY product_id', function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
                if(!error){
                  
                  let productIdList = Object.values(rows).map(data => {return data.product_id})                  
                  if(productIdList.length  === 0){ productIdList= ''}
                  
                  connection.changeUser({database : dbName["prod"] });
                  connection.query('select * from product where id IN(?)', [productIdList], function (error, productList, fields) {
                    if(error) {  console.log('Error...', error); reject(error); }
                    resolve({productList: productList, orderedProduct: rows});
                  });
                }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



ProductManager.prototype.getRentedOrder = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          // SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, '%Y-%m-%d') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN 'Fix Order' ELSE 'Flex Order' END as 'order_type_name', o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, '%Y-%m-%d') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, '%Y-%m-%d') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as 'payment_mode_name',  stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, dpd.status as product_status, p_status.state_name as product_state, ddoc.document as delivery_document from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN delivered_product_detail as dpd ON o.product_id = dpd.product_id LEFT JOIN product_state as p_status ON dpd.status = p_status.id LEFT JOIN delivery_document as ddoc ON ddoc.order_id = o.id WHERE o.product_id LIKE '%1%' AND o.order_status IN(6,7) AND dpd.status = 1 ORDER BY o.id DESC
          connection.query('SELECT o.id, o.order_id, o.ezidebit_uid, c.id as customer_id, c.first_name, c.last_name, c.address, c.suburb, c.mobile, c.telephone, o.customer_type,  DATE_FORMAT(o.order_date, \'%Y-%m-%d\') order_date, o.sales_type_id as sales_type, o.renting_for_id as renting_for, o.order_status, o.assigned_to, o.order_type,  CASE o.order_type WHEN 1 THEN \'Fix Order\' ELSE \'Flex Order\' END as \'order_type_name\', o.payment_mode, o.product_id, o.product_related_to, o.order_type_id, o.doc_upload_status, o.is_active, o.delivery_doc_uploaded, DATE_FORMAT(o.delivered_date, \'%Y-%m-%d\') delivered_date, o.delivered_time, DATE_FORMAT(o.delivery_date, \'%Y-%m-%d\') delivery_date, o.delivery_time, o.budget_id, o.refund_amt, o.cancel_reason, os.order_status as order_status_name, d.document as uploaded_doc, pm.payment_mode as \'payment_mode_name\',  stl.sales_type_name, o.sales_person_id, u.name as sales_person_name, dpd.status as product_status, p_status.state_name as product_state, ddoc.document as delivery_document from orders as o INNER join customer as c on o.customer_id = c.id LEFT JOIN order_status as os on o.order_status = os.id LEFT JOIN payment_mode as pm on o.payment_mode = pm.id LEFT JOIN order_document as d on o.id = d.order_id LEFT JOIN sales_type_list as stl ON o.sales_type_id = stl.id LEFT JOIN user as u ON o.sales_person_id = u.id LEFT JOIN delivered_product_detail as dpd ON o.product_id = dpd.product_id LEFT JOIN product_state as p_status ON dpd.status = p_status.id LEFT JOIN delivery_document as ddoc ON ddoc.order_id = o.id WHERE o.product_id LIKE "%'+that.productId+'%" AND o.order_status IN(6,7) AND dpd.status = "'+that.product_state+'" ORDER BY o.id DESC', function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
                if(!error){
                  resolve(rows)
                }
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};



module.exports = ProductManager;
