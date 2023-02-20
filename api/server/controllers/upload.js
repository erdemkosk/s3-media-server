
const { successResponse } = require('../../util/response');

const uploadService = require('../services/upload');
const formatter = require('../../formatter/upload');

module.exports = {
  async uploadS3(req, res) {
    const { file } = req;

    const {
      completedUpload,
    } = await uploadService.uploadS3({ file });

    return res.status(200).send(successResponse({
      results: formatter({
        completedUpload,
      }),
    }));
  },
};
