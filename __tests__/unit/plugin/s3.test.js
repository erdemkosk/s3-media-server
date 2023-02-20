const aws = require('aws-sdk');

const s3 = new aws.S3();

describe('S3 functions', () => {
  const testFileName = 'test.txt';
  const testFileSize = 5000000; // 5MB
  const testFileData = Buffer.alloc(testFileSize);

  describe('initiateMultipartUpload()', () => {
    test('should return an upload ID', async () => {
      const result = await s3.initiateMultipartUpload(testFileName);
      expect(result).toMatch(/^[\w-]+$/); // Upload ID should be a string of letters, numbers, hyphens, and underscores
    });
  });

  describe('uploadPart()', () => {
    let uploadId;

    beforeAll(async () => {
      uploadId = await s3.initiateMultipartUpload(testFileName);
    });

    test('should upload a part and return an ETag and part number', async () => {
      const partNumber = 1;
      const partData = testFileData.slice(0, 1000000); // 1MB
      const partSize = partData.length;

      const result = await s3.uploadPart(uploadId, partData, partNumber, partSize, testFileName);
      expect(result.ETag).toMatch(/^"[a-f0-9]{32}"$/); // ETag should be a string of 32 hexadecimal characters
      expect(result.PartNumber).toBe(partNumber);
    });
  });

  describe('completeMultipartUpload()', () => {
    let uploadId; let
      parts;

    beforeAll(async () => {
      uploadId = await s3.initiateMultipartUpload(testFileName);

      const numParts = Math.ceil(testFileSize / s3.MAX_PART_SIZE);
      parts = [];

      for (let partNumber = 1; partNumber <= numParts; partNumber += 1) {
        const start = (partNumber - 1) * s3.MAX_PART_SIZE;
        const end = Math.min(start + s3.MAX_PART_SIZE, testFileSize);
        const partData = testFileData.slice(start, end);
        const partSize = end - start;

        // eslint-disable-next-line no-await-in-loop
        const uploadedPart = await s3.uploadPart(uploadId, partData, partNumber, partSize, testFileName);
        parts.push(uploadedPart);
      }
    });

    test('should complete the upload and return a location', async () => {
      const result = await s3.completeMultipartUpload(uploadId, parts, testFileName);
      expect(result.Location).toMatch(/^https:\/\/.+\.s3\..+\.amazonaws\.com\/.+$/); // Location should be a URL to the uploaded file on S3
    });
  });
});
