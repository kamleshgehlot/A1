const express = require('express');
const router = express.Router();
const connection = require('../lib/connection.js');
const dbName = require('../lib/databaseMySQLNew.js');

router.route("/orderamount").post(async (req, res, next) => {
  return querypromise(`select round(sum(payment_amt),2) as totalreceived,count(payment_amt) as ordercount, staffname from (SELECT sum(payment_amt) as payment_amt, max(total_paid) as total_paid, CONCAT(staff.first_name,' ',staff.last_name) as staffname, staff.id as staff_id FROM payment_schedules left join orders on orders.id = payment_schedules.order_id left join staff on staff.franchise_user_id=orders.sales_person_id where payment_schedules.status NOT IN (1,6,7,8,9,10,16,17) and  payment_schedules.settlement_date >= DATE(NOW()) - INTERVAL `+(req.body.duration || 7)+` DAY group by payment_schedules.order_id) as t where staffname is not NULL group by t.staff_id`, [] , req,res);
});
router.route("/ordercount").post(async (req, res, next) => {
    return querypromise(`select count(distinct orders.order_id) as totalcount,CONCAT(staff.first_name,' ',staff.last_name) as staffname from orders left join staff on staff.franchise_user_id=orders.sales_person_id where orders.created_at >= DATE(NOW()) - INTERVAL `+(req.body.duration || 7)+` DAY group by orders.sales_person_id;`, [] , req,res);
  });
router.route("/newamount").post(async (req, res, next) => {
    return querypromise(`select round(sum(payment_amt),2) as totalreceived,count(payment_amt) as ordercount, staffname from (SELECT sum(payment_amt) as payment_amt, max(total_paid) as total_paid, CONCAT(staff.first_name,' ',staff.last_name) as staffname, staff.id as staff_id FROM payment_schedules left join orders on orders.id = payment_schedules.order_id left join staff on staff.franchise_user_id=orders.sales_person_id where payment_schedules.status NOT IN (1,6,7,8,9,10,16,17) and  orders.created_at >= DATE(NOW()) - INTERVAL `+(req.body.duration || 7)+` DAY group by payment_schedules.order_id) as t where staffname is not NULL group by t.staff_id`, [] , req,res);
});
router.route("/productmanager").post(async (req, res, next) => {
    let orders=await querypromise(`select * from orders;`, [] , req,false);
    let productlist={};
    orders.forEach(order => {
        let list=order.product_id.split(',');
        list.forEach(item => {
            if(!productlist[item])productlist[item]={count:1};
            else productlist[item].count++;
        });
    });
    delete req.body.franchise;
    let names=await querypromise("select * from product where id in ("+Object.keys(productlist).join(',').replace(/,\s*$/, "")+");",[],req,false);
    function search(searchValue, arrayName,key){
        let answer=false;
        arrayName.forEach(item => {if(item[key]==searchValue)answer=item;});
        return answer;
    }
    Object.keys(productlist).forEach(item => {
        let result=search(item,names,"id");
        if(result){
            productlist[item].productid=result.id;
            productlist[item].name=result.name;
            productlist[item].description=result.description;
            productlist[item].maincat=result.maincat;
            productlist[item].category=result.category;
            productlist[item].subcat=result.subcat;
        }
    });

    let newdata=[];
    let mainCategory=req.body.mainCategory;
    let category=req.body.category;
    let subCategory=req.body.subCategory;
    Object.keys(productlist).forEach(item => {
        let data=productlist[item];
        if((!mainCategory || data.maincat==mainCategory)&&(!category || data.category==category)&&(!subCategory || data.subcat==subCategory))  
        newdata.push({ ...data });
        });

    res.send({ status: 400, data: newdata });
});

const querypromise = (mysqlquery, values,req,res) => {
    // console.log(mysqlquery); // TODO remove in PROD
  return new Promise((resolve, reject) => {
      connection.getConnection((error, connection) => {
          if (error || connection === undefined) {
              console.log('Error: ', error);
              reject(error);
          } else {

  let uid=0;
  if(req.body.userid)uid=req.body.userid;

  let dbname=dbName["prod"];
  if(req.body.franchise)dbname=dbName.getFullName(dbName["prod"], uid.split('_')[1]);

            connection.changeUser({ database: dbname });
              connection.query(
                  mysqlquery,
                  [values],
                  (error, result, fields) => {
                      if (error) {
                          console.log('Error: ', error);
                          if(res)res.send({ status: 400, data: error });
                          else reject(error);
                      } else {
                        //   console.log('Result: ',result);
                          if(res)res.send({ status: 200, data: result });
                          else resolve(result);
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
