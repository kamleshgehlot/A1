const connection = require('../../lib/connection.js');
const utils = require('../../utils');

const Product = function(params) {
  this.id = params.id;
  this.maincat=params.maincat;
  this.category=params.category;
  this.subcat=params.subcat;
  this.name=params.name;
  this.color_id=params.color_id;
  this.brand_id=params.brand_id;
  this.buying_price=params.buying_price;
  this.description=params.description;
  this.specification=params.specification;
  this.brought=params.brought;
  this.invoice=params.invoice;
  this.rental=params.rental;
  this.meta_keywords=params.meta_keywords;
  this.meta_description=params.meta_description;
};

Product.prototype.addproduct = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({database : 'rentronics'});
      connection.query(
        `INSERT INTO product(maincat,category,subcat,name,color_id,brand_id,buying_price,description,specification,brought,invoice,rental,meta_keywords,meta_description) VALUES 
        ("${that.maincat}", "${that.category}", "${that.subcat}", "${that.name}", "${that.color_id}", "${that.brand_id}", "${that.buying_price}", "${that.description}", "${that.specification}", "${that.brought}", "${that.invoice}", "${that.rental}", "${that.meta_keywords}", "${that.meta_description}")`,
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

      connection.changeUser({database : 'rentronics'});
      connection.query('select * from product order by id desc', function (error, rows, fields) {

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
module.exports = Product;
