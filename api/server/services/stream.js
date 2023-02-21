const {
  getStreamPipe,
  getParsedRangeStreamPipe,
  getFileList,
} = require('../../plugin/s3');

module.exports = {
  async streamS3({ range, fileName }) {
    if (!range) {
      const stream = await getStreamPipe({ fileName });

      return {
        stream,
      };
    }

    const {
      stream, start, end, total,
    } = await getParsedRangeStreamPipe({ range, fileName });

    return {
      stream,
      head: {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4',
      },
    };
  },

  async fileList() {
    const files = await getFileList();

    return {
      files,
    };
  },
};
