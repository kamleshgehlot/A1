const StaticContent = require('../models/staticContent');

const getWeekDayList = async function(req, res, next) {
  try {
    const result = await new StaticContent({}).getWeekDayList();
    res.send({ weekDayList : result });
  } catch (error) {
    next(error);
  }
};

const getPaymentModeList = async function(req, res, next) {
  try {
    const result = await new StaticContent({}).getPaymentModeList();
    res.send({ paymentModeList : result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getWeekDayList, getPaymentModeList};
