const Task = require('../models/task.js');

const add = function (req, res, next) {
  const taskParam = {
    franchise_id: req.body.franchise_id,
    id: req.body.id,
    task_id: req.body.task_id,
    task_description: req.body.task_description,
    assigned_to: req.body.assigned_to,
    due_date: req.body.due_date,
    status: req.body.status,
    user_id: req.decoded.user_id
  };
  console.log('req--------------',req.body);
  try {
    const newTask = new Task(taskParam);


    if (req.body.id) {
      newTask.update().then(function (result) {
        new Task({ user_id: req.decoded.user_id }).all().then(taskList => {
          console.log('controller', { taskList });
          res.send({ taskList });
        });
      });
    } else {
      newTask.add().then(result => {
        new Task({ user_id: req.decoded.user_id }).all().then(taskList => {
          res.send({ taskList });
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
    new Task({ user_id: req.decoded.user_id }).all().then(taskList => {
      res.send({ taskList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};
const last = function (req, res, next) {
  try {
    new Task({ user_id: req.decoded.user_id }).last().then(taskLast => {
      res.send({ taskLast });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const completedlist = function (req, res, next) {
  try {
    new Task({ user_id: req.decoded.user_id }).completedlist().then(taskList => {
      res.send({ taskList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const deletetask = function (req, res, next) {
  const taskParam = {
    id: req.body.id,
    franchise_id: req.body.franchise_id.franchiseId,
  };
  try {
    const newTask = new Task(taskParam);
    newTask.deletetask().then(result => {
      new Task({ user_id: req.decoded.user_id }).all().then(taskList => {
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
    assigned_to: req.body.assigned_to,
    due_date: req.body.due_date,
    new_due_date: req.body.new_due_date,
    status: req.body.status,
    user_id: req.decoded.user_id
  };
  console.log('req--------------',req.body);
  try {
    const newTask = new Task(taskParam);
      newTask.reschedule().then(result => {
        new Task({ user_id: req.decoded.user_id }).all().then(taskList => {
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
const stafftasks = function (req, res, next) {
  try {
    new Task({ user_id: req.decoded.user_id }).stafftasks().then(taskList => {
      res.send({ taskList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const staffupdate = function (req, res, next) {
  const taskParam = {
    id: req.body.id,
    task_id: req.body.task_id,
    assigned_to: req.body.assigned_to,
    message: req.body.message,
    status: req.body.status,
    user_id: req.decoded.user_id,
    updated_date:req.body.updated_date
  };
  // console.log('req--------------',req.body);
  try {
    const newTask = new Task(taskParam);
      newTask.staffupdate().then(function (result) {
        new Task({ user_id: req.decoded.user_id }).stafftasks().then(taskList => {
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
module.exports = { add, all, last, completedlist,deletetask,reschedule, stafftasks,staffupdate };