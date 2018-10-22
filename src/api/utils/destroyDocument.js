'use strict';

function destroyDocument(resource, res, next, options = {}) {
  return resource
    .remove(options)
    .then(() => {
      res.status(200).json({ message: 'Successfully deleted' });
      next();
    })
    .catch(({ message }) => {
      res.status(404).json({ error: message });
      next();
    });
}

module.exports = destroyDocument;
