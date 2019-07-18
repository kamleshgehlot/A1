const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const Location = function (params) {
  this.id = params.id;
  this.city = params.city;

  this.city_code = params.city_code;
  this.city_id = params.city_id;
  this.city_name = params.city_name
};

Location.prototype.getAll = function () {
  
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
          connection.query('select id, city, city_code from location order by city', (error, rows, fields) => {
            if (!error) {
              resolve(rows);
            } else {
              console.log('Error...', error);
              reject(error);
            }
          });
        
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
};


Location.prototype.getSelectedArea = function () {
  const that =this; 
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('select suburb from franchise WHERE city = "'+that.city_name+'" AND city_code = "'+that.city_code+'"', (error, rows, fields) => {
        if (!error) {
          let suburb= [''];
          (rows.length > 0 ? rows : []).map((data,index) => { 
              suburb.push(data.suburb);
          })
          // console.log("sub..",suburb);
          connection.query('select id, area, city_id, is_active from area where city_id = "'+ that.city_id +'" AND area NOT IN (?) order by area',[suburb], (error, rows, fields) => {
            if (!error) {
              resolve(rows);
            } else {
              console.log('Error...', error);
              reject(error);
            }
        }) 
      }else {
          console.log('Error...', error);
          reject(error);
        }
        });

        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
};


module.exports = Location;
