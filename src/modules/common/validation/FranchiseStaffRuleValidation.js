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
  // else if (!validString.test(values.last_name)) {
  //   errors.last_name = 'Last Name is invalid';
  // }
  
  if (!values.location) {
    errors.location = 'Location is required';
  } 

  if (!values.contact) {
    errors.contact = 'Contact number is required';
  } else if (!validNumber.test(values.contact)) {
    errors.contact = 'Contact number is invalid';
  } else if ((values.contact).length<10) {
    errors.contact = 'Contact number is invalid';
  }
  
  if (!values.email) {
    errors.email = 'Email Address is required';
  } else if (!validEmail.test(values.email)) {
    errors.email = 'Email Address is invalid';
  }

  // if (!values.assignRole) {
  //   errors.assignRole = 'Assign Role is required';
  // }

  if (!values.pre_company_name) {
    errors.pre_company_name = 'Name of Previous Company is required';
  } 
  if (!values.pre_company_address) {
    errors.pre_company_address = 'Address of Previous Company is required';
  } 
  if (!values.pre_company_contact) {
    errors.pre_company_contact = 'Contact of Previous Company is required';
  } else if (!validNumber.test(values.pre_company_contact)) {
    errors.pre_company_contact = 'Contact of Previous Company is invalid';
  } else if ((values.pre_company_contact).length<10) {
    errors.pre_company_contact = 'Contact of Previous Company is invalid';
  }
  if (!values.pre_position) {
    errors.pre_position = 'Position/JobRole is required';
  } else if (!validString.test(values.first_name)) {
    errors.first_name = 'First Name is invalid';
  }
  if (!values.duration) {
    errors.duration = 'Work Experience is required';
  }  else if (!validAlpha.test(values.duration)) {
    errors.duration = 'Work Experience is invalid';
  }
  if (!values.password) {
    errors.password = 'Click here to get Password';
  } 
  
  return errors;
};