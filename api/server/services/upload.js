const { MAX_PART_SIZE, CONCURRENCY_LIMIT } = require('../../constant');

const {
  initiateMultipartUpload,
  uploadPart,
  completeMultipartUpload,
} = require('../../plugin/s3');

module.exports = {
  async uploadS3({ file }) {
    const fileName = file.originalname;
    const fileSize = file.size;
    const fileData = file.buffer;

    const uploadId = await initiateMultipartUpload(fileName);

    const numParts = Math.ceil(fileSize / MAX_PART_SIZE);

    const uploadPromises = [];
    let parts = [];

    for (let partNumber = 1; partNumber <= numParts; partNumber += 1) {
      const start = (partNumber - 1) * MAX_PART_SIZE;
      const end = Math.min(start + MAX_PART_SIZE, fileSize);

      const partSize = end - start;
      const partData = fileData.slice(start, end);

      const uploadedPartPromise = uploadPart(uploadId, partData, partNumber, partSize, fileName);
      uploadPromises.push(uploadedPartPromise);

      if (uploadPromises.length >= CONCURRENCY_LIMIT || partNumber === numParts) {
        // eslint-disable-next-line no-await-in-loop
        const updatedParts = await Promise.all(uploadPromises);
        parts = [...parts, ...updatedParts];
        uploadPromises.length = 0;
      }
    }

    const completedUpload = await completeMultipartUpload(uploadId, parts, fileName);

    return {
      completedUpload,
    };
  },
};
