const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const ProductManager = function (params) {
  this.user_id = params.user_id;
  this.tabValue = params.tabValue;
};

ProductManager.prototype.getTabRelatedRecord = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select id, CAST(product_id AS UNSIGNED) as product_id, COUNT(product_id) total_ordered_product from (select o.id, SUBSTRING_INDEX(SUBSTRING_INDEX(o.product_id, \',\', numbers.id), \',\', -1) product_id from status_payment as numbers inner join orders as o on CHAR_LENGTH(o.product_id) - CHAR_LENGTH(REPLACE(o.product_id, \',\', \'\')) >= numbers.id-1 ) as t GROUP BY product_id ORDER BY product_id', function (error, rows, fields) {
            if(error) {  console.log('Error...', error); reject(error); }
            resolve(rows);
          });
        }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  });
};


module.exports = ProductManager;
