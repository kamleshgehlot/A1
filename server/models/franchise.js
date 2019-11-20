const connection = require("../lib/connection.js");
const dbName = require('../lib/databaseMySQLNew.js');

const Franchise = function (params) {
  // this.id = params.id;

  this.name = params.name;
  this.city = params.city;
  this.city_code = params.city_code;
  this.suburb = params.suburb;
  this.abn = params.abn;
  this.state = params.state;
  this.created_by = params.created_by;
  this.company_id = params.company_id;

  //frachise id for updation
  this.f_id = params.f_id;
  // this.com_id = params.com_id;
  this.email = params.email;
};



const user = "CREATE TABLE IF NOT EXISTS `user` ( `id` INT NOT NULL AUTO_INCREMENT, `franchise_id`  INT, `director_id` INT, `status` TINYINT NOT NULL DEFAULT FALSE, `name` VARCHAR(50) NOT NULL, `user_id` VARCHAR(20) NOT NULL, `password` BLOB NOT NULL, `token` VARCHAR(100) DEFAULT NULL, `account_id` VARCHAR(100) DEFAULT NULL, `designation` VARCHAR(50) DEFAULT NULL, `role_id` VARCHAR(20) NOT NULL, `is_active` TINYINT DEFAULT NULL, `created_by` INT DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT current_timestamp, PRIMARY KEY (`id`));";
const role = "CREATE TABLE IF NOT EXISTS `role` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50) NOT NULL, `state` TINYINT NULL, `created_by` INT NOT NULL,`created_at` timestamp null default current_timestamp,PRIMARY KEY (id));";
const userRole = "CREATE TABLE IF NOT EXISTS `user_role` (id INT NOT NULL AUTO_INCREMENT,user_id INT NOT NULL,role_id INT NOT NULL, is_active TINYINT NULL,created_by INT NOT NULL,created_at timestamp null default current_timestamp,PRIMARY KEY (id));";
const staff = "CREATE TABLE IF NOT EXISTS `staff` ( `id` int(11) NOT NULL AUTO_INCREMENT, `franchise_user_id` INT NOT NULL, `first_name` varchar(20) NOT NULL,`last_name` varchar(20) DEFAULT NULL, `location` varchar(200) NOT NULL, `contact` varchar(10) NOT NULL, `email` varchar(50) NOT NULL, `pre_company_name` varchar(30) DEFAULT NULL, `pre_company_address` varchar(200) DEFAULT NULL, `pre_company_contact` varchar(10) DEFAULT NULL, `pre_position` varchar(100) DEFAULT NULL, `duration` varchar(80) DEFAULT NULL, `user_id` varchar(20) NOT NULL, `password` blob NOT NULL, `role` varchar(20) NULL, `employment_docs` varchar(500) DEFAULT NULL, `created_by` tinyint(4) NOT NULL, `updated_by` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const customer = "CREATE TABLE IF NOT EXISTS `customer` (`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `customer_name` varchar(50) NOT NULL, `address` varchar(200) NOT NULL, `city` varchar(70) NOT NULL, `postcode` varchar(10) DEFAULT NULL, `telephone` varchar(10) DEFAULT NULL, `mobile` varchar(10) DEFAULT NULL, `email` varchar(100) DEFAULT NULL, `gender` varchar(15) NOT NULL, `is_working` tinyint(4) NOT NULL, `dob` varchar(30) DEFAULT NULL, `id_type` int(11) DEFAULT NULL, `other_id_type` VARCHAR(255) DEFAULT NULL, `dl_version_number` INT(11) DEFAULT NULL, `id_number` varchar(30) DEFAULT NULL, `expiry_date` varchar(30) NOT NULL, `is_adult` tinyint(4) NOT NULL, `id_proof` varchar(500) DEFAULT NULL, `other_id_proof` varchar(500) DEFAULT NULL, `alt_c1_name` varchar(50) DEFAULT NULL, `alt_c1_address` varchar(200) DEFAULT NULL, `alt_c1_contact` varchar(10) DEFAULT NULL, `alt_c1_relation` varchar(20) DEFAULT NULL, `alt_c2_name` varchar(50) DEFAULT NULL, `alt_c2_address` varchar(200) DEFAULT NULL, `alt_c2_contact` varchar(10) DEFAULT NULL, `alt_c2_relation` varchar(20) DEFAULT NULL, `state` tinyint(4) NOT NULL, `is_verified` TINYINT(1) NOT NULL DEFAULT '0', `is_active` tinyint(4) NOT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const customer_income = "CREATE TABLE IF NOT EXISTS `customer_income` (`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `cust_id` int(11) DEFAULT NULL, `employer_name` varchar(100) DEFAULT NULL, `employer_address` varchar(200) DEFAULT NULL, `employer_telephone` varchar(10) DEFAULT NULL, `employer_email` varchar(50) DEFAULT NULL, `employer_tenure` varchar(50) DEFAULT NULL, `state` tinyint(4) NOT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` tinyint(4) DEFAULT NULL, `updated_by` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const customer_state = "CREATE TABLE IF NOT EXISTS `customer_state`(id tinyint(4) NOT NULL AUTO_INCREMENT, state_name VARCHAR(20) NOT NULL, is_active tinyint(4) NOT NULL, PRIMARY KEY(id));";
const idProof = "CREATE TABLE  IF NOT EXISTS `id_type` (`id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const enquiry = "CREATE TABLE IF NOT EXISTS `enquiry`(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `enquiry_id` varchar(10) NOT NULL, `lead_id` INT(11) NOT NULL, `is_existing_customer` TINYINT(4) DEFAULT NULL, `customer_id` INT(11) DEFAULT NULL, `customer_name` varchar(50) NOT NULL, `contact` varchar(20) DEFAULT NULL, `interested_product_id` varchar(20) NOT NULL, `converted_to` tinyint(4) DEFAULT NULL, `reason_to_delete` VARCHAR(500), `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const orders = "CREATE TABLE IF NOT EXISTS `orders`(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `order_id` varchar(50) NOT NULL, `customer_id` int(11) NOT NULL, `customer_type` TINYINT(4) DEFAULT NULL, `product_id` varchar(255) NOT NULL, `product_related_to` varchar(255) DEFAULT NULL, `sales_person_id` INT(11) DEFAULT NULL, `sales_type_id` INT(11) DEFAULT NULL, `renting_for_id` INT(11) DEFAULT NULL, `order_type` tinyint(4) NOT NULL, `order_type_id` int(11) NOT NULL, `budget_id` int(11) NOT NULL, payment_mode tinyint(4) NOT NULL, `assigned_to` tinyint(4) NOT NULL, `order_date` DATE DEFAULT NULL, `delivery_date` DATE DEFAULT NULL, `delivery_time` TIME DEFAULT NULL,`order_status` TINYINT(4) DEFAULT NULL, `doc_upload_status` TINYINT(4) NOT NULL DEFAULT '0', `delivery_doc_uploaded` TINYINT(4) NOT NULL DEFAULT '0', `delivered_date` DATE DEFAULT NULL, `delivered_time` TIME DEFAULT NULL, `refund_amt` DOUBLE(10,2) DEFAULT NULL, `cancellation_charge` DOUBLE(10,2) DEFAULT NULL, `cancel_reason` VARCHAR(500) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const payment_mode = "CREATE TABLE IF NOT EXISTS `payment_mode`(`id` tinyint(4) NOT NULL AUTO_INCREMENT, `payment_mode` VARCHAR(50) NOT NULL, `is_active` tinyint(4) NOT NULL, PRIMARY KEY(id))";
const budget = "CREATE TABLE IF NOT EXISTS `budget`(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `customer_id` int(11) UNSIGNED NOT NULL, `work` double(10,2) DEFAULT NULL, `benefits` double(10,2) DEFAULT NULL, `accomodation` double(10,2) DEFAULT NULL, `childcare` double(10,2) DEFAULT NULL, `rent` double(10,2) DEFAULT NULL, `power` double(10,2) DEFAULT NULL, `landline_phone` double(10,2) DEFAULT NULL, `mobile_phone` double(10,2) DEFAULT NULL, `vehicle_finance` double(10,2) DEFAULT NULL, `vehicle_fuel` double(10,2) DEFAULT NULL, `public_transport` double(10,2) DEFAULT NULL, `food` double(10,2) DEFAULT NULL, `credit_store_cards` double(10,2) DEFAULT NULL, `loans_hire_purchase` double(10,2) DEFAULT NULL, `other_expenditure` TEXT DEFAULT NULL, `other_income` TEXT DEFAULT NULL, `pre_order_exp` double(10,2) DEFAULT NULL, `total_income` double(10,2) DEFAULT NULL, `total_expenditure`  double(10,2) DEFAULT NULL, `total_surplus` double(10,2) DEFAULT NULL, `afford_amt` double(10,2) DEFAULT NULL, `paid_day` VARCHAR(20) DEFAULT NULL, `debited_day` VARCHAR(20) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const flex_order = "CREATE TABLE IF NOT EXISTS `flex_order`(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `customer_id` int(11) UNSIGNED NOT NULL, `goods_rent_price` double(10,2) DEFAULT NULL, `ppsr_fee` double(10,2) DEFAULT NULL, `liability_fee` double(10,2) DEFAULT NULL, `weekly_total` double(10,2) DEFAULT NULL, `frequency` int(11) DEFAULT NULL, `first_payment` DATE DEFAULT NULL, `duration` INT(11) DEFAULT NULL, `each_payment_amt` double(10,2) DEFAULT NULL, `before_delivery_amt` double(10,2) DEFAULT NULL, `exp_delivery_date` DATE DEFAULT NULL, `exp_delivery_time` TIME DEFAULT NULL,  `bond_amt` double(10,2) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const fixed_order = "CREATE TABLE IF NOT EXISTS `fixed_order`(`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `customer_id` int(11) UNSIGNED NOT NULL, `int_unpaid_bal` double(10,2) DEFAULT NULL, `cash_price` double(10,2) DEFAULT NULL, `delivery_fee` double(10,2) DEFAULT NULL, `ppsr_fee` double(10,2) DEFAULT NULL, `liability_wavier_fee` double(10, 2) DEFAULT NULL, `frequency` int(11) DEFAULT NULL, `first_payment` DATE DEFAULT NULL, `last_payment` DATE DEFAULT NULL, `duration` INT(11) DEFAULT NULL, `no_of_payment` double(10,2) DEFAULT NULL, `each_payment_amt` double(10,2) DEFAULT NULL, `total_payment_amt` double(10,2) DEFAULT NULL, `before_delivery_amt` double(10,2) DEFAULT NULL, `exp_delivery_date` DATE DEFAULT NULL, `exp_delivery_time` TIME DEFAULT NULL, `minimum_payment_amt` double(10,2) DEFAULT NULL, `interest_rate` double(10,2) DEFAULT NULL, `interest_rate_per` double(10,2) DEFAULT NULL, `total_interest` double(10,2) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
const order_document = "CREATE TABLE IF NOT EXISTS `order_document`(`id` int(11) NOT NULL AUTO_INCREMENT, `order_id` int(11) NOT NULL, `document` varchar(255) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
// const payment_status = "CREATE TABLE IF NOT EXISTS `payment_status`(`id` bigint(20) NOT NULL AUTO_INCREMENT, `order_id` int(11) DEFAULT NULL, `customer_id` int(11) DEFAULT NULL, `installment_no` int(11) DEFAULT NULL, `sub_installment_no` TINYINT(4) NULL DEFAULT '0', `payment_date` varchar(50) DEFAULT NULL, `payment_rec_date` VARCHAR(50) DEFAULT NULL, `payment_amt` double DEFAULT NULL, `late_fee` DOUBLE(10,2) NULL DEFAULT '0', `interest_amt` DOUBLE(10,2) NULL DEFAULT '0', `total_paid` double DEFAULT NULL, `due_installment_amt` DOUBLE(10,2) DEFAULT NULL, `status` tinyint(4) DEFAULT NULL, `is_active` INT DEFAULT '1', `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const payment_status = "CREATE TABLE IF NOT EXISTS `payment_status`(`id` bigint(20) NOT NULL AUTO_INCREMENT, `order_id` int(11) DEFAULT NULL, `customer_id` int(11) DEFAULT NULL, `installment_no` int(11) DEFAULT NULL, `sub_installment_no` TINYINT(4) NULL DEFAULT '0', `payment_date` varchar(50) DEFAULT NULL, `payment_rec_date` VARCHAR(50) DEFAULT NULL, `payment_amt` double DEFAULT NULL, `total_paid` double DEFAULT NULL, `due_installment_amt` DOUBLE(10,2) DEFAULT NULL, `status` tinyint(4) DEFAULT NULL, `is_active` INT DEFAULT '1', `created_by` int(11) DEFAULT NULL, `updated_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const order_status = "CREATE TABLE IF NOT EXISTS `order_status`(`id` int(11) NOT NULL AUTO_INCREMENT, `order_status` varchar(50) NOT NULL, PRIMARY KEY(id))";
const delivery_document = "CREATE TABLE IF NOT EXISTS `delivery_document` (`id` INT(11) NOT NULL AUTO_INCREMENT, `order_id` INT(11) NOT NULL, `document` VARCHAR(255) DEFAULT NULL, `created_by` INT(11) DEFAULT NULL, `updated_by` INT(11) DEFAULT NULL, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const order_comment = "CREATE TABLE IF NOT EXISTS `order_comment` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `order_id` INT(11) DEFAULT NULL, `created_by` INT(11) DEFAULT NULL, `user_role` VARCHAR(50) DEFAULT NULL, `comment` TEXT DEFAULT NULL, `status` INT(11) DEFAULT NULL, `is_active` TINYINT(4) DEFAULT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (id))";
const comment_on_customer = "CREATE TABLE IF NOT EXISTS `comment_on_customer` (`id` int(11) NOT NULL AUTO_INCREMENT, `customer_id` int(11) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `comment` varchar(1000) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));"

const task = "CREATE TABLE IF NOT EXISTS `task` ( `id` int(10) NOT NULL AUTO_INCREMENT, `task_id` varchar(10) NOT NULL, `task_description` varchar(255) DEFAULT NULL, `is_active` tinyint(5) NOT NULL, `created_by` int(11) DEFAULT NULL, `creator_role` varchar(20) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));"
const taskActivity = "CREATE TABLE IF NOT EXISTS `task_activity` ( `id` int(11) NOT NULL AUTO_INCREMENT, `task_id` int(11) DEFAULT NULL, `assign_to` int(11) DEFAULT NULL, `assign_to_role` int(11) DEFAULT NULL, `description` varchar(500) DEFAULT NULL, `activity_status` int(11) DEFAULT NULL, `due_date` datetime DEFAULT NULL, `start_date` datetime DEFAULT NULL, `completed_date` datetime DEFAULT NULL, `reschedule_req_date` datetime DEFAULT NULL, `last_due_date` datetime DEFAULT NULL, `message_id` int(11) DEFAULT NULL, `document_id` int(11) DEFAULT NULL, `status` int(11) DEFAULT NULL, `is_active` int(11) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const taskStatus = "CREATE TABLE IF NOT EXISTS `task_status` ( `id` int(11) NOT NULL AUTO_INCREMENT, `status` varchar(50) NOT NULL, PRIMARY KEY(id))";
const taskActivityStatus = "CREATE TABLE IF NOT EXISTS `task_activity_status` ( `id` int(11) NOT NULL AUTO_INCREMENT, `activity` varchar(255) DEFAULT NULL, PRIMARY KEY(id))";
const taskDocument = "CREATE TABLE IF NOT EXISTS `task_document` ( `id` int(11) NOT NULL AUTO_INCREMENT,`task_id` int(11) DEFAULT NULL,`document` varchar(255) DEFAULT NULL,`status` int(11) DEFAULT NULL,`is_active` tinyint(4) DEFAULT NULL,`created_by` int(11) DEFAULT NULL,`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const taskMessage = "CREATE TABLE  IF NOT EXISTS `task_message` ( `id` int(11) NOT NULL AUTO_INCREMENT, `task_id` int(11) DEFAULT NULL, `message` varchar(500) DEFAULT NULL, `status` int(11) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";

const delivered_product_detail = "CREATE TABLE  IF NOT EXISTS `delivered_product_detail` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `order_id` INT(11) DEFAULT NULL , `customer_id` INT(11) DEFAULT NULL , `product_id` INT(11) DEFAULT NULL , `related_to` VARCHAR(50) DEFAULT NULL , `invoice_number` VARCHAR(25) DEFAULT NULL , `purchase_from` VARCHAR(255) DEFAULT NULL , `product_cost` DOUBLE(10,2) DEFAULT NULL , `product_color` VARCHAR(50) DEFAULT NULL , `color_id` INT DEFAULT NULL , `product_brand` VARCHAR(50) DEFAULT NULL , `brand_id` INT DEFAULT NULL , `delivery_date` DATETIME DEFAULT NULL , `specification` VARCHAR(1000) DEFAULT NULL , `status` INT DEFAULT NULL , `is_active` TINYINT(1) DEFAULT NULL , `created_by` INT DEFAULT NULL , `updated_by` INT DEFAULT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`));"
const customer_bank_detail = "CREATE TABLE IF NOT EXISTS  `customer_bank_detail` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `customer_id` INT(11) DEFAULT NULL, `acc_holder_name` VARCHAR(100) DEFAULT NULL , `bank_branch` VARCHAR(255) DEFAULT NULL , `bank_address` VARCHAR(255) DEFAULT NULL , `bank_code` INT DEFAULT NULL , `branch_number` INT DEFAULT NULL , `acc_number` INT(20) DEFAULT NULL , `suffix` INT DEFAULT NULL , `is_active` TINYINT(1) DEFAULT NULL , `status` TINYINT(4) DEFAULT NULL , `created_by` INT DEFAULT NULL , `updated_by` INT DEFAULT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`))";
const sales_type_list = "CREATE TABLE IF NOT EXISTS  `sales_type_list` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `sales_type_name` VARCHAR(100) DEFAULT NULL , `is_active` TINYINT(1) DEFAULT NULL , `created_by` INT DEFAULT NULL , `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`));"
const renting_for_list = "CREATE TABLE IF NOT EXISTS `renting_for_list` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `renting_for_name` VARCHAR(100) DEFAULT NULL , `is_active` TINYINT DEFAULT NULL , `created_by` INT DEFAULT NULL , `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`));"
const budget_comment = "CREATE TABLE IF NOT EXISTS `budget_comment` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `customer_id` INT DEFAULT NULL, `order_id` INT DEFAULT NULL, `budget_id` INT DEFAULT NULL , `comment` VARCHAR(1000) DEFAULT NULL , `is_active` TINYINT(1) DEFAULT NULL , `created_by` INT DEFAULT NULL , `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`));"
const payments = "CREATE TABLE IF NOT EXISTS `payments` (`id` int(11) NOT NULL AUTO_INCREMENT, `bankFailedReason` text NOT NULL, `bankReceiptID` varchar(50) NOT NULL, `bankReturnCode` varchar(5) NOT NULL, `customerName` varchar(100) NOT NULL, `debitDate` datetime NOT NULL, `eziDebitCustomerID` varchar(10) NOT NULL, `invoiceID` varchar(10) NOT NULL, `paymentAmount` double NOT NULL, `paymentID` varchar(10) NOT NULL, `paymentMethod` varchar(3) NOT NULL, `paymentReference` varchar(50) NOT NULL, `paymentSource` varchar(10) NOT NULL, `paymentStatus` varchar(2) NOT NULL, `settlementDate` datetime NOT NULL, `scheduledAmount` double NOT NULL, `transactionFeeClient` double NOT NULL, `transactionFeeCustomer` double NOT NULL, `transactionTime` time NOT NULL, `yourGeneralReference` varchar(50) NOT NULL, `yourSystemReference` varchar(50) NOT NULL, `status` int(11) DEFAULT NULL, `is_active` int(11) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const paymentstatus = "CREATE TABLE IF NOT EXISTS `paymentstatus` (`id` int(11) NOT NULL AUTO_INCREMENT, `paymentReference` varchar(50) NOT NULL, `data` varchar(2) NOT NULL, `error` varchar(500) NOT NULL, `errorMessage` text NOT NULL, `is_active` int(11) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";
const payment_schedule = "CREATE TABLE IF NOT EXISTS `payment_schedule` (`id` int(11) NOT NULL AUTO_INCREMENT, `order_id` int(11) DEFAULT NULL, `customer_id` int(11) DEFAULT NULL, `installment_no` int(11) DEFAULT NULL, `payment_date` datetime DEFAULT NULL, `status` int(11) DEFAULT NULL, `is_active` int(11) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))";





// const document_for_payment = "CREATE TABLE IF NOT EXISTS `document_for_payment` ( `id` int(11) NOT NULL AUTO_INCREMENT, `customer_id` int(11) DEFAULT NULL, `order_id` int(11) DEFAULT NULL, `installment_no` int(11) DEFAULT NULL, `sub_installment_no` int(11) DEFAULT NULL, `document` varchar(500) DEFAULT NULL, `status` tinyint(4) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,  PRIMARY KEY (`id`));";
// const comment_on_payment = "CREATE TABLE IF NOT EXISTS `comment_on_payment` (`id` int(11) NOT NULL, `customer_id` int(11) DEFAULT NULL, `order_id` int(11) DEFAULT NULL, `installment_no` int(11) DEFAULT NULL, `sub_installment_no` int(11) DEFAULT NULL, `comment` text, `status` tinyint(4) DEFAULT NULL, `is_active` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `created_by` int(11) DEFAULT NULL, PRIMARY KEY (`id`));";
// const transaction = "CREATE TABLE IF NOT EXISTS `transaction` (`id` int(11) NOT NULL, `customer_id` int(11) DEFAULT NULL, `order_id` int(11) DEFAULT NULL, `transaction_date` datetime DEFAULT NULL, `transaction_amt` double(10,2) DEFAULT NULL, `late_fee` double(10,2) DEFAULT NULL, `interest_amt` double(10,2) DEFAULT NULL, `status` int(11) DEFAULT NULL, `is_active` tinyint(1) DEFAULT NULL, `created_by` int(11) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,  PRIMARY KEY (`id`));";


// const leads = "CREATE TABLE  IF NOT EXISTS `leads` (`id` int(10) NOT NULL AUTO_INCREMENT,`lead_id` varchar(255) , `franchise_id` int(10) NOT NULL,  `message` TEXT DEFAULT NULL, `document` TEXT DEFAULT NULL, `converted_to` varchar(255)  DEFAULT NULL,`is_active` tinyint(4) DEFAULT NULL, `created_by` tinyint(4) DEFAULT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";

Franchise.prototype.register = function (newUser) {
  const that = this;
  return new Promise(function (resolve, reject) {
    const frachiseDbName = dbName.getFullName(dbName["prod"], that.city.substring(0, 2).toLowerCase() + that.suburb.substring(0, 2).toLowerCase());
    // console.log("franchise database name..........", frachiseDbName)

    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      else if (!error) {
        connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', frachiseDbName, function (error, rows, fields) {
          if (rows.length === 0) {

            connection.query('CREATE DATABASE IF NOT EXISTS ??', frachiseDbName, function (error, rows, fields) {
              if (!error) {
                connection.changeUser({ database: frachiseDbName });
                // connection.query(user,role,userRole,staff,task,taskAssign,customer,customer_income,customer_state,idProof,enquiry,orders,budget,payment_mode,flex_order,fixed_order,order_document,payment_status,order_status, function (err) {});
                let values1 = [
                  [2, 'Admin', 1, 1],
                  [3, 'CSR', 1, 1],
                  [4, 'Finance', 1, 1],
                  [5, 'Delivery', 1, 1],
                  [6, 'HR', 1, 1],
                  [7, 'S&M', 1, 1]
                ]

                let idTypeData = [
                  [1, 'Passport', 1, 1],
                  [2, 'Driving Licence', 1, 1],
                  [3, 'Medicare', 1, 1]
                ]

                let cust_state = [
                  [1, 'Active', 1],
                  [2, 'Hold', 1],
                  [3, 'Financial Hardship', 1]
                ]


                let pay_mode = [
                  [1, 'EasyPay', 1],
                  [2, 'Credit', 1],
                  [3, 'Debit', 1],
                  [4, 'PayPal', 1],
                  [5, 'Cash', 1],
                ]

                let order_status_data = [
                  [1, 'Created'],
                  [2, 'In Progress'],
                  [3, 'Awaiting Payment'],
                  [4, 'Ready to Deliver'],
                  [5, 'Under Delivery'],
                  [6, 'Delivered'],
                  [7, 'Awaiting Remaining'],
                  [8, 'Completed'],
                  [9, 'Cancelled by Rentronics'],
                  [10, 'Cancelled by Customer'],
                ]

                let task_status_data = [
                  [1, 'Scheduled'],
                  [2, 'In-Progress'],
                  [3, 'Request to Reschedule'],
                  [4, 'Rescheduled'],
                  [5, 'Assign to Other'],
                  [6, 'Completed'],
                  [7, 'Deleted'],                  
                ]

                let task_activity_status_data = [                  
                  [1, 'New Task Created'],
                  [2, 'Task Description Changed'],
                  [3, 'Task has been started by Assignee'],
                  [4, 'Task assigned to other person'],
                  [5, 'Due date changed by Task Creator'],
                  [6, 'New message or document added'],
                  [7, 'Request to Reschedule'],
                  [8, 'Task rescheduled'],
                  [9, 'Task completed'],
                ]
                
                let sales_type_list_data = [
                  [1, 'Internet', 1],
                  [2, 'Walk-in', 1],
                  [3, 'Reference', 1],
                  [4, 'Existing', 1],
                  [5, 'Phone Sales', 1],
                  [6, 'Door 2 Door (D2D)', 1],
                  [7, 'Paid Leads', 1],
                ]

                let renting_for_list_data = [
                  [1, 'Personal Use', 1],
                  [2, 'Liesure', 1],
                  [3, 'Family', 1],
                  [4, 'Gift', 1],
                  [5, 'Essential', 1],
                  [6, 'Other', 1],
                ]
                
                
                connection.query(role, function (err) { if (err) { console.log('Role Table Create Time Error: ', err) } });
                connection.query(user, function (err) { if (err) { console.log('user Table Create Time Error: ', err) } });
                connection.query(userRole, function (err) { if (err) { console.log('UserRole Table Create Time Error: ', err) } });
                connection.query(staff, function (err) { if (err) { console.log('Staff Table Create Time Error: ', err) } });                
                connection.query(customer, function (err) { if (err) { console.log('Customer Table Create Time Error: ', err) } });
                connection.query(customer_income, function (err) { if (err) { console.log('Customer Income Table Create Time Error: ', err) } });
                connection.query(customer_state, function (err) { if (err) { console.log('Customer State Table Create Time Error: ', err) } });
                connection.query(idProof, function (err) { if (err) { console.log('IdProof Table Create Time Error: ', err) } });
                connection.query(enquiry, function (err) { if (err) { console.log('Enquiry Table Create Time Error: ', err) } });
                connection.query(orders, function (err) { if (err) { console.log('Order Table Create Time Error: ', err) } });
                connection.query(budget, function (err) { if (err) { console.log('Budget Table Create Time Error: ', err) } });
                connection.query(payment_mode, function (err) { if (err) { console.log('Payment Mode Table Create Time Error: ', err) } });
                connection.query(flex_order, function (err) { if (err) { console.log('Flex_order Table Create Time Error: ', err) } });
                connection.query(fixed_order, function (err) { if (err) { console.log('Fixed Order Table Create Time Error: ', err) } });
                connection.query(order_document, function (err) { if (err) { console.log('Order Document Table Create Time Error: ', err) } });
                connection.query(payment_status, function (err) { if (err) { console.log('Payment Status Table Create Time Error: ', err) } });
                connection.query(order_status, function (err) { if (err) { console.log('Order Status Table Create Time Error: ', err) } });
                connection.query(delivery_document, function (err) { if (err) { console.log('Delivery Document Table Create Time Error: ', err) } });
                connection.query(order_comment, function (err) { if (err) { console.log('Order Comment Table Create Time Error: ', err) } });
                connection.query(taskStatus, function (err) { if (err) { console.log('Task Status Table Create Time Error: ', err) } });
                connection.query(task, function (err) { if (err) { console.log('Task Table Create Time Error: ', err) } });
                connection.query(taskActivity, function (err) { if (err) { console.log('Task Activity Table Create Time Error: ', err) } });
                connection.query(taskActivityStatus, function (err) { if (err) { console.log('Task Activity Status Table Create Time Error: ', err) } });
                connection.query(taskDocument, function (err) { if (err) { console.log('Task Document Table Create Time Error: ', err) } });
                connection.query(taskMessage, function (err) { if (err) { console.log('Task Message Table Create Time Error: ', err) } });
                connection.query(comment_on_customer, function (err) { if (err) { console.log('comment_on_customer Table Create Time Error: ', err) } });
                connection.query(delivered_product_detail, function (err) { if (err) { console.log('delivered_product_detail Table Create Time Error: ', err) } });
                connection.query(customer_bank_detail, function (err) { if (err) { console.log('customer_bank_detail Table Create Time Error: ', err) } });
                connection.query(sales_type_list, function (err) { if (err) { console.log('sales_type_list Table Create Time Error: ', err) } });
                connection.query(renting_for_list, function (err) { if (err) { console.log('renting_for_list Table Create Time Error: ', err) } });
                connection.query(budget_comment, function (err) { if (err) { console.log('budget_comment Table Create Time Error: ', err) } });
                connection.query(payments, function (err) { if (err) { console.log('payments Table Create Time Error: ', err) } });
                connection.query(paymentstatus, function (err) { if (err) { console.log('paymentStatus Table Create Time Error: ', err) } });
                connection.query(payment_schedule, function (err) { if (err) { console.log('payment_schedule Table Create Time Error: ', err) } });
                
                // connection.query(document_for_payment, function (err) { if (err) { console.log('document_for_payment Table Create Time Error: ', err) } });
                // connection.query(comment_on_payment, function (err) { if (err) { console.log('comment_on_payment Table Create Time Error: ', err) } });
                // connection.query(transaction, function (err) { if (err) { console.log('transaction Table Create Time Error: ', err) } });
                
                connection.query('INSERT INTO `role`(`id`, `name`, `state`, `created_by`) VALUES ?', [values1], function (error, rows, fields) { if (error) { console.log('Role Insert Time Error: ', error) } });
                connection.query('INSERT INTO `id_type`(`id`, `name`, `is_active`, `created_by`) VALUES ?', [idTypeData], function (error, rows, fields) { if (error) { console.log('IdType Insert Time Error: ', error) } });
                connection.query('INSERT INTO `customer_state`(`id`, `state_name`, `is_active`) VALUES ?', [cust_state], function (error, rows, fields) { if (error) { console.log('Customer State Insert Time Error: ', error) } });
                connection.query('INSERT INTO `payment_mode`(`id`, `payment_mode`, `is_active`) VALUES ?', [pay_mode], function (error, rows, fields) { if (error) { console.log('Payment Mode Insert Time Error: ', error) } });
                connection.query('INSERT INTO `order_status`(`id`, `order_status`) VALUES ?', [order_status_data], function (error, rows, fields) { if (error) { console.log('Order Status Insert Time Error: ', error) } });
                connection.query('INSERT INTO `task_status`(`id`, `status`) VALUES ?', [task_status_data], function (error, rows, fields) { if (error) { console.log('Task Status Insert Time Error: ', error) } });
                connection.query('INSERT INTO `task_activity_status`(`id`, `activity`) VALUES ?', [task_activity_status_data], function (error, rows, fields) { if (error) { console.log('Task Activity Status Insert Time Error: ', error) } });
                connection.query('INSERT INTO `sales_type_list`(`id`, `sales_type_name`, `is_active`) VALUES ?', [sales_type_list_data], function (error, rows, fields) { if (error) { console.log('sales_type_list_data Insert Time Error: ', error) } });
                connection.query('INSERT INTO `renting_for_list`(`id`, `renting_for_name`, `is_active`) VALUES ?', [renting_for_list_data], function (error, rows, fields) { if (error) { console.log('renting_for_list_data Insert Time Error: ', error) } });


                connection.changeUser({ database: dbName["prod"] });
                connection.query('INSERT INTO franchise(name,fdbname,city,city_code,suburb,abn,state,created_by,company_id) VALUES ( "' + that.name + '", "' + frachiseDbName + '", "' + that.city + '", "' + that.city_code + '", "' + that.suburb + '", "' + that.abn + '", "' + that.state + '", "' + that.created_by + '", "' + that.company_id + '")', function (error, rows, fields) {

                  if (!error) {
                    let franchise_id = rows.insertId;
                    resolve({ franchise_id: franchise_id, fdbname: frachiseDbName, isExist: 0 });
                  } else {
                    console.log("Error...", error);
                    reject(error);
                  }
                });

                connection.release();
                console.log('Process Complete %d', connection.threadId);
              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
          } else {
            connection.changeUser({ database: dbName["prod"] });
            connection.query('SELECT id from franchise where fdbname = ?', frachiseDbName, function (error, rows, fields) {
              console.log("Frachise DB already exists............", rows);
              if (!error) {
                resolve({ franchise_id: rows[0].id, fdbname: frachiseDbName, isExist: 1 });
              } else {
                console.log("Error...", error);
                reject(error);
              }
            });
          }
        });

      } else {
        console.log("Error...", error);
        reject(error);
      }


    });
  }).catch((error) => {
    console.log("error....", error);
    throw error;
  });
};




































Franchise.prototype.update = function () {
  const that = this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        throw error;
      }

      let values = [that.uid, that.name, that.city, that.city_code, that.suburb, that.abn, that.state, that.f_id];

      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('update franchise set name = "' + that.name + '", city= "' + that.city + '", suburb = "' + that.suburb + '", abn ="' + that.abn + '", state ="' + that.state + '"  WHERE id = "' + that.f_id + '"', function (error, rows, fields) {
          if (!error) {
            // connection.query('select company_id from franchise where id="' + that.f_id + '"', function (error, rows, fields){
            // if (!error) {
            resolve(rows);
            // }
            // })
          } else {
            console.log('Error...', error);
            reject(error);
          }
        });

      } else {
        console.log('Error...', error);
        reject(error);
      }

      connection.release();
      console.log('Process Complete %d', connection.threadId);
    });
  }).catch(error => {
    throw error;
  });

};



Franchise.prototype.verifyEmail = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      if (!error) {
        connection.changeUser({ database: dbName["prod"] });
        connection.query('select u.id as `u_id`, c.id as `director_id`, c.director, c.email, u.user_id from company as c INNER JOIN user as u on c.id = u.director_id WHERE c.email = "' + that.email + '" AND u.status = 1', function (error, rows, fields) {
          if (!error) {
            if (rows.length === 0) {
              connection.query('select email from accountant where email = "' + that.email + '"', function (error, rows, fields) {
                if (!error) {
                  if (rows.length === 0) {
                    connection.query('select email from master_staff where email = "' + that.email + '"', function (error, rows, fields) {
                      if (!error) {
                        if (rows.length === 0) {
                          connection.query('select fdbname from franchise', function (error, rows, fields) {
                            if (!error) {
                              if (rows.length > 0) {

                                (rows.length > 0 ? rows : []).map((dbname, index) => {
                                  connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', dbname.fdbname, function (error, rows, fields) {
                                    if (rows.length > 0) {
                                      // console.log('fdbname map---',dbname.fdbname);
                                      connection.changeUser({ database: dbname.fdbname });
                                      connection.query('select email from staff where email = "' + that.email + '"', function (error, rows, fields) {
                                        if (!error) {
                                          if (rows.length === 0) {
                                            connection.query('select email from customer where email = "' + that.email + '"', function (error, rows, fields) {
                                              if (!error) {
                                                if (rows.length === 0) {
                                                  connection.query('select employer_email from customer_income where employer_email = "' + that.email + '"', function (error, rows, fields) {
                                                    if (!error) {
                                                      resolve(rows);
                                                    } else {
                                                      console.log("Error...", error);
                                                      reject(error);
                                                    }
                                                  });
                                                } else {
                                                  resolve(rows);
                                                }
                                              } else {
                                                console.log("Error...", error);
                                                reject(error);
                                              }
                                            });
                                          } else {
                                            resolve(rows);
                                          }
                                        } else {
                                          console.log("Error...", error);
                                          reject(error);
                                        }
                                      })
                                    }
                                  });
                                });
                              } else {
                                resolve(rows);
                              }
                            } else {
                              console.log("Error...", error);
                              reject(error);
                            }
                          });
                        } else {
                          resolve(rows);
                        }
                      } else {
                        console.log("Error...", error);
                        reject(error);
                      }
                    });
                  } else {
                    resolve(rows);
                  }
                } else {
                  console.log("Error...", error);
                  reject(error);
                }
              });
            } else {
              resolve(rows);
            }
          } else {
            console.log("Error...", error);
            reject(error);
          }
        });
        // connection.query('select u.id as `u_id`, c.id as `director_id`, c.director, c.email, u.user_id from company as c INNER JOIN user as u on c.id = u.director_id WHERE c.email = "'+that.email+'" AND u.status = 0', function (error, rows, fields) {
        //   if (!error) {
        //     (rows.length > 0 ? rows : []).map((data,index) => { 
        //       connection.query('update user set token = "", account_id = "" where id = '+data.u_id+' ', function (error, rows, fields) {
        //         if (!error) {
        //           console.log(rows);
        //           if(!rows[0]){
        //             resolve(rows);
        //               console.log('okkk');
        //           }
        //         }else {
        //           console.log("Error...", error);
        //           reject(error);
        //         }
        //       })
        //     });
        //   // }
        // } else {
        //     console.log("Error...", error);
        //     reject(error);
        //   }
        // });
      }
      connection.release();
      console.log('Process Complete %d', connection.threadId);

    });
  });
}




Franchise.prototype.all = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      // console.log('Process Started %d All', connection.threadId);

      if (error) {
        throw error;
      }

      connection.changeUser({ database: dbName["prod"] });
      connection.query('SELECT u.franchise_id, u.director_id, u.user_id, AES_DECRYPT(`password`, \'secret\') AS password, u.designation, u.role_id, u.is_active, c.name as company_name, c.nbzn, c.location as company_location, c.director, c.email, c.contact, c.alt_contact, c.website, c.accountant_id, f.name as franchise_name, f.company_id, f.city, f.city_code, f.suburb, f.state, a.name as accountant_name, a.email as accountant_email, a.contact as accountant_contact from user u INNER JOIN company c on u.director_id = c.id INNER JOIN franchise f on u.franchise_id = f.id INNER JOIN accountant a on c.accountant_id = a.id order by f.id desc', function (error, rows, fields) {
        if (!error) {
          let datas = [];
          (rows && rows.length > 0 ? rows : []).map(data => {
            let pass = data.password.toString('utf8');
            data.password = pass;
            // console.log('passss',data);
            datas.push(data);
          });
          resolve(datas);
        } else {
          console.log("Error...", error);
          reject(error);
        }

        connection.release();
        console.log('Process Complete %d', connection.threadId);
      });
    });
  });
}

module.exports = Franchise;