import { validString, validNumber, validEmail } from './Regex';

export default function validate(values) {
  let errors = {};
  if (!values.task_description) {
    errors.task_description = 'Task Description is required';
  } 

  if (!values.assigned_to) {
    errors.assigned_to = 'Assigned To is required';
  } 
  
  if (!values.due_date) {
    errors.due_date = 'Due Date is required';
  } 

  return errors;
};