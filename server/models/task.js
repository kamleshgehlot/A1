const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const Task = function (params) {
  this.franchise_id = params.franchise_id;
  this.id = params.id;
  this.task_id = params.task_id;
  this.task_description = params.task_description;
  this.assigned_to = params.assigned_to;
  this.due_date = params.due_date;
  this.updated_date=params.updated_date;
  this.is_active=1;
  this.status = params.status;
  this.message = params.message;
  this.user_id = params.user_id;
  if(params.status==='2'){
    this.start_date=params.updated_date;
  }
  if(params.status===3){
    this.new_due_date = params.new_due_date;
    this.assignid=params.assignid;
  }
  if(params.status==='4'){
    this.is_active=0;
  }
  console.log('ppppp--------',params);
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
        [that.task_id, that.task_description, that.is_active, that.franchise_id]
      ];
      const values_assign = [
        [that.task_id, that.assigned_to, that.due_date,1, that.is_active, that.franchise_id]
      ];
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select fdbname from franchise where id= "' + that.franchise_id + '"', (error, rows, fields) => {
        if (!error) {
          // console.log("ddddd", rows);
          const frachiseDbName = rows[0].fdbname;
          connection.changeUser({ database: frachiseDbName });
          connection.query(`INSERT INTO task(task_id, task_description, is_active, created_by) VALUES ?`, [values], (error, mrows, fields) => {
            if (!error) {
              connection.query(`INSERT INTO task_assign(task_id, assigned_to, due_date, status, is_active, created_by) VALUES ?`, [values_assign], (error, arows, fields) => {
                if (!error) {
                  resolve(arows);
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
      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
      connection.query('select t.id,t.task_id, t.task_description,a.id as assignid,  a.assigned_to, a.due_date, a.status, a.is_active from task t inner join task_assign a on t.task_id = a.task_id where a.is_active="1"', function (error, rows, fields) {
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
        throw error;
      }
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
      connection.query('select id from task order by id desc limit 1', function (error, rows, fields) {
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



Task.prototype.completedlist = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }


      // connection.changeUser({database : dbName["prod"]});
      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
      connection.query('select t.id,t.task_id, t.task_description,  a.assigned_to, a.due_date, a.status, a.is_active, a.start_date, a.completion_date,a.message from task t inner join task_assign a on t.task_id = a.task_id where status="4"', function (error, rows, fields) {
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
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select fdbname from franchise where id= "' + that.franchise_id + '"', (error, rows, fields) => {
          if (!error) {
            // console.log("ddddd", rows);
            const frachiseDbName = rows[0].fdbname;
            connection.changeUser({ database: frachiseDbName });
            connection.query('update task set task_description = "' + that.task_description + '" WHERE id = "' + that.id + '"', function (error, rows, fields) {
              if (!error) {
                connection.query('update task_assign set assigned_to = "' + that.assigned_to + '", due_date = "' + that.due_date + '", updated_by = "' + that.franchise_id + '", status="'+that.status+'" WHERE task_id = "t_' + that.id + '"', function (error, arows, fields) {
                  if (!error) {
                    resolve({ arows });
                  } else {
                    console.log("Error...", error);
                    reject(error);
                  }
    
                });
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
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select fdbname from franchise where id= "' + that.franchise_id + '"', (error, rows, fields) => {
          // if (!error) {
          // console.log("ddddd",  that.franchise_id);
          const frachiseDbName = rows[0].fdbname;
          connection.changeUser({ database: frachiseDbName });
          connection.query('update task set is_active = "0" WHERE id = "' + that.id + '"', function (error, rows, fields) {
            if (!error) {
              connection.query('update task_assign set is_active = "0", status="5" WHERE task_id = "t_' + that.id + '"', function (error, rows, fields) {
                if (!error) {
                  resolve({ rows });
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
    
              });
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


Task.prototype.reschedule = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      const values = [
        [that.task_id, that.task_description, that.is_active, that.franchise_id]
      ];
      const values_assign = [
        [that.task_id, that.assigned_to, that.new_due_date,1, that.is_active, that.franchise_id]
      ];
      connection.changeUser({ database: dbName["prod"] });
      connection.query('select fdbname from franchise where id= "' + that.franchise_id + '"', (error, rows, fields) => {
        if (!error) {
          const frachiseDbName = rows[0].fdbname;
          connection.changeUser({ database: frachiseDbName });
          connection.query(`INSERT INTO task_assign(task_id, assigned_to, due_date, status, is_active, created_by) VALUES ?`, [values_assign], (error, arows, fields) => {
            if (!error) {
              connection.query('update task_assign set is_active = "' + 0 + '" WHERE id = "' + that.assignid + '"', function (error, arows, fields) {
                if (!error) {
                  const insert_id=arows.insertId;
                  resolve({arows});
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
    });
  });
}


//staff task
Task.prototype.stafftasks = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }


      // connection.changeUser({database : dbName["prod"]});
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});

          connection.query('select id as uid from user where user_id="'+that.user_id+'" limit 1', function (error, rows, fields) {
            if (!error) {
                connection.query('select id as staffid from staff where franchise_user_id="'+rows[0].uid+'" limit 1', function (error, staffrows, fields) {
                  if (!error) {
                      connection.query('select t.id,t.task_id, t.task_description,  a.assigned_to, a.due_date, a.status, a.is_active from task t inner join task_assign a on t.task_id = a.task_id where a.assigned_to="'+staffrows[0].staffid+'" AND status <> 4 AND status <> 5 AND a.is_active="1"', function (error, taskrows, fields) {
                        if (!error) {
                          // console.log('model-----------------',taskrows);
                          resolve(taskrows);
        
                        } else {
                          console.log("Error...", error);
                          reject(error);
                        }
                      });
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
            console.log('Process Complete %d', connection.threadId);
          });
              
    });
  });
}


Task.prototype.staffupdate = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        connection.query('select id as uid from user where user_id="'+that.user_id+'" limit 1', function (error, rows, fields) {
          if (!error) {
            connection.query('select id as staffid from staff where franchise_user_id="'+rows[0].uid+'" limit 1', function (error, staffrows, fields) {
              if (!error) {
                if(that.status==='2'){
                  connection.query('update task_assign set start_date="'+that.start_date+'", updated_at="'+that.updated_date+'", updated_by = "' + staffrows[0].staffid + '", status="'+that.status+'", is_active="'+that.is_active+'" WHERE task_id = "t_' + that.id + '" ', function (error, arows, fields) {
                    if (!error) {
                      // console.log(arows);
                      resolve({ arows });
                    } else {
                      console.log("Error...", error);
                      reject(error);
                    }
      
                  });
                }
                else if(that.status==='4'){
                  connection.query('update task_assign set message="'+that.message+'",updated_at="'+that.updated_date+'", updated_by = "' + staffrows[0].staffid + '", status="'+that.status+'", is_active="'+that.is_active+'",completion_date="'+that.updated_date+'" WHERE task_id = "t_' + that.id + '"', function (error, arows, fields) {
                    if (!error) {
                      
                      resolve({ arows });
                    } else {
                      console.log("Error...", error);
                      reject(error);
                    }
      
                  });
                }
                else{
                  connection.query('update task_assign set message="'+that.message+'",updated_at="'+that.updated_date+'", updated_by = "' + staffrows[0].staffid + '", status="'+that.status+'", is_active="'+that.is_active+'" WHERE task_id = "t_' + that.id + '"', function (error, arows, fields) {
                    if (!error) {
                      
                      resolve({ arows });
                    } else {
                      console.log("Error...", error);
                      reject(error);
                    }
      
                  });
                }
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

module.exports = Task;
