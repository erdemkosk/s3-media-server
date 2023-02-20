/* eslint-disable func-names */
const bodyParser = require('body-parser');
const healthRoutes = require('./health');
const uploadRoutes = require('./upload');
const streamRoutes = require('./stream');

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use('/api/health/', healthRoutes);
  app.use('/api/upload/', uploadRoutes);
  app.use('/api/stream/', streamRoutes);
};
