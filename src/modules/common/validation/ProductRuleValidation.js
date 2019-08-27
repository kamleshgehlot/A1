import { validString, validNumber, validEmail } from './Regex';

export default function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Product Title/Name is required';
  } else if (!validString.test(values.name)) {
    errors.name = 'Product Title/Name is invalid';
  }

  if (!values.color_id) {
    errors.color_id = 'Color is required';
  } 
  
  if (!values.brand_id) {
    errors.brand_id = 'Brand is required';
  } 

  if (!values.buying_price) {
    errors.buying_price = 'Product Buying Price is required';
  } else if (!validNumber.test(values.buying_price)) {
    errors.buying_price = 'Product Buying Price is invalid';
  }
  if (!values.description) {
    errors.description = 'Product Description is required';
  }

  if (!values.specification) {
    errors.specification = 'Product Specification is required';
  }
  
  if (!values.brought) {
    errors.brought = 'Brought From is required';
  }
  
  if (!values.invoice) {
    errors.invoice = 'Invoice Number is required';
  }
  
  // if (!values.meta_keywords) {
  //   errors.meta_keywords = 'Meta Keywords is required';
  // }
  // if (!values.meta_description) {
  //   errors.meta_description = 'Meta Description is required';
  // }
  
  if (!values.rental) {
    errors.rental = 'Rental Price is required';
  } else if (!validNumber.test(values.rental)) {
    errors.rental = 'Rental Price is invalid';
  }
  if (!values.status) {
    errors.status = 'Status is required';
  } 

  return errors;
};