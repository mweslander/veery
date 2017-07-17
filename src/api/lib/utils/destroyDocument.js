'use strict';

function destroyDocument(model, _id, res, next) {
  return model.remove({ _id })
    .then(() => {
      res.status(200).json({ message: 'Successfully deleted' });
      next();
    })
    .catch((err) => {
      res.status(404).json({ error: err.message });
      next();
    });
}

module.exports = destroyDocument;
