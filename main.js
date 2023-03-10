require('dotenv').config();
require('express-async-errors');
const path = require('path');
const express = require('express');
const { errors } = require('celebrate');
const config = require('./config');

const errorMiddleware = require('./api/middleware/error');
const { getLanguageFromRequest } = require('./api/middleware/language');

const app = express();

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(getLanguageFromRequest);


if (config.swagger.enabled) {
  // eslint-disable-next-line global-require
  require('./api/plugin/swagger')(app);
}

require('./api/plugin/security')(app);
require('./api/server/routes')(app);

app.use(errors({ statusCode: 422 }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', express.static(path.join(__dirname, 'public')));

app.use(errorMiddleware);

module.exports = app;
