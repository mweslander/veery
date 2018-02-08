'use strict';

const config = require('./index');
const mailgun = require('mailgun-js')({
  apiKey: config.mailgun.apiKey,
  domain: config.mailgun.domain
});

function sendEmail(email, subject, message) {
  const data = {
    from: `<noreply@${config.domain}.com>`,
    to: email,
    subject,
    text: message
  };

  return mailgun.messages()
    .send(data, (error, body) => {
      // Log out response from mailgun
      console.log(body); // eslint-disable-line
    });
}

module.exports = {
  sendEmail
};
