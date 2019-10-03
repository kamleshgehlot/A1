const Task = require('../models/task.js');

const add = async function (req, res, next) {
  console.log('task add body params..',req.body)
  console.log('task add decoded params..',req.decoded)

  const staffData = JSON.parse(req.body.data);

  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

  const taskParam = {
    // id : staffData.id,
    task_id : staffData.task_id,    
    task_description : staffData.task_description,
    assign_to_role: staffData.assign_to_role,
    assigned_to : staffData.assigned_to,
    due_date : staffData.due_date,
    message : staffData.message,
    document : attachments,
    user_id : req.decoded.user_id,
    created_by: req.decoded.id,
    creator_role : staffData.creator_role,
    msgId : 0,
    docId : 0,
    taskInsertId : 0,
  };
  console.log('taskparams..',taskParam);

  try {
    const newTask = new Task(taskParam);
    const taskInsertId = await newTask.addTask();
    console.log('taskInsertId',taskInsertId);
    newTask.taskInsertId = taskInsertId.taskInsertId;
    
    if(taskParam.document !== "" && taskParam.document != undefined){
      const docInsertId = await newTask.addDocument();
      newTask.docId = docInsertId.docInsertId;
      console.log('docInsertId',docInsertId);
    }
    if(taskParam.message !== "" && taskParam.messaage != undefined){
      const msgInsertId = await newTask.addMessage();
      newTask.msgId = msgInsertId.msgInsertId;
      console.log('msgInsertId',msgInsertId);
    }

    const taskActivityResult = await newTask.taskActivityCreate();
    console.log('taskActivityResult',taskActivityResult);

    res.send({});
  } catch (err) {
    next(err);
  }
};

const all = async function (req, res, next) {
  try {
  
   const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all();
   res.send({ taskList });
  } catch (err) {
    next(err);
  }
};

const rescheduledTaskList = async function (req, res, next) {
  try {
    const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).rescheduledTaskList();
    res.send({ taskList });
  } catch (err) {
    next(err);
  }
};

const assignToOther = async function (req, res, next) {
  try {
    const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).assignToOther();
    res.send({ taskList });
  } catch (err) {
    next(err);
  }
};

const last = async function (req, res, next) {
  try {
    const taskLast = await new Task({ user_id: req.decoded.user_id }).last();
    
    res.send(taskLast);
  } catch (err) {
    next(err);
  }
};

const completedList = async function (req, res, next) {
  try {
    const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).completedList();
    res.send({ taskList });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async function (req, res, next) {
  const taskParam = {
    id: req.body.id,
    user_id: req.decoded.user_id,
    updated_by: req.decoded.id,
    task_id: req.body.task_id,
  };
  try {
    const newTask = new Task(taskParam);
    await newTask.deleteTask();
    const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all();
    res.send({ taskList });
    // const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).completedList(); 
    // res.send({ taskList });   
  } catch (err) {
    next(err);
  }
};

const reschedule = async function (req, res, next) {
  console.log('reschedule Req',req.body);
  const taskParam = {
    franchise_id: req.decoded.franchise_id,
    id: req.body.id,
    task_id: req.body.task_id,
    assign_table_id : req.body.assign_table_id,
    task_description: req.body.task_description,
    assign_role: req.body.assign_role,
    assigned_to: req.body.assigned_to,
    due_date: req.body.due_date,
    new_due_date: req.body.new_due_date,
    // is_assigned_to_all : req.body.is_assigned_to_all,
    status: 4,
    updated_by: req.decoded.id,
    created_by: req.decoded.id,
    user_id: req.decoded.user_id,
    created_by_role : req.body.created_by_role,
  };

  try {
    const newTask = new Task(taskParam);
    await newTask.reschedule();
    const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all();
    
    res.send({ taskList });
  } catch (err) {
    next(err);
  }
};

// staff task list
const staffTasks = async function (req, res, next) {
  try {
    const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).staffTasks();    
    res.send({ taskList });
  } catch (err) {
    next(err);
  }
};

const staffUpdate = async function (req, res, next) {

  const staffData = JSON.parse(req.body.data);

  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

  const taskParam = {
    id: staffData.id,
    task_id: staffData.task_id,
    assigned_role: staffData.assigned_role,
    assigned_to: staffData.assigned_to,
    message: staffData.message,
    assign_table_id : staffData.assign_table_id,
    is_assigned_to_all : staffData.is_assigned_to_all,
    status: staffData.status,
    user_id: req.decoded.user_id,
    updated_by: req.decoded.id,
    updated_date: staffData.updated_date,
    created_by: req.decoded.id,
    start_date :  staffData.start_date,
    document: attachments,
  };

  try {
    const newTask = new Task(taskParam);
    await newTask.staffUpdate();
    const taskList = await new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all();
    res.send({ taskList });
  } catch (err) {
    next(err);
  }
};



const getMsgList = async function (req, res, next) {

  const taskParam = {
    id : req.body.id,
    user_id : req.decoded.user_id,
  };

  try {
    const newTask = new Task(taskParam);
    const msgList = await newTask.getMsgList();
    res.send( msgList );
  } catch (err) {
    next(err);
  }
};

const getTaskHistory = async function (req, res, next) {

  const taskParam = {
    id : req.body.id,
    task_id : req.body.task_id,
    user_id : req.decoded.user_id,
  };

  try {
    const newTask = new Task(taskParam);
    const msgList = await newTask.getTaskHistory();
    res.send( msgList );
  } catch (err) {
    next(err);
  }
};





module.exports = { add, all, last, completedList, deleteTask, reschedule, getTaskHistory, staffTasks, staffUpdate, getMsgList, rescheduledTaskList, assignToOther };