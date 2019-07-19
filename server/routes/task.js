const express = require('express');
const Task = require('../controllers/task.js');
const TaskStatus = require('../controllers/taskStatus.js');

const validateToken = require('../utils').validateToken;

const taskRouter = express.Router();

taskRouter.route('/add').post(validateToken, Task.add);
taskRouter.route('/list').get(validateToken, Task.all);
taskRouter.route('/last').get(validateToken, Task.last);
taskRouter.route('/completedlist').get(validateToken, Task.completedList);
taskRouter.route('/deletetask').post(validateToken, Task.deleteTask);
taskRouter.route('/reschedule').post(validateToken, Task.reschedule);
// staff task list
taskRouter.route('/stafftasks').get(validateToken, Task.staffTasks);
taskRouter.route('/staffupdate').post(validateToken, Task.staffUpdate);

//task status list
taskRouter.route('/taskstatus').get(validateToken, TaskStatus.all);

module.exports = taskRouter;