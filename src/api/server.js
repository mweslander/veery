'use strict';

const app = require('./config/app.js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`💸 App listening on port ${port}`); // eslint-disable-line
});
