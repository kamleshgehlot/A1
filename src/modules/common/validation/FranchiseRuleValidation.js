import { validString, validNumber, validEmail, validAlpha } from './Regex';

export default function validate(values) {
  let errors = {};
  
  if (!values.franchise_name) {
    errors.franchise_name = 'Franchise Name is required';
  }else if(!validAlpha.test(values.franchise_name)){
    errors.franchise_name = 'Franchise Name is invalid';
  }

  if (!values.city) {
    errors.city = 'City is required';
  }
  if (!values.suburb) {
    errors.suburb = 'Area is required';
  }
  if (!values.company_name) {
    errors.company_name = 'Company Name is required';
  } else if (!validAlpha.test(values.company_name)) {
    errors.company_name = 'Company Name is invalid';
  }
  if (!values.nbzn) {
    errors.nbzn = 'NBZN is required';
  }
  if (!values.company_location) {
    errors.company_location = 'Company Location is required';
  }
  
  if (!values.accountant_name) {
    errors.accountant_name = 'Name is required';
  } else if (!validString.test(values.accountant_name)) {
    errors.accountant_name = 'Name is invalid';
  }
  if (!values.accountant_email) {
    errors.accountant_email = 'Email Address is required';
  } else if (!validEmail.test(values.accountant_email)) {
    errors.accountant_email = 'Email Address is invalid';
  }

  if (!values.accountant_contact) {
    errors.accountant_contact = 'Contact number is required';
  } else if (!validNumber.test(values.accountant_contact)) {
    errors.accountant_contact = 'Contact number is invalid';
  } else if ((values.accountant_contact).length<10) {
    errors.accountant_contact = 'Contact number is invalid';
  }
  
  return errors;
};