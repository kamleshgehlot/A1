const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

const Task = function (params) {
  
  this.task_id = params.task_id;
  this.task_description = params.task_description;
  this.assign_to_role = params.assign_to_role;
  this.assigned_to = params.assigned_to;
  this.due_date = params.due_date;
  this.is_active= 1;
  this.message = params.message;
  this.document = params.document;
  this.user_id = params.user_id;
  this.created_by = params.created_by;
  this.creator_role = params.creator_role;
  this.msgId = params.msgId;
  this.docId = params.docId;
  this.taskInsertId = params.taskInsertId;
  
  console.log('params userId body-----',params);
};

// Task.prototype.add = function () {
//   const that = this;
//   return new Promise(function (resolve, reject) {
//     connection.getConnection(function (error, connection) {
//       console.log('Process Started %d All', connection.threadId);
//       if (error) {
//         throw error;
//       }

//       const values = [
//         [that.task_id, that.task_description, 1, that.created_by]
//       ];

//       let values_assign = [];

//       if(that.is_assigned_to_all === 1){
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//         connection.query('select id from user where role_id LIKE "%'+that.assign_role+'%"', [values], (error, rows, fields) => {
//           if (!error && rows != "") {
//             let valuesArray = [];
//             (rows.length > 0 ? rows : []).map(data =>{
//               valuesArray.push(
//                 [that.task_id,that.assign_role, data.id, that.is_assigned_to_all, that.due_date, that.reassigned_time, 1, 1, that.created_by_role, that.created_by]
//               );
//             })
//             values_assign = valuesArray;
//           } else{
//             console.log('Error...', error);
//             reject(error);
//           }         
//         });
//       }else{
//         values_assign = [
//           [that.task_id,that.assign_role, that.assigned_to, that.is_assigned_to_all, that.due_date, that.reassigned_time, 1, 1, that.created_by_role, that.created_by]
//         ];
//       }
//       if (!error) {
//         connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
//           connection.query(`INSERT INTO task(task_id, task_description, is_active, created_by) VALUES ?`, [values], (error, mrows, fields) => {
//             if (!error) {
//               connection.query(`INSERT INTO task_assign(task_id,assign_role, assigned_to, is_assigned_to_all, due_date, reassigned_time, status, is_active, created_by_role, created_by) VALUES ?`, [values_assign], (error, arows, fields) => {
//                 if (!error) {
//                   resolve(arows);
//                 } else {
//                   console.log('Error...', error);
//                   reject(error);
//                 }
//               });
//             } else {
//               console.log('Error...', error);
//               reject(error);
//             }
//           });
//         } else {
//           console.log('Error...', error);
//           reject(error);
//         }
//     });
//   });
// }



Task.prototype.addTask = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }else {
        
        const taskValues = [
          [that.task_id, that.task_description, 1, that.created_by, that.creator_role]
        ];
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        connection.query(`INSERT INTO task(task_id, task_description, is_active, created_by, creator_role) VALUES ?`, [taskValues], (error, rows, fields) => {
          if (!error) {
              resolve({taskInsertId: rows.insertId});
            }else{            
              console.log("Error...", error);
              reject(error);
            }
          });
        }

  connection.release();
  console.log('Process Complete %d', connection.threadId);
  });
});
}



Task.prototype.addDocument = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }else {
        
          const docValues = [
            [that.taskInsertId, that.document, 1, that.created_by]
          ]
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('insert into task_document(task_id, document, status, created_by) VALUES ?',[docValues], function (error, rows, fields) {
            if (!error) { 
              resolve({docInsertId: rows.insertId});
            }else{            
            console.log("Error...", error);
            reject(error);
          }
        });
      }
  connection.release();
  console.log('Process Complete %d', connection.threadId);
  });
});
}



Task.prototype.addMessage = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }else {
  
        
          const docValues = [
            [that.taskInsertId, that.message, 1, that.created_by]
          ]
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('insert into task_message(task_id, message, status, created_by) VALUES ?',[docValues], function (error, rows, fields) {
            if (!error) { 
              resolve({msgInsertId: rows.insertId});
            }else{            
            console.log("Error...", error);
            reject(error);
          }
        });
      }
  connection.release();
  console.log('Process Complete %d', connection.threadId);
  });
});
}




Task.prototype.taskActivityCreate = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }else {
        const tastActivityValues = [
          [that.taskInsertId, that.assigned_to, that.assign_to_role, that.task_description, that.due_date, that.msgId, that.docId, 1, 1, that.created_by]
        ];
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
        connection.query(`INSERT INTO task_activity(task_id, assign_to, assign_to_role, description, due_date, message_id, document_id, status, is_active, created_by) VALUES ?`, [tastActivityValues], (error, rows, fields) => {
          if (!error) {
            resolve({rows});
          }else{           
            console.log("Error...", error);
            reject(error);
          }
        });
      }
  connection.release();
  console.log('Process Complete %d', connection.threadId);
  });
});
}




Task.prototype.add = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }else {
        
        const taskValues = [
          [that.task_id, that.task_description, 1, that.created_by, that.creator_role]
        ];
       
        connection.query(`INSERT INTO task(task_id, task_description, is_active, created_by, creator_role) VALUES ?`, [taskValues], (error, rows, fields) => {
          if (!error) {
            let msgId = 0;
            let docId = 0;
            console.log('msgId,DocId',msgId, docId)

            if(that.document !== "" && that.document != undefined){
              connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
              const docValues = [
                [rows.insertId, that.document, 1, that.created_by]
              ]
    
              connection.query('insert into task_document(task_id, document, status, created_by) VALUES ?',[docValues], function (error, rows, fields) {
                if (!error) { 
                  msgId = rows.insertId;
                  console.log('doc',rows)
                  // resolve({rows});
                }else{            
                  console.log("Error...", error);
                  reject(error);
                }
              });
            }

            if(that.message !== "" && that.message != undefined){
              connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
                const msgValues = [
                  [rows.insertId, that.message, 1, that.created_by]
                ]
    
                connection.query('insert into task_message(task_id, message, is_active, created_by) VALUES ?',[msgValues], function (error, rows, fields) {
                  if (!error) { 
                    docId = rows.insertId;
                    console.log('msg', rows)
                    // resolve({rows});
                  }else{           
                    console.log("Error...", error);
                    reject(error);
                  }
                });
            }
            console.log('msgId,DocId 222',msgId, docId)
            const tastActivityValues = [
              [rows.insertId, that.assigned_to, that.assign_to_role, that.task_description, that.due_date, msgId, docId, 1, 1, that.created_by]
            ];
            console.log('tastActivityValues',tastActivityValues)
            connection.query(`INSERT INTO task_activity(task_id, assign_to, assign_to_role, description, due_date, message_id, document_id, status, is_active, created_by) VALUES ?`, [tastActivityValues], (error, arows, fields) => {
              if (!error) {
                resolve({rows});
              }else{           
                console.log("Error...", error);
                reject(error);
              }
            });
        }
    });
  }

  connection.release();
  console.log('Process Complete %d', connection.threadId);
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
            // connection.query('select t.id,t.task_id, t.task_description, a.message, a.document, a.id as assignid,a.assign_role, case r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.status, a.is_active, a.document from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id where t.created_by="'+that.userid+'"', function (error, rows, fields) {
              // connection.query('select t.id,t.task_id, t.task_description, a.message, a.document, a.id as assignid, a.assign_role, case r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.status, a.is_active, a.document, u.name as assigned_to_name from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id INNER JOIN user u on a.assigned_to=u.id where t.created_by= "'+that.userid+'"', function (error, rows, fields) {
                // connection.query('select t.id,t.task_id, t.task_description, t.created_by, a.message, a.document, a.id as assignid, a.assign_role, a.created_by_role, case r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.start_date, a.completion_date, a.status, a.is_active, a.document, u.name as assigned_to_name, ts.status as task_status_name from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id INNER JOIN user u on a.assigned_to=u.id INNER JOIN task_status ts on a.status = ts.id ORDER BY t.id DESC', function (error, rows, fields) {
                  connection.query('select t.id,t.task_id, t.task_description, t.created_by, a.id as assignid, a.assign_role, a.created_by_role, case r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.start_date, a.close_date, a.reassigned_time, a.completion_date, a.status, a.is_active, DATE_FORMAT(a.created_at, \'%W %d %M %Y %H:%i:%s\') created_at, a.is_assigned_to_all, u.name as assigned_to_name, ts.status as task_status_name from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id INNER JOIN user u on a.assigned_to=u.id INNER JOIN task_status ts on a.status = ts.id ORDER BY t.id DESC', function (error, rows, fields) {
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
          connection.query('select t.id,t.task_id, t.task_description, a.message, a.document, a.id as assignid, a.assign_role, CASE r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.start_date, a.status, a.is_active, a.document from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id where a.is_active="1" AND (a.status="1" || a.status="2")  AND t.created_by= "'+that.userid+'" ', function (error, rows, fields) {
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
                if(that.unUpdated_Task_Data.assign_role != that.assign_role || that.unUpdated_Task_Data.assigned_to != that.assigned_to){                  
                  connection.query('update task_assign set close_date = now(), status = "11", is_active = 0, updated_by = "' + that.updated_by + '" WHERE id = "' + that.assign_table_id + '"', function (error, arows, fields) {
                    if (!error) {
                      connection.query('select reassigned_time, (reassigned_time + 1) as inc_reassigned_time from task_assign WHERE id = "' + that.assign_table_id + '"', function (error, rows, fields) { 
                        if(!error){
                          // reassigned_time = rows[0].reassigned_time 
                        let reassigned_time = rows[0].reassigned_time;
                        let inc_reassigned_time = rows[0].inc_reassigned_time ;
                        let values_assign = [];

                        if(that.is_assigned_to_all === 1){
                          connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
                          connection.query('select id from user where role_id LIKE "%'+that.assign_role+'%"', (error, rows, fields) => {
                            if (!error && rows != "") {
                              let valuesArray = [];
                              (rows.length > 0 ? rows : []).map(data =>{
                                valuesArray.push(
                                  [that.task_id,that.assign_role, data.id, that.is_assigned_to_all, that.due_date, inc_reassigned_time, 1, 1, that.created_by_role, that.created_by]
                                );
                              })
                              // values_assign = valuesArray;
                              connection.query(`INSERT INTO task_assign(task_id,assign_role, assigned_to, is_assigned_to_all, due_date, reassigned_time, status, is_active, created_by_role, created_by) VALUES ?`, [valuesArray], (error, arows, fields) => {
                                if (!error) {
                                  resolve(arows);
                                } else {
                                  console.log('Error...', error);
                                  reject(error);
                                }
                              });
                            } else{
                              console.log('Error...', error);
                              reject(error);
                            }         
                          });
                        }else{
                          values_assign = [
                            [that.task_id,that.assign_role, that.assigned_to, that.is_assigned_to_all, that.due_date, inc_reassigned_time, 1, 1, that.created_by_role, that.created_by]
                          ];
                          connection.query(`INSERT INTO task_assign(task_id,assign_role, assigned_to, is_assigned_to_all, due_date, reassigned_time, status, is_active, created_by_role, created_by) VALUES ?`, [values_assign], (error, arows, fields) => {
                            if (!error) {
                              resolve(arows);
                            } else {
                              console.log('Error...', error);
                              reject(error);
                            }
                          });
                        }                                                
                      } else {
                        console.log("Error...", error);
                        reject(error);
                      }
                    });
                  }
                });              
                }else{
                  connection.query('update task_assign set due_date = "' + that.due_date + '", updated_by = "' + that.updated_by + '" WHERE id = "' + that.assign_table_id + '"', function (error, arows, fields) {  
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
      
      connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
      connection.query('update task set task_description = "' + that.task_description + '" WHERE id = "' + that.id + '"', function (error, rows, fields) {
        if(!error) {
      
          connection.query('update task_assign set close_date = now(), status = "4", is_active = 0, updated_by = "' + that.updated_by + '" WHERE id = "' + that.assign_table_id + '"', function (error, arows, fields) {
            if (!error) {
              connection.query('select reassigned_time, (reassigned_time + 1) as inc_reassigned_time, is_assigned_to_all from task_assign WHERE id = "' + that.assign_table_id + '"', function (error, rows, fields) { 
                if(!error){
                let reassigned_time = rows[0].reassigned_time;
                let inc_reassigned_time = rows[0].inc_reassigned_time;
                let is_assigned_to_all = rows[0].is_assigned_to_all;
                let values_assign = [];
                  if(that.is_assigned_to_all === 1){
                    connection.changeUser({ database: dbName.getFullName(dbName["prod"], that.user_id.split('_')[1]) });
                    connection.query('select id from user where role_id LIKE "%'+that.assign_role+'%"', (error, rows, fields) => {
                      if (!error && rows != "") {
                        let valuesArray = [];
                        (rows.length > 0 ? rows : []).map(data =>{
                          valuesArray.push(
                            [that.task_id,that.assign_role, data.id, that.is_assigned_to_all, that.new_due_date, inc_reassigned_time, 4, 1, that.created_by_role, that.created_by]
                          );
                        })
                        connection.query(`INSERT INTO task_assign(task_id,assign_role, assigned_to, is_assigned_to_all, due_date, reassigned_time, status, is_active, created_by_role, created_by) VALUES ?`, [valuesArray], (error, arows, fields) => {
                          if (!error) {
                            resolve(arows);
                          } else {
                            console.log('Error...', error);
                            reject(error);
                          }
                        });
                      } else{
                        console.log('Error...', error);
                        reject(error);
                      }         
                    });
                  }else{
                    values_assign = [
                      [that.task_id,that.assign_role, that.assigned_to, is_assigned_to_all, that.new_due_date, inc_reassigned_time, 4, 1, that.created_by_role, that.created_by]
                    ];
                    connection.query(`INSERT INTO task_assign(task_id,assign_role, assigned_to, is_assigned_to_all, due_date, reassigned_time, status, is_active, created_by_role, created_by) VALUES ?`, [values_assign], (error, arows, fields) => {
                      if (!error) {
                        resolve(arows);
                      } else {
                        console.log('Error...', error);
                        reject(error);
                      }
                    });
                  }                                                
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
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



Task.prototype.getMsgList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select m.id, m.task_id, m.task_assign_id, m.task_uid, m.message, m.status,  s.status as status_name, u.name as user_name, r.name as user_role, DATE_FORMAT(m.created_at, \'%W %d %M %Y %H:%i:%s\') created_at from task_message as m INNER JOIN task_assign as a on m.task_assign_id = a.id INNER JOIN user as u on m.created_by = u.id INNER JOIN role as r on a.assign_role = r.id INNER JOIN task_status as s on a.status = s.id WHERE m.task_id = "'+that.id+'" ORDER BY m.id DESC', function (error, rows, fields) {
            if (!error) {
              resolve(rows);
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



Task.prototype.getTaskHistory = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      console.log('Process Started %d All', connection.threadId);
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('select t.id,t.task_id, t.task_description, t.created_by, a.id as assignid, a.assign_role, a.created_by_role, case r.name when "Admin" then "Director" else r.name END as assign_role_name, a.assigned_to, a.due_date, a.start_date, a.close_date, a.reassigned_time, a.completion_date, a.status, a.is_active, DATE_FORMAT(a.created_at, \'%W %d %M %Y %H:%i:%s\') created_at, a.is_assigned_to_all, u.name as assigned_to_name, ts.status as task_status_name from task t inner join task_assign a on t.task_id = a.task_id inner join role r on a.assign_role = r.id INNER JOIN user u on a.assigned_to=u.id INNER JOIN task_status ts on a.status = ts.id WHERE a.task_id = "' + that.task_id + '" ORDER BY a.id', function (error, rows, fields) {
            if (!error) {
              resolve(rows);
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
        if(that.document !== "" && that.document != undefined){
          const docValues = [
            [that.id, that.assign_table_id, that.task_id, that.document, that.status, 1, that.created_by]
          ]

          connection.query('insert into task_document(task_id, task_assign_id, task_uid, document, status, is_active, created_by) VALUES ?',[docValues], function (error, rows, fields) {
            if (!error) { 
              resolve({rows});
            }else{            
              console.log("Error...", error);
              reject(error);
            }
          });
        }
        if(that.message !== "" && that.message != undefined){
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
            const msgValues = [
              [that.id, that.assign_table_id, that.task_id, that.message, that.status, 1, that.created_by]
            ]

            connection.query('insert into task_message(task_id, task_assign_id, task_uid, message, status, is_active, created_by) VALUES ?',[msgValues], function (error, rows, fields) {
              if (!error) { 
                resolve({rows});
              }else{           
                console.log("Error...", error);
                reject(error);
              }
            });
        }

        if(that.status==='2'){
          connection.query('update task_assign set start_date = "' + that.start_date + '",  updated_at="' + that.updated_date + '", updated_by = "' + that.updated_by + '", status = "' + that.status + '" WHERE id = "' + that.assign_table_id + '"', function (error, rows, fields) {
            if (!error) { 
              resolve({rows});
            }else{
              console.log("Error...", error);
              reject(error);
            }
          });
        }
        else if(that.status === '3'){
          connection.query('update task_assign set updated_at="'+that.updated_date+'", updated_by = "' + that.updated_by  + '", status="'+that.status+'" WHERE id = "' + that.assign_table_id + '"', function (error, rows, fields) {
            if (!error) { 
              resolve({rows});
            }else{
              console.log("Error...", error);
              reject(error);
            }
          });
        }
        else if(that.status==='9'){
          connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
          connection.query('update task_assign set updated_at="'+that.updated_date+'", updated_by = "' + that.updated_by  + '", status="'+that.status+'", completion_date="'+that.updated_date+'", is_active = 0 WHERE id = "' + that.assign_table_id + '"', function (error, rows, fields) {
            if (!error) {  
              connection.query('select * from task_assign where task_id = "'+that.task_id+'" AND is_active = 1', function (error, rows, fields) {
                if (!error ) {  
                  if(rows == ""){
              connection.changeUser({database : dbName.getFullName(dbName["prod"], that.user_id.split('_')[1])});
              connection.query('update task set is_active = 0, updated_by = "' + that.updated_by  + '", updated_at="'+that.updated_date+'" WHERE id = "' + that.id + '"', function (error, rows, fields) {
                if (!error) { 
                  resolve({rows});
                }else{
                  console.log("Error...", error);
                  reject(error);    
                  }
                });
              }else{
                resolve({rows});
                }
              }else{
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
      }
    });
  }).catch((error) => {
    throw error;
  });
};

module.exports = Task;
