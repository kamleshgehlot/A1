const connection = require("../lib/connection.js");
const utils = require("../utils");

var Company = function (params) {
      this.name= params.name;
      this.nbzn= params.nbzn;
      this.location= params.location;
      this.director= params.director;
      this.email= params.email;
      this.contact= params.contact;
      this.alt_contact= params.alt_contact;
      this.website= params.website;
      this.accountant_id = params.accountant_id;
      console.log('model company',params);
};

Company.prototype.register = function () {
  const that = this;
  return new Promise(function (resolve, reject) {

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      if (!error) {
        connection.changeUser({database : 'rentronics'});
        connection.query('INSERT INTO company(name,nbzn,location,director,email,contact,alt_contact,website,accountant_id) VALUES ("' + that.name + '", "' + that.nbzn + '","' + that.location + '", "' + that.director + '","' + that.email + '", "' + that.contact + '","' + that.alt_contact + '","' + that.website + '","' + that.accountant_id + '")', function (error, rows, fields) {


              if (!error) {
                let company_id = rows.insertId;
                resolve({ company_id: company_id });
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
      console.log('Company Added %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Company.prototype.update = function (newUser) {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      if (!error) {
        console.log("type..........", that);
        
        connection.changeUser({ database: 'rentronics' });

        let values = [
          [that.name, that.nbzn, that.location, that.director, that.email, that.contact, that.alt_contact, that.website, that.accountant_id, that.id]
        ]

        connection.query('UPDATE company set name = ?, nbzn = ?, location=?, director=?, email = ?, contact = ?, alt_contact = ?, website = ?, accountant_id =?  WHERE id = ?', values, function (error, rows, fields) {
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
}

module.exports = Company;
