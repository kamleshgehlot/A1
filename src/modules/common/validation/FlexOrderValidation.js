import { validString, validNumber, validEmail } from './Regex';

export default function validate(values) {
  let errors = {};
  if (values.goods_rent_price==='0' || values.goods_rent_price==="" || values.goods_rent_price<0) {
    errors.goods_rent_price = 'Rent Price of Goods is required';
  } else if (!validNumber.test(values.goods_rent_price)) {
    errors.goods_rent_price = 'Rent Price of Goods is invalid';
  }
  if (values.ppsr_fee==='0' || values.ppsr_fee==="" || values.ppsr_fee<0) {
    errors.ppsr_fee = 'PPSR Fee is required';
  } else if (!validNumber.test(values.ppsr_fee)) {
    errors.ppsr_fee = 'PPSR Fee is invalid';
  } 
  
  if (values.liability_fee==='0' || values.liability_fee==="" || values.liability_fee<0) {
    errors.liability_fee = 'Liability Waiver Fee is required';
  } else if (!validNumber.test(values.liability_fee)) {
    errors.liability_fee = 'Liability Waiver Fee is invalid';
  }
  if (values.ppsr_fee==='0' || values.ppsr_fee==="" || values.ppsr_fee<0) {
    errors.ppsr_fee = 'PPSR Fee is required';
  } else if (!validNumber.test(values.ppsr_fee)) {
    errors.ppsr_fee = 'PPSR Fee is invalid';
  }
  
  if (values.weekly_total==='0' || values.weekly_total==="" || values.weekly_total<0) {
    errors.weekly_total = 'Total per week/fortnight is required';
  } else if (!validNumber.test(values.weekly_total)) {
    errors.weekly_total = 'TOTAL per week/fortnight is invalid';
  }
  if (values.frequency==='0' || values.frequency==="" || values.frequency<0) {
    errors.frequency = 'Frequency is required';
  } else if (!validNumber.test(values.frequency)) {
    errors.frequency = 'Frequency is invalid';
  }
  if (values.first_payment==='0' || values.first_payment==="" || values.first_payment<0) {
    errors.first_payment = 'First Payment date is required';
  } else if (!validNumber.test(values.first_payment)) {
    errors.first_payment = 'First Payment date is invalid';
  }
  if (values.no_of_payment==='0' || values.no_of_payment==="" || values.no_of_payment<0) {
    errors.no_of_payment = 'Number of Payments  is required';
  } else if (!validNumber.test(values.no_of_payment)) {
    errors.no_of_payment = 'Number of Payments  is invalid';
  }
  if (values.each_payment_amt==='0' || values.each_payment_amt==="" || values.each_payment_amt<0) {
    errors.each_payment_amt = 'Amount  is required';
  } else if (!validNumber.test(values.each_payment_amt)) {
    errors.each_payment_amt = 'Amount  is invalid';
  }
  if (values.total_payment_amt==='0' || values.total_payment_amt==="" || values.total_payment_amt<0) {
    errors.total_payment_amt = 'Amount  is required';
  } else if (!validNumber.test(values.total_payment_amt)) {
    errors.total_payment_amt = 'Amount  is invalid';
  }
  if (values.bond_amt==='0' || values.bond_amt==="" || values.bond_amt<0) {
    errors.bond_amt = 'Bond Amt is required';
  } else if (!validNumber.test(values.bond_amt)) {
    errors.bond_amt = 'Bond Amt is invalid';
  }
  if (values.before_delivery_amt==='0' || values.before_delivery_amt==="" || values.before_delivery_amt<0) {
    errors.before_delivery_amt = 'Amount is required';
  } else if (!validNumber.test(values.before_delivery_amt)) {
    errors.before_delivery_amt = 'Amount is invalid';
  }
 
  return errors;
};