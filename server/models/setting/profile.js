const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQL.js');

const utils = require('../../utils');

const Profile = function(params) {
  this.user_id = params.user_id;
};


Profile.prototype.info = function () {
  
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName["prod"]});
      connection.query('select director_id, franchise_id from user where user_id="'+that.user_id+'"', function (error, rows, fields) {

        if (!error) {
          // console.log("ddddd", rows);
          const director_id = rows[0].director_id;
          const franchise_id = rows[0].franchise_id;
          connection.query('select c.name, c.nbzn, c.location, c.director, c.email, c.contact, c.alt_contact, c.website, f.name as fname from company c, franchise f where c.id="'+director_id+'" AND f.id="'+franchise_id+'" limit 1', function(error, mrows, fields) {
          if (!error) {
          resolve(mrows);
          } else {
            console.log('Error...', error);
            reject(error);
          }
          connection.release();
          console.log('Process Complete %d', connection.threadId);
        });
      } else {
        console.log('Error...', error);
        reject(error);
      }
    });
  });
});
}
module.exports = Profile;
