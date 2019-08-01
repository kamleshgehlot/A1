const express = require('express');
const Task = require('../controllers/task.js');
const TaskStatus = require('../controllers/taskStatus.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {

    // if (process.env.NODE_ENV === 'development') {
      callback(null, './files/taskFile');
    // } else {
    //   callback(null, './build/');
    // }
  },
  filename: function (req, file, callback) {

    // if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      // console.log("file name ", file.originalname);
      // console.log("file name ", Date.now() );
      // console.log("file name ", file.originalname.split('.')[1]);
      callback(null, file.originalname.split('.')[0] + "_" + Date.now() + '.' + file.originalname.split('.')[1]);
    // }
  }
});
const upload = multer({ storage: storage });
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
taskRouter.route('/staffUpdate').post(validateToken, upload.array('avatar'),  Task.staffUpdate);

//task status list
taskRouter.route('/taskStatus').get(validateToken, TaskStatus.all);

module.exports = taskRouter;