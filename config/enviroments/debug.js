const server = {
  port: process.env.PORT || 4000,
};

module.exports = {
  env: 'debug',
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
  server,
};
