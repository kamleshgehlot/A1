const TaskStatus = require('../models/taskStatus.js');

const all = function(req, res, next) {
  try {
    new TaskStatus({}).all().then(taskStatusList => {
      console.log('task list---',taskStatusList);
      res.send({ taskStatusList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports = {all};
