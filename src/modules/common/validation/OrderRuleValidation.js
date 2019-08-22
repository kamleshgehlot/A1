import { validString, validNumber, validEmail } from './Regex';

export default function validate(values) {
  let errors = {};
  
  if (!values.payment_mode) {
    errors.payment_mode = 'Payment Mode is required';
  }
  if (!values.work && values.work!=0) {
    errors.work = 'Work is required';
  } else if (!validNumber.test(values.work)) {
    errors.work = 'Work is invalid';
  }
  
  return errors;
};