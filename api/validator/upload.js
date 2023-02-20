const { Joi, Segments } = require('celebrate');

const schemas = {
  uploadS3: {
    [Segments.PARAMS]: {
      file: Joi.any()
        .meta({ swaggerType: 'file' })
        .description('File to upload')
        .required(),
    },
  },
};

module.exports = schemas;
