const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQL.js');

const Task = function(params) {
  this.franchise_id = params.franchise_id;
  this.id=params.id;
  this.task_id=params.task_id;
  this.task_description=params.task_description;
  this.assigned_to=params.assigned_to;
  this.due_date=params.due_date;
  this.status=1;
  this.user_id = params.user_id;
  // console.log('ppppp--------',params);
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
        [that.task_id, that.task_description, that.assigned_to, that.due_date,that.status]
      ];
      connection.changeUser({database : dbName["prod"]});
      connection.query('select fdbname from franchise where id= "' + that.franchise_id + '"',(error, rows, fields) => {
        if (!error) {
          // console.log("ddddd", rows);
          const frachiseDbName = rows[0].fdbname;
          connection.changeUser({database : frachiseDbName});
          connection.query(`INSERT INTO task(task_id, task_description, assigned_to, due_date,status) VALUES ?`, [values],(error, mrows, fields) => {
          if (!error) {
          resolve(mrows);
        } else {
          console.log('Error...', error);
          reject(error);
        }
      });
    }else{
      console.log('Error...', error);
          reject(error);
    }
  });
    });
  });
}

Task.prototype.all = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      
      // connection.changeUser({database : dbName["prod"]});
      connection.changeUser({database : "rentronics_" + that.user_id.split('_')[1]});
      connection.query('select id,task_id, task_description, assigned_to, due_date from task where status=1', function (error, rows, fields) {
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

Task.prototype.last = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;}
        connection.changeUser({database : "rentronics_" + that.user_id.split('_')[1]});
      connection.query('select id,task_id, task_description, assigned_to, due_date from task order by id desc limit 1', function (error, rows, fields) {
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

Task.prototype.update = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({database : dbName["prod"]});
      connection.query('select fdbname from franchise where id= "' + that.franchise_id + '"',(error, rows, fields) => {
        if (!error) {
          // console.log("ddddd", rows);
          const frachiseDbName = rows[0].fdbname;
          connection.changeUser({database : frachiseDbName});
        connection.query('update task set task_description = "' + that.task_description + '", assigned_to = "' + that.assigned_to + '", due_date = "' + that.due_date+ '" WHERE id = "' + that.id + '"', function (error, rows, fields) {
              if (!error) {
                resolve({rows});
              } else {
                console.log("Error...", error);
                reject(error);
              }
            
        });
      } else {
        console.log("Error...", error);
        reject(error);
      }
    })
    }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Task.prototype.deletetask = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({database : dbName["prod"]});
        connection.query('select fdbname from franchise where id= "' + that.franchise_id + '"',(error, rows, fields) => {
        // if (!error) {
          // console.log("ddddd",  that.franchise_id);
        const frachiseDbName = rows[0].fdbname;
        connection.changeUser({database : frachiseDbName});
        connection.query('update task set status = "' + 0 + '" WHERE id = "' + that.id + '"', function (error, rows, fields) {
              if (!error) {
                resolve({rows});
              } else {
                console.log("Error...", error);
                reject(error);
              }
            
        });
      })
      } else {
        console.log("Error...", error);
        reject(error);
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};
module.exports = Task;
