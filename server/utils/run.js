const express = require('express');
const router = express.Router();
const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

router.route("/dashboardorder").post(async (req, res, next) => {
  return querypromise(`select * from orders left join fixed_order on fixed_order.id=orders.order_type_id left join staff on staff.franchise_user_id=orders.sales_person_id ;`, [] , "prod" , req,res);
});

const querypromise = (mysqlquery, values,database,req,res) => {
  return new Promise((resolve, reject) => {
      connection.getConnection((error, connection) => {
          if (error || connection === undefined) {
              console.log('Error...', error);
              reject(error);
          } else {

  let uid=0;
  if(req.body.userid)uid=req.body.userid;

  let dbname=dbName["prod"];
  if(req.body.franchise)dbname=dbName.getFullName(dbName["prod"], uid.split('_')[1]);

            if(database)connection.changeUser({ database: dbname });
              connection.query(
                  mysqlquery,
                  [values],
                  (error, result, fields) => {
                      if (error) {
                          console.log('Error...', error);
                          // reject(error);
                          res.send({ status: 400, data: error });
                      } else {
                          // resolve(result);
                          res.send({ status: 200, data: result });
                      }
                  }
              );
          }

          if (connection) {
              console.log('Process Complete %d', connection.threadId);
              connection.release();
          }
          else {
              res.send({ status: 400, data: {} });
          }
      });
  });
}

module.exports = router;
