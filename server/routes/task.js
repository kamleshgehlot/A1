const express = require('express');
const Task = require('../controllers/task.js');

const validateToken = require('../utils').validateToken;

const taskRouter = express.Router();

taskRouter.route('/add').post(validateToken, Task.add);
taskRouter.route('/list').get(validateToken, Task.all);
taskRouter.route('/last').get(validateToken, Task.last);
taskRouter.route('/deletetask').post(validateToken, Task.deletetask);
// staff task list
taskRouter.route('/stafftasks').get(validateToken, Task.stafftasks);
taskRouter.route('/staffupdate').post(validateToken, Task.staffupdate);

module.exports = taskRouter;