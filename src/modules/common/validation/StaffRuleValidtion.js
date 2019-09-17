import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = 'First Name is required';
  } else if (!validString.test(values.first_name)) {
    errors.first_name = 'First Name is invalid';
  }

  if (!values.last_name) {
    errors.last_name = 'Last Name is required';
  } else if (!validString.test(values.last_name)) {
    errors.last_name = 'Last Name is invalid';
  }
  
  console.log('len----',(values.contact).length)
  if (!values.location) {
    errors.location = 'Location is required';
  } 
  if (!values.contact) {
    errors.contact = 'Contact is required';
  } else if (!validNumber.test(values.contact)) {
    errors.contact = 'Contact is invalid';
  } else if ((values.contact).length<9) {
    errors.contact = 'Contact is invalid';
  }
  
  if (!values.email) {
    errors.email = 'Email Address is required';
  } else if (!validEmail.test(values.email)) {
    errors.email = 'Email Address is invalid';
  }

  if (!values.password) {
    errors.password = 'Click here to get Password';
  } 
  if (!values.position) {
    errors.position = 'Position is required';
  }

  return errors;
};