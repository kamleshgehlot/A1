const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const mailAccountUser = 'sktanwar.2020@gmail.com'
const mailAccountPassword = '829044701486'

var trans = nodemailer.createTransport(smtpTransport({
  service: 'gmail.com',
  tls: { rejectUnauthorized: false },
  auth: {
    user: mailAccountUser,
    pass: mailAccountPassword
  }
}))

module.exports = { trans: trans };
