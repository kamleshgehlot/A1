const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');

const Product = function (params) {
  this.id = params.id;
  this.maincat = params.maincat;
  this.category = params.category;
  this.subcat = params.subcat;
  this.name = params.name;
  this.color_id = params.color_id;
  this.brand_id = params.brand_id;
  this.buying_price = params.buying_price;
  this.description = params.description;
  this.specification = params.specification;
  this.brought = params.brought;
  this.invoice = params.invoice;
  this.rental = params.rental;
  this.meta_keywords = params.meta_keywords;
  this.meta_description = params.meta_description;
  this.status = params.status;

  this.user_id = params.user_id;
  this.subcategory = params.subcategory;
  console.log('params',params)
};

Product.prototype.addProduct = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      const values = [
        [that.maincat, that.category, that.subcat, that.name, that.color_id, that.brand_id, that.buying_price, that.description, that.specification, that.brought, that.invoice, that.rental, that.meta_keywords, that.meta_description, that.user_id, that.status]
      ];

      connection.changeUser({ database: dbName["prod"] });
      connection.query(`INSERT INTO product(maincat, category, subcat, name, color_id, brand_id, buying_price, description, specification, brought, invoice, rental, meta_keywords, meta_description, created_by,status) VALUES ?`, [values],
        (error, mrows, fields) => {
          if (!error) {
            resolve(mrows);
          } else {
            console.log('Error...', error);
            reject(error);
          }
        });

    });
  });
}

Product.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('select id,maincat, category, subcat, name, color_id, brand_id, buying_price, description, specification, brought, invoice, rental, meta_keywords, meta_description, created_by,status from product order by id desc', function (error, rows, fields) {
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


Product.prototype.update = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });

        let values = [that.name, that.color_id, that.brand_id, that.buying_price, that.description, that.specification, that.brought, that.invoice, that.rental, that.meta_keywords, that.meta_description, that.status, that.user_id, that.id];

        connection.query('UPDATE product set name = ?, color_id = ?, brand_id = ?, buying_price =?, description = ?, specification = ?, brought = ?, invoice = ?, rental = ?, meta_keywords = ?,  meta_description = ?, status=?, modified_by = ? WHERE id = ?', values, function (error, rows, fields) {
          if (!error) {
            resolve(rows);
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

Product.prototype.archivedList = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select id,maincat, category, subcat, name, color_id, brand_id, buying_price, description, specification, brought, invoice, rental, meta_keywords, meta_description, created_by,status from product where status=3 order by id desc', function (error, rows, fields) {
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


Product.prototype.relatedProductList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
    console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if(!error){
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select id,maincat, category, subcat, name, color_id, brand_id, buying_price, description, specification, brought, invoice, rental, meta_keywords, meta_description, created_by,status from product where subcat = "'+that.subcategory+'" order by id desc', function (error, rows, fields) {
        if (!error) {
          resolve(rows);

        } else {
          console.log("Error...", error);
          reject(error);
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    }
    });
  });
}


module.exports = Product;
