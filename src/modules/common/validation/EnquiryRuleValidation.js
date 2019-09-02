import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  if (!values.customer_name) {
    errors.customer_name = 'Customer Name is required';
  } else if (!validString.test(values.customer_name)) {
    errors.customer_name = 'Customer Name is invalid';
  }
  

  if (!values.contact) {
    errors.contact = 'Contact number is required';
  } else if (!validNumber.test(values.contact)) {
    errors.contact = 'Contact number is invalid';
  } else if ((values.contact).length<10) {
    errors.contact = 'Contact number is invalid';
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
  
  return errors;
};