const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQL.js');

const Task = function(params) {
  this.task_id=params.task_id;
  this.task_description=params.task_description;
  this.assigned_to=params.assigned_to;
  this.due_date=params.due_date;
};

Task.prototype.add = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }

      const values = [
        [that.task_id, that.task_description, that.assigned_to, that.due_date]
      ];
       
      connection.changeUser({database : dbName["prod"]});
      connection.query(
        `INSERT INTO task(task_id, task_description, assigned_to, due_date) VALUES ?`, [values],
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

Task.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName["prod"]});
      connection.query('select id,task_id, task_description, assigned_to, due_date from task order by id desc', function (error, rows, fields) {
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


module.exports = Task;
