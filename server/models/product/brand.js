const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');

const utils = require('../../utils');

const Brand = function (params) {
  this.id = params.id;
  this.brand_name = params.brand_name;
};


Brand.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('select * from brand', function (error, rows, fields) {

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


Brand.prototype.addBrand = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
              connection.query(`INSERT INTO brand(brand_name) VALUES (?)`,[that.brand_name],(error, crows, fields) => {
                if (!error) {
                   resolve(crows);
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

module.exports = Brand;
