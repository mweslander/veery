'use strict';

const createAndSendInvitation = require('../../../utils/createAndSendInvitation');

function create(req, res) {
  const email = req.body.email;

  if (!email) {
    return res.status(422).send({ error: 'No email was attached.' });
  }

  return createAndSendInvitation(req.body, res)
    .then(() => {
      return res.status(201).json({ message: `Account activation email sent to ${email}` });
    })
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      return res.status(res.statusCode || 401).send({ error: err.message });
    });
}

module.exports = {
  create
};
