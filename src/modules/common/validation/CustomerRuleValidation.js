import { validString, validNumber, validFullLengthDecimalNumber, validEmail, validAlpha } from './Regex';
import {checkFutureDate, checkPastDate} from '../../../utils/datetime.js';

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

  if (!values.address) {
    errors.address = 'Address is required';
  }

  if (!values.suburb) {
    errors.suburb = 'Suburb is required';
  } else if (!validString.test(values.suburb)) {
    errors.suburb = 'Suburb is invalid';
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

  if (values.telephone) {
    if (!validNumber.test(values.telephone)) {
      errors.telephone = 'Telephone number is invalid';
    } else if ((values.telephone).length<9) {
      errors.telephone = 'Telephone number is invalid';
    } 
  }
  
  if (!values.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!validNumber.test(values.mobile)) {
    errors.mobile = 'Mobile number is invalid';
  } else if ((values.mobile).length<9) {
    errors.mobile = 'Mobile number is invalid';
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
  }else if(checkPastDate(values.dob)){
    errors.dob = 'Date of Birth is invalid';
  }
  
  if (values.id_type==='' ) {
    errors.id_type = 'ID Proof is required';
  }
  if(values.id_type===0){    
    if (!values.other_id_type) {
      errors.other_id_type = 'ID Type is required';
    }
  }

  if(values.id_type==2){
    if (!values.dl_version_number) {
      errors.dl_version_number = 'Version number is required';
    }else if( (values.dl_version_number).length <3 ){
      errors.dl_version_number = 'Version number is invalid';
    }
  }

  if (!values.id_number) {
    errors.id_number = 'ID is required';
  }

  if (!values.is_working) {
    errors.is_working = 'Required';
  }

  if (!values.expiry_date) {
    errors.expiry_date = 'Expiry Date is required';
  }else if(checkFutureDate(values.expiry_date)){
    errors.expiry_date = 'Expiry Date is invalid';
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
    errors.alt_c1_contact = 'Contact number is required';
  } else if (!validNumber.test(values.alt_c1_contact)) {
    errors.alt_c1_contact = 'Contact number is invalid';
  } else if ((values.alt_c1_contact).length<9) {
    errors.alt_c1_contact = 'Contact number is invalid';
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
    errors.alt_c2_contact = 'Contact number is required';
  } else if (!validNumber.test(values.alt_c2_contact)) {
    errors.alt_c2_contact = 'Contact number is invalid';
  } else if ((values.alt_c2_contact).length<9) {
    errors.alt_c2_contact = 'Contact number is invalid';
  }
  
  if (!values.alt_c2_relation) {
    errors.alt_c2_relation = 'Relationship is required';
  } else if (!validString.test(values.alt_c2_relation)) {
    errors.alt_c2_relation = 'Relationship is invalid';
  }
  
  if (!values.employer_name) {
    errors.employer_name = 'Employer Name is required';
  } else if (!validAlpha.test(values.employer_name)) {
    errors.employer_name = 'Employer Name is invalid';
  }

  
  // if (!values.employer_address) {
  //   errors.employer_address = 'Address is required';
  // } 
  
  if (values.employer_telephone) {
    if (!validNumber.test(values.employer_telephone)) {
      errors.employer_telephone = 'Telephone number is invalid';
    } else if ((values.employer_telephone).length<9) {
      errors.employer_telephone = 'Telephone number is invalid';
    }  
  } 
  
  if (values.employer_email) {
    if (!validEmail.test(values.employer_email)) {
      errors.employer_email = 'Email is invalid';
    }
  } 


 
  if (!values.employer_tenure) {
    errors.employer_tenure = 'Tenure of Employer is required';
  }  else if (!validFullLengthDecimalNumber.test(values.employer_tenure)) {
    errors.employer_tenure = 'Tenure of Employer is invalid';
  }

  if (!values.id_proof) {
    errors.id_proof = 'Identity Document is required';
  }

  return errors;
};