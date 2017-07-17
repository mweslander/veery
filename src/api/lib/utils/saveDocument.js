'use strict';

function saveDocument(model, params, res, next) {
  return new model(params).save()
    .then((venue) => {
      res.status(201).json({ venue });
      next();
    })
    .catch((err) => {
      res.status(404).json({ error: err.message });
      next();
    });
}

module.exports = saveDocument;
