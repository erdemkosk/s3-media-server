/* eslint-disable func-names */
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'A sample API',
  },
  servers: [
    {
      url: '/',
    },
  ],
  components: {
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
    },
  },
  security: [{
    JWT: [],
  }],
};


module.exports = function (app) {
  const specs = swaggerJsdoc({
    swaggerDefinition,
    apis: ['api/server/routes/*.js'],
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
  }));
};
