const connection = require('../lib/connection.js');
const utils = require('../utils');

const Category = function(params) {
  this.id = params.id;
  this.maincategory = params.maincategory;
  this.category = params.category;
  this.subcategory = params.subcategory;
};

Category.prototype.add = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        console.log("type..........", that);

        connection.changeUser({ database: 'rentronics' });
        connection.query(
          `INSERT INTO category(category,type) VALUES ("${that.maincategory}", "1")`,
          (error, mrows, fields) => {
            if (!error) {
            resolve(mrows);
          } else {
            console.log('Error...', error);
            reject(error);
          }
        });
        connection.query(
          `INSERT INTO category(category,type) VALUES ("${that.category}", "2")`,
          (error, rows, fields) => {
            if (!error) {
            resolve(rows);
          } else {
            console.log('Error...', error);
            reject(error);
          }
        });
        connection.query(
          `INSERT INTO category(category,type) VALUES ("${that.subcategory}", "3")`,
          (error, rows, fields) => {
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


Category.prototype.addcategory = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        console.log("type..........", that);

        connection.changeUser({ database: 'rentronics' });

        connection.query(
          `INSERT INTO category(category,type) VALUES ("${that.category}", "2")`,
          (error, rows, fields) => {
            if (!error) {
            resolve(rows);
          } else {
            console.log('Error...', error);
            reject(error);
          }
        });
        connection.query(
          `INSERT INTO category(category,type) VALUES ("${that.subcategory}", "3")`,
          (error, rows, fields) => {
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


Category.prototype.addsubcategory = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        console.log("type..........", that);

        connection.changeUser({ database: 'rentronics' });
        connection.query(
          `INSERT INTO category(category,type) VALUES ("${that.subcategory}", "3")`,
          (error, rows, fields) => {
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

Category.prototype.update = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        console.log("type..........", that);
        
        connection.changeUser({ database: 'rentronics' });

        let values = [that.category, that.type, that.position, that.description, that.meta_keywords, that.meta_description, that.id]

			connection.query('UPDATE category set category = ?, type = ?, position = ?, description = ?, meta_keywords = ?, meta_description = ? WHERE id = ?', values, function (error, rows, fields) {
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

      connection.changeUser({database : 'rentronics'});
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
module.exports = Category;
