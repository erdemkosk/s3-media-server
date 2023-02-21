const aws = require('aws-sdk');
const rangeParser = require('range-parser');

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET,
} = require('../../config');

aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

module.exports = {
  async initiateMultipartUpload(fileName) {
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    const result = await s3.createMultipartUpload(params).promise();
    return result.UploadId;
  },

  async uploadPart(uploadId, partData, partNumber, partSize, fileName) {
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      PartNumber: partNumber,
      UploadId: uploadId,
      Body: partData,
      ContentLength: partSize,
    };

    const result = await s3.uploadPart(params).promise();
    return {
      ETag: result.ETag,
      PartNumber: partNumber,
    };
  },

  async completeMultipartUpload(uploadId, parts, fileName) {
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      MultipartUpload: {
        Parts: parts,
      },
      UploadId: uploadId,
    };

    const result = await s3.completeMultipartUpload(params).promise();
    return result;
  },

  async getStreamPipe({ fileName }) {
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    const stream = s3.getObject(params).createReadStream();

    return stream;
  },

  async getParsedRangeStreamPipe({ range, fileName }) {
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Range: range,
    };

    const contentLength = await module.exports.getContentLength({ fileName });
    const stream = await s3.getObject(params).createReadStream();

    const parsedRange = rangeParser(contentLength, range);

    const { start, end } = parsedRange[0];

    const total = contentLength;

    return {
      stream, start, end, total,
    };
  },

  async getContentLength({ fileName }) {
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    const headResult = await s3.headObject(params).promise();

    return headResult.ContentLength;
  },

  async getFileList() {
    const params = {
      Bucket: S3_BUCKET,
      Delimiter: '/',
    };

    const possibleFiles = await s3.listObjects(params).promise();

    const files = possibleFiles.Contents.filter(item => item.Key.endsWith('.mp4'));

    return files;
  },
};
