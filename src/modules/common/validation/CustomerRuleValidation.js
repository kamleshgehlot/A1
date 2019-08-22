import { validString, validNumber, validEmail } from './Regex';

export default function validate(values) {
  let errors = {};
  if (!values.customer_name) {
    errors.customer_name = 'Full Name is required';
  } else if (!validString.test(values.customer_name)) {
    errors.customer_name = 'Full Name is invalid';
  }

  if (!values.address) {
    errors.address = 'Address is required';
  }
  
  if (!values.city) {
    errors.city = 'City is required';
  } else if (!validString.test(values.city)) {
    errors.city = 'City is invalid';
  }
  
  if (!values.postcode) {
    errors.postcode = 'Postcode is required';
  } else if (!validNumber.test(values.postcode)) {
    errors.postcode = 'Postcode is invalid';
  }

  if (!values.telephone) {
    errors.telephone = 'Telephone is required';
  } else if (!validNumber.test(values.telephone)) {
    errors.telephone = 'Telephone is invalid';
  }
  
  if (!values.mobile) {
    errors.mobile = 'Mobile is required';
  } else if (!validNumber.test(values.mobile)) {
    errors.mobile = 'Mobile is invalid';
  }
  
  if (!values.email) {
    errors.email = 'Email Address is required';
  } else if (!validEmail.test(values.email)) {
    errors.email = 'Email Address is invalid';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required';
  }
  if (!values.dob) {
    errors.dob = 'Date Of Birth is required';
  }
  
  if (!values.id_type) {
    errors.id_type = 'ID Proof is required';
  }
  
  if (!values.id_number) {
    errors.id_number = 'ID is required';
  }
  if (!values.expiry_date) {
    errors.expiry_date = 'Expiry Date is required';
  }
  
  if (!values.alt_c1_name) {
    errors.alt_c1_name = 'Name is required';
  } else if (!validString.test(values.alt_c1_name)) {
    errors.alt_c1_name = 'Name is invalid';
  }

  if (!values.alt_c1_address) {
    errors.alt_c1_address = 'Address is required';
  } 

  if (!values.alt_c1_contact) {
    errors.alt_c1_contact = 'Contact is required';
  } else if (!validNumber.test(values.alt_c1_contact)) {
    errors.alt_c1_contact = 'Contact is invalid';
  }
  
  if (!values.alt_c1_relation) {
    errors.alt_c1_relation = 'Relationship is required';
  } else if (!validString.test(values.alt_c1_relation)) {
    errors.alt_c1_relation = 'Relationship is invalid';
  }
  
  if (!values.alt_c2_name) {
    errors.alt_c2_name = 'Name is required';
  } else if (!validString.test(values.alt_c2_name)) {
    errors.alt_c2_name = 'Name is invalid';
  }
  
  if (!values.alt_c2_address) {
    errors.alt_c2_address = 'Address is required';
  } 

  if (!values.alt_c2_contact) {
    errors.alt_c2_contact = 'Contact is required';
  } else if (!validNumber.test(values.alt_c2_contact)) {
    errors.alt_c2_contact = 'Contact is invalid';
  }
  
  if (!values.alt_c2_relation) {
    errors.alt_c2_relation = 'Relationship is required';
  } else if (!validString.test(values.alt_c2_relation)) {
    errors.alt_c2_relation = 'Relationship is invalid';
  }
  
  if (!values.employer_name) {
    errors.employer_name = 'Employer Name is required';
  } else if (!validString.test(values.employer_name)) {
    errors.employer_name = 'Employer Name is invalid';
  }
  
  if (!values.employer_address) {
    errors.employer_address = 'Address is required';
  } 
  
  if (!values.employer_telephone) {
    errors.employer_telephone = 'Contact is required';
  } else if (!validNumber.test(values.employer_telephone)) {
    errors.employer_telephone = 'Contact is invalid';
  }

  
  if (!values.employer_email) {
    errors.employer_email = 'Email is required';
  } else if (!validEmail.test(values.employer_email)) {
    errors.employer_email = 'Email is invalid';
  }
 
  if (!values.employer_tenure) {
    errors.employer_tenure = 'Tenure of Employer is required';
  } 

  
  return errors;
};