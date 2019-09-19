const env = process.env.NODE_ENV;
let DbName, domainName;

function getFullName(dbName, userName) {
  return dbName + "_" + userName
}

if (env === 'uat') {
  DbName = 'rentronic_uat'
  domainName = 'rentronicsuat.saimrc.com'

} else if (env === 'dev') {
  DbName = 'rentrodev_test';
  domainName = 'rentronicsdev.saimrc.com'
} else {
  DbName = 'rentronicsNew'
  domainName = 'localhost:3000'
}

module.exports = { 'prod': DbName, getFullName: getFullName, domainName: domainName };