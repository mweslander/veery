'use strict';

function saveDocuments(promises, res, next) {
  return Promise.all(promises)
    .then(() => {
      res.status(201).json({ message: 'Successful document(s) creation' });
      next();
    })
    .catch(({ message }) => {
      res.status(res.statusCode || 404).json({ error: message });
      next();
    });
}

module.exports = saveDocuments;
