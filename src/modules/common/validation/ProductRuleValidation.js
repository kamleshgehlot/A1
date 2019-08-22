import { validString, validNumber, validEmail } from './Regex';

export default function validate(values) {
  let errors = {};
  if (!values.productname) {
    errors.productname = 'Product Title/Name is required';
  } else if (!validString.test(values.productname)) {
    errors.productname = 'Product Title/Name is invalid';
  }

  if (!values.color) {
    errors.color = 'Color is required';
  } 
  
  if (!values.brand) {
    errors.brand = 'Brand is required';
  } 

  if (!values.productprice) {
    errors.productprice = 'Product Buying Price is required';
  } else if (!validNumber.test(values.productprice)) {
    errors.productprice = 'Product Buying Price is invalid';
  }
  if (!values.description) {
    errors.description = 'Product Description is required';
  }

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