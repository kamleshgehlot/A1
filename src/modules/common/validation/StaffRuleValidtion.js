import { validString } from './Regex';

export default function validate(values) {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = 'First Name is required';
  } else if (!validString.test(values.first_name)) {
    errors.first_name = 'First Name is invalid';
  }
  
  return errors;
};