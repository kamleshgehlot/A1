const Task = require('../models/task.js');

const add = function(req, res, next) {
  const taskParam = {
    task_id: req.body.task_id,
    task_description:req.body.task_description,
    assigned_to:req.body.assigned_to,
    due_date:req.body.due_date,
  };

  try {
    const newTask = new Task(taskParam);

    newTask
      .add()
      .then(result => {
        new Task({}).all().then(taskList => {
          res.send({ taskList });
        });
      })
      .catch(err => {
        res.status(500);
        res.render('error', { error: err });
      });
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

const all = function(req, res, next) {
  try {
    new Task({}).all().then(taskList => {
      res.send({ taskList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};
module.exports = { add,all};