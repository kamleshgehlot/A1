const express = require('express');
const Task = require('../controllers/task.js');
const TaskStatus = require('../controllers/taskStatus.js');

const validateToken = require('../utils').validateToken;

const taskRouter = express.Router();

taskRouter.route('/add').post(validateToken, Task.add);
taskRouter.route('/list').get(validateToken, Task.all);
taskRouter.route('/last').get(validateToken, Task.last);
taskRouter.route('/completedList').get(validateToken, Task.completedList);
taskRouter.route('/deleteTask').post(validateToken, Task.deleteTask);
taskRouter.route('/reschedule').post(validateToken, Task.reschedule);
// staff task list
taskRouter.route('/staffTasks').get(validateToken, Task.staffTasks);
taskRouter.route('/staffUpdate').post(validateToken, Task.staffUpdate);

//task status list
taskRouter.route('/taskStatus').get(validateToken, TaskStatus.all);

module.exports = taskRouter;