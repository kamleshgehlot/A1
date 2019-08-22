const Task = require('../models/task.js');

const add = function (req, res, next) {
  const taskParam = {
    franchise_id: req.body.franchise_id,
    id: req.body.id,
    task_id: req.body.task_id,
    task_description: req.body.task_description,
    assign_role: req.body.assign_role,
    assigned_to: req.body.assigned_to,
    due_date: req.body.due_date,
    status: req.body.status,
    user_id: req.decoded.user_id,
    created_by: req.decoded.id,
    updated_by: req.decoded.id,
  };
  // console.log('req--------------',req.body);
  try {
    const newTask = new Task(taskParam);

    if (req.body.id) {
      newTask.update().then(function (result) {
        new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all().then(taskList => {
          // console.log('controller', { taskList });
          res.send({ taskList });
        });
      });
    } else {
      newTask.add().then(result => {
        new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all().then(taskList => {
          res.send({ taskList });
          // console.log('tasklist---==----',taskList);
        });
      })
    }
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

const all = function (req, res, next) {
  try {
    new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all().then(taskList => {
      // console.log('tasklist controller---',taskList);
      res.send({ taskList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};
const last = function (req, res, next) {
  try {
    new Task({ user_id: req.decoded.user_id }).last().then(taskLast => {
      res.send(taskLast);
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const completedList = function (req, res, next) {
  try {
    new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).completedList().then(taskList => {
      res.send({ taskList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const deleteTask = function (req, res, next) {
  const taskParam = {
    id: req.body.id,
    user_id: req.decoded.user_id,
    updated_by: req.decoded.id,
    franchise_id: req.body.franchise_id.franchiseId,
    task_id: req.body.task_id,
  };
  try {
    const newTask = new Task(taskParam);
    newTask.deleteTask().then(result => {
      new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all().then(taskList => {
        res.send({ taskList });
      });
    })
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};


const reschedule = function (req, res, next) {
  const taskParam = {
    franchise_id: req.body.franchise_id,
    assignid: req.body.assignid,
    task_id: req.body.task_id,
    task_description: req.body.task_description,
    assign_role: req.body.assigned_role,
    assigned_to: req.body.assigned_to,
    due_date: req.body.due_date,
    new_due_date: req.body.new_due_date,
    status: req.body.status,
    updated_by: req.decoded.id,
    created_by: req.decoded.id,
    user_id: req.decoded.user_id
  };
  try {
    const newTask = new Task(taskParam);
    newTask.reschedule().then(result => {
      new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).all().then(taskList => {
        res.send({ taskList });
      });
    })
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

// staff task list
const staffTasks = function (req, res, next) {
  try {
    new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).staffTasks().then(taskList => {
      res.send({ taskList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const staffUpdate = function (req, res, next) {

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
    status: staffData.status,
    user_id: req.decoded.user_id,
    updated_by: req.decoded.id,
    updated_date: staffData.updated_date,
    document: attachments,
  };
  // console.log('req--------------',req.body);
  try {
    const newTask = new Task(taskParam);
    newTask.staffUpdate().then(function (result) {
      new Task({ user_id: req.decoded.user_id, userid: req.decoded.id }).staffTasks().then(taskList => {
        // console.log('controller', { taskList });
        res.send({ taskList });
      });
    });
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};
module.exports = { add, all, last, completedList, deleteTask, reschedule, staffTasks, staffUpdate };