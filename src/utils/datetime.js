import moment from 'moment';

export function getDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

export function getCurrentDate() {
  return moment().format("MM/DD/YYYY")
}

export function getDateInDDMMYYYY(date) {
  return moment(date).format("DD-MM-YYYY")
}

export function getCurrentDateDDMMYYYY() {
  return moment().format("DD-MM-YYYY")
}
