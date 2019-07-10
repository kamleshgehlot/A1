const express = require('express');
const Task = require('../controllers/task.js');

const validateToken = require('../utils').validateToken;

const taskRouter = express.Router();

taskRouter.route('/add').post(validateToken, Task.add);
taskRouter.route('/list').post(validateToken, Task.all);

module.exports = taskRouter;