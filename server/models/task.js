const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const Task = function (params) {
  this.franchise_id = params.franchise_id;
  this.id = params.id;
  this.task_id = params.task_id;
  this.task_description = params.task_description;
  this.assign_role= params.assign_role;
  this.assigned_to = params.assigned_to;
  this.due_date = params.due_date;
  this.updated_date=params.updated_date;
  this.is_active=1;
  this.status = params.status;
  this.message = params.message;
  this.document = params.document;
  this.user_id = params.user_id;
  this.userid = params.userid;
  this.created_by = params.created_by;
  this.updated_by = params.updated_by;
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
  // console.log('params-----',params);
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
        [that.task_id, that.task_description, that.is_active, that.created_by]
      ];
      const values_assign = [
        [that.task_id,that.assign_role, that.assigned_to, that.due_date,1, that.is_active, that.created_by]
      ];
        if (!error) {
          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query(`INSERT INTO task(task_id, task_description, is_active, created_by) VALUES ?`, [values], (error, mrows, fields) => {
            if (!error) {
              connection.query(`INSERT INTO task_assign(task_id,assign_role, assigned_to, due_date, status, is_active, created_by) VALUES ?`, [values_assign], (error, arows, fields) => {
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
      // console.log('that.userid',that.userid);
          // connection.query('select t.id,t.task_id, t.task_description, a.message, a.document, a.id as assignid,a.assign_role, case r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.status, a.is_active, a.document from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id where a.is_active="1" AND t.created_by="'+that.userid+'"', function (error, rows, fields) {
            connection.query('select t.id,t.task_id, t.task_description, a.message, a.document, a.id as assignid,a.assign_role, case r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.status, a.is_active, a.document from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id where t.created_by="'+that.userid+'"', function (error, rows, fields) {
            if (!error) {
              // console.log('taskrows-=-==--',rows);
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


Task.prototype.rescheduledTaskList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
      // console.log('that.userid',that.userid);
          connection.query('select t.id,t.task_id, t.task_description, a.message, a.document, a.id as assignid,a.assign_role, CASE r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.start_date, a.status, a.is_active, a.document from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id where a.is_active="1" AND a.status="3" AND t.created_by= "'+that.userid+'"', function (error, rows, fields) {
            if (!error) {
              // console.log('taskrows-=-==--',rows);
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



Task.prototype.assignToOther = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
      // console.log('that.userid',that.userid);
          connection.query('select t.id,t.task_id, t.task_description, a.message, a.document, a.id as assignid,a.assign_role, CASE r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.start_date, a.status, a.is_active, a.document from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id where a.is_active="1" AND (a.status="1" || a.status="2")  AND t.created_by= "'+that.userid+'" ', function (error, rows, fields) {
            if (!error) {
              // console.log('taskrows-=-==--',rows);
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



Task.prototype.completedList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }
      connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
      connection.query('select t.id as task_table_id, t.task_id, t.task_description, a.id, a.assign_role, a.assigned_to, a.due_date, a.status, a.is_active, a.start_date, a.completion_date,a.message, a.document from task t inner join task_assign a on t.task_id = a.task_id where a.status="4" AND a.is_active="0" AND a.created_by="'+that.userid+'"', function (error, rows, fields) {
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
            connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
            connection.query('update task set task_description = "' + that.task_description + '" WHERE id = "' + that.id + '"', function (error, rows, fields) {
              if (!error) {
                connection.query('update task_assign set assign_role="'+that.assign_role+'", assigned_to = "' + that.assigned_to + '", due_date = "' + that.due_date + '", updated_by = "' + that.updated_by + '", status="'+that.status+'" WHERE task_id = "' + that.task_id + '"', function (error, arows, fields) {
                  if (!error) {
                    // console.log('rows9080 uhhj---',rows)
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
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch((error) => {
    throw error;
  });
};

Task.prototype.deleteTask = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('update task set is_active = "0" WHERE id = "' + that.task_id + '"', function (error, rows, fields) {
            if (!error) {
              connection.query('update task_assign set is_active = 0, status=5, updated_by="'+that.updated_by+'" WHERE id = "' + that.id + '"', function (error, rows, fields) {
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
      if (!error) {
      
      const values_assign = [
        [that.task_id, that.assign_role, that.assigned_to, that.new_due_date,1, that.is_active, that.created_by]
      ];
      connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
          connection.query('update task_assign set is_active =  0, updated_by = "'+that.updated_by+'" WHERE id = "' + that.assignid + '"', function (error, arows, fields) {
            if (!error) {
              connection.query(`INSERT INTO task_assign(task_id,assign_role, assigned_to, due_date, status, is_active, created_by) VALUES ?`, [values_assign], (error, atrows, fields) => {
                if (!error) {
                  resolve({atrows});
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
        }
    });
  });
}


//staff task
Task.prototype.staffTasks = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select t.id,t.task_id, t.task_description,a.assign_role,  a.assigned_to, a.due_date, a.status, a.is_active from task t inner join task_assign a on t.task_id = a.task_id where a.assigned_to="'+that.userid+'" AND t.created_by = CASE WHEN status = 3 THEN "'+that.userid+'" ELSE t.created_by END AND status <> 4 AND status <> 5 AND status <> 3 AND a.is_active="1"', function (error, taskrows, fields) {
            if (!error) {
              resolve(taskrows);

            } else {
              console.log("Error...", error);
              reject(error);
            }
          });
          connection.release();
          console.log('Process Complete %d', connection.threadId);
        }
    });
  });
}


Task.prototype.staffUpdate = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          
        if(that.document == '')
        {
          
        if(that.status==='2'){
          // console.log('that.statius==-=',that.task_id)
          connection.query('update task_assign set message="'+that.message+'", start_date="'+that.start_date+'",  updated_at="'+that.updated_date+'", updated_by = "' +that.updated_by + '", status="'+that.status+'", is_active="'+that.is_active+'" WHERE task_id = "' + that.task_id + '"  AND is_active <> 0', function (error, arows, fields) {
            if (!error) {
              resolve({ arows });
            } else {
              console.log("Error...", error);
              reject(error);
            }

          });
        }
        else if(that.status==='4'){
          connection.query('update task_assign set message="'+that.message+'",updated_at="'+that.updated_date+'", updated_by = "' + that.updated_by  + '", status="'+that.status+'", is_active="'+that.is_active+'",completion_date="'+that.updated_date+'" WHERE task_id = "' + that.task_id + '" AND is_active <> 0', function (error, arows, fields) {
            if (!error) {
              
              resolve({ arows });
            } else {
              console.log("Error...", error);
              reject(error);
            }

          });
        }
        else{
          connection.query('update task_assign set message="'+that.message+'", updated_at="'+that.updated_date+'", updated_by = "' + that.updated_by  + '", status="'+that.status+'", is_active="'+that.is_active+'" WHERE task_id = "' + that.task_id + '" AND is_active<>0', function (error, arows, fields) {
            if (!error) {
              
              resolve({ arows });
            } else {
              console.log("Error...", error);
              reject(error);
            }

          });
        }
 
      }
        else{

                if(that.status==='2'){
                  // console.log('that.statius==-=',that.task_id)
                  connection.query('update task_assign set message="'+that.message+'", start_date="'+that.start_date+'", document="'+that.document+'", updated_at="'+that.updated_date+'", updated_by = "' +that.updated_by + '", status="'+that.status+'", is_active="'+that.is_active+'" WHERE task_id = "' + that.task_id + '"  AND is_active <> 0', function (error, arows, fields) {
                    if (!error) {
                      resolve({ arows });
                    } else {
                      console.log("Error...", error);
                      reject(error);
                    }
      
                  });
                }
                else if(that.status==='4'){
                  connection.query('update task_assign set message="'+that.message+'", document="'+that.document+'",updated_at="'+that.updated_date+'", updated_by = "' + that.updated_by  + '", status="'+that.status+'", is_active="'+that.is_active+'",completion_date="'+that.updated_date+'" WHERE task_id = "' + that.task_id + '" AND is_active <> 0', function (error, arows, fields) {
                    if (!error) {
                      
                      resolve({ arows });
                    } else {
                      console.log("Error...", error);
                      reject(error);
                    }
      
                  });
                }
                else{
                  connection.query('update task_assign set message="'+that.message+'", document="'+that.document+'",updated_at="'+that.updated_date+'", updated_by = "' + that.updated_by  + '", status="'+that.status+'", is_active="'+that.is_active+'" WHERE task_id = "' + that.task_id + '" AND is_active<>0', function (error, arows, fields) {
                    if (!error) {
                      
                      resolve({ arows });
                    } else {
                      console.log("Error...", error);
                      reject(error);
                    }
      
                  });
                }
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);
    }
    });
  }).catch((error) => {
    throw error;
  });
};

module.exports = Task;
