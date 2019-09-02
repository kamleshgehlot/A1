import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  if (values.franchise_id=="") {
    errors.franchise_id = 'Franchise is required';
  }
  if (!values.description) {
    errors.description = 'Description is required';
  } 
  return errors;
};