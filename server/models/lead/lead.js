const connection = require('../../lib/connection.js');
const dbName = require('../../lib/databaseMySQLNew.js');

const Lead = function (params) {
  this.lead_id= params.lead_id;
  this.franchise_id= params.franchise_id;
  this.message= params.message;
  this.is_active= params.is_active;
  this.user_id = params.user_id;
  this.userid = params.userid;
  this.is_franchise_exist=params.is_franchise_exist;
  this.franchise_name=params.franchise_name;
  this.comment=params.comment;
  this.comment_by=params.comment_by;
  this.f_id=params.f_id;
  if(params.f_id===null){
    this.f_id=0;
  }
  this.uid=params.uid;
  console.log('params------',params);
};

Lead.prototype.add = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
    
      if(that.user_id!="admin"){
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
        connection.query('select franchise_id from user where id=1 limit 1', function (error, rows, fields) {
          if (!error) {
            // resolve(rows);
            const franchise_id=rows[0].franchise_id;
            const values = [
              [that.lead_id, that.is_franchise_exist, that.franchise_id,that.franchise_name, that.message,franchise_id, that.uid, that.is_active]
            ];
            connection.changeUser({ database: dbName["prod"] });
            connection.query(`INSERT INTO leads(lead_id,is_franchise_exist, franchise_id,franchise_name,message,f_id,created_by ,is_active) VALUES ?`, [values], (error, mrows, fields) => {
              if (!error) {
                resolve(mrows);
              } else {
                console.log('Error...', error);
                reject(error);
              }
            });
            
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
      }
      else{
        const values = [
          [that.lead_id, that.is_franchise_exist, that.franchise_id,that.franchise_name, that.message,that.f_id, that.uid, that.is_active]
        ];
        connection.changeUser({ database: dbName["prod"] });
        connection.query(`INSERT INTO leads(lead_id,is_franchise_exist, franchise_id,franchise_name,message,f_id,created_by ,is_active) VALUES ?`, [values], (error, mrows, fields) => {
          if (!error) {
            resolve(mrows);
          } else {
            console.log('Error...', error);
            reject(error);
          }
        });
      }
    });
  });
}

Lead.prototype.all = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select id,lead_id, is_franchise_exist,franchise_id,franchise_name,message, is_active from leads where is_active="1" order by id desc', function (error, rows, fields) {
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

Lead.prototype.last = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select id from leads order by id desc limit 1', function (error, rows, fields) {
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


Lead.prototype.addComment = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });

      const values = [
        [that.lead_id, that.comment, that.comment_by]
      ];
      connection.query(`INSERT INTO lead_comment(l_id,comment,comment_by) VALUES ?`, [values], (error, mrows, fields) => {
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

Lead.prototype.allComment = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query(`Select l_id,comment,comment_by from lead_comment where l_id="`+that.lead_id+`"`, (error, mrows, fields) => {
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
module.exports = Lead;
