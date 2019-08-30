import { validString, validNumber, validEmail } from './Regex';

export default function validate(values) {
  let errors = {};
  
  if (!values.payment_mode) {
    errors.payment_mode = 'Payment Mode is required';
  }
  // if (!values.work && values.work!=0) {
  //   errors.work = 'Work is required';
  // } else if (!validNumber.test(values.work)) {
  //   errors.work = 'Work is invalid';
  // } 
  // if (!values.order_date) {
  //   errors.order_date = 'Order Date is required';
  // } 
   if (!values.customer_type) {
    errors.customer_type = 'Customer is required';
  } 
  if (!values.main_category) {
    errors.main_category = 'Main Category is required';
  }
  
  if (!values.category) {
    errors.category = 'Category is required';
  }
  if (!values.sub_category) {
    errors.sub_category = 'Sub Category is required';
  }
  if (!values.product) {
    errors.product = 'Product is required';
  }
  if (!values.order_type) {
    errors.order_type = 'Order Type is required';
  }
  return errors;
};