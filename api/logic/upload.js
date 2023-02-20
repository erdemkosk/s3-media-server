const { MAX_PART_SIZE } = require('../constant');

module.exports = class UploadLogic {
  static calculatePartCount({ fileSize }) {
    return fileSize / MAX_PART_SIZE;
  }

  static calculateStartPart({ partNumber }) {
    return partNumber - 1 * MAX_PART_SIZE;
  }

  static calculateEndPart({ startPart, fileSize }) {
    return Math.min(startPart + MAX_PART_SIZE, fileSize);
  }
};
