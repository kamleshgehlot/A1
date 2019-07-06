const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const mailAccountUser = 'admin@rentronics.saimrc.com'
const mailAccountPassword = 'cxqD@Yir2'

var trans = nodemailer.createTransport(smtpTransport({
  service: 'rentronics.saimrc.com',
  tls: { rejectUnauthorized: false },
  auth: {
    user: mailAccountUser,
    pass: mailAccountPassword
  }
}))

module.exports = { trans: trans };
