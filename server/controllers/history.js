const History = require('../models/history.js');

const record = async function (data) {
  let exceptionLogParam = {
    tableName : data.tableName,
    columnName: data.columnName,
    rowId: data.rowId,
    message: data.message,
    franchise_id: data.franchise_id,
    stack: data.stack,
    created_by: data.created_by
  };

  try {
    const exceptionLog = new History(exceptionLogParam);

    await exceptionLog.log();

    return true;
  } catch (err) {
    return err;
  }
};

module.exports = {
  add
};