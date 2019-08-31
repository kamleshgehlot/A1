import { validString, validNumber, validEmail } from './Regex';

export default function validate(values) {
  let errors = {};
  if (values.int_unpaid_bal==='0' || values.int_unpaid_bal==="" || values.int_unpaid_bal<0) {
    errors.int_unpaid_bal = 'Intial Unpaid Balance is required';
  } else if (!validNumber.test(values.int_unpaid_bal)) {
    errors.int_unpaid_bal = 'Intial Unpaid Balance is invalid';
  }
  if (values.cash_price==='0' || values.cash_price==="" || values.cash_price<0) {
    errors.cash_price = 'Cash Price is required';
  } else if (!validNumber.test(values.cash_price)) {
    errors.cash_price = 'Cash Price is invalid';
  }
  if (values.delivery_fee==='0' || values.delivery_fee==="" || values.delivery_fee<0) {
    errors.delivery_fee = 'Delivery Fee is required';
  } else if (!validNumber.test(values.delivery_fee)) {
    errors.delivery_fee = 'Delivery Fee is invalid';
  }
  if (values.ppsr_fee==='0' || values.ppsr_fee==="" || values.ppsr_fee<0) {
    errors.ppsr_fee = 'PPSR Fee is required';
  } else if (!validNumber.test(values.ppsr_fee)) {
    errors.ppsr_fee = 'PPSR Fee is invalid';
  }
 
  if (values.frequency==='0' || values.frequency==="" || values.frequency<0) {
    errors.frequency = 'Frequency is required';
  } else if (!validNumber.test(values.frequency)) {
    errors.frequency = 'Frequency is invalid';
  }
 
  if (values.no_of_payment==='0' || values.no_of_payment==="" || values.no_of_payment<0) {
    errors.no_of_payment = 'Number of Payments is required';
  } else if (!validNumber.test(values.no_of_payment)) {
    errors.no_of_payment = 'Number of Payments is invalid';
  }
  if (values.each_payment_amt==='0' || values.each_payment_amt==="" || values.each_payment_amt<0) {
    errors.each_payment_amt = 'Amount is required';
  } else if (!validNumber.test(values.each_payment_amt)) {
    errors.each_payment_amt = 'Amount is invalid';
  }
  if (values.total_payment_amt==='0' || values.total_payment_amt==="" || values.total_payment_amt<0) {
    errors.total_payment_amt = 'Amount is required';
  } else if (!validNumber.test(values.total_payment_amt)) {
    errors.total_payment_amt = 'Amount is invalid';
  }
 
  if (values.before_delivery_amt==='0' || values.before_delivery_amt==="" || values.before_delivery_amt<0) {
    errors.before_delivery_amt = 'Amount is required';
  } else if (!validNumber.test(values.before_delivery_amt)) {
    errors.before_delivery_amt = 'Amount is invalid';
  }
  if (values.minimum_payment_amt==='0' || values.minimum_payment_amt==="" || values.minimum_payment_amt<0) {
    errors.minimum_payment_amt = 'Amount is required';
  } else if (!validNumber.test(values.minimum_payment_amt)) {
    errors.minimum_payment_amt = 'Amount is invalid';
  }
  if (values.intrest_rate==='0' || values.intrest_rate==="" || values.intrest_rate<0) {
    errors.intrest_rate = 'Weeks is required';
  } else if (!validNumber.test(values.intrest_rate)) {
    errors.intrest_rate = 'Weeks is invalid';
  }
  if (values.intrest_rate_per==='0' || values.intrest_rate_per==="" || values.intrest_rate_per<0) {
    errors.intrest_rate_per = 'Daily interest rates are required';
  } else if (!validNumber.test(values.intrest_rate_per)) {
    errors.intrest_rate_per = 'Daily interest rates are invalid';
  }
  if (values.total_intrest==='0' || values.total_intrest==="" || values.total_intrest<0) {
    errors.total_intrest = 'Total Interest Charges are required';
  } else if (!validNumber.test(values.total_intrest)) {
    errors.total_intrest = 'Total Interest Charges are invalid';
  }
  return errors;
};