const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const utils = require('../utils');

const Category = function (params) {
  this.id = params.id;
  this.maincategory = params.maincategory;
  this.category = params.category;
  this.subcategory = params.subcategory;

  // params for updation
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

  this.user_id = params.user_id;
  this.updated_at = new Date();
};


Category.prototype.add = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
       
        connection.changeUser({ database: dbName["prod"] });
        connection.query(`INSERT INTO category(category, type, related_to, created_by) VALUES (?,?,?,?)`,[that.maincategory, 1, 0, that.user_id],(error, mcrows, fields) => {
            if (!error) {
              connection.query(`INSERT INTO category(category, type, related_to, created_by) VALUES (?,?,?,?)`,[that.category, 2, mcrows.insertId, that.user_id],(error, crows, fields) => {
                if (!error) {
                  connection.query(`INSERT INTO category(category, type, related_to, created_by) VALUES (?,?,?,?)`,[that.subcategory, 3, crows.insertId, that.user_id],(error, scrows, fields) => {
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
              });
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




Category.prototype.addCategory = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
              connection.query(`INSERT INTO category(category, type, related_to, created_by) VALUES (?,?,?,?)`,[that.category, 2, that.maincategory, that.user_id],(error, crows, fields) => {
                if (!error) {
                  connection.query(`INSERT INTO category(category, type, related_to, created_by) VALUES (?,?,?,?)`,[that.subcategory, 3, crows.insertId, that.user_id],(error, scrows, fields) => {
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


Category.prototype.addSubCategory = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query(`INSERT INTO category(category, type, related_to, created_by) VALUES (?,?,?,?)`,[that.subcategory, 3, that.category, that.user_id],(error, rows, fields) => {
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

Category.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('select * from category', function (error, rows, fields) {

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



Category.prototype.mainCategoryList = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if(!error){
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select * from category where type = 1', function (error, rows, fields) {

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




Category.prototype.categoryList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if(!error){
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select * from category where type = 2 && related_to = "'+that.maincategory+'"', function (error, rows, fields) {
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

Category.prototype.subCategoryList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if(!error){
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select * from category where type = 3 && related_to = "'+that.category+'"', function (error, rows, fields) {
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



Category.prototype.relatedProductList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if(!error){
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select * from category where type = 3 && related_to = "'+that.category+'"', function (error, rows, fields) {
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

module.exports = Category;
