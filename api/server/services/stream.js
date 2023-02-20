const {
  getStreamPipe,
  getParsedRangeStreamPipe,
} = require('../../plugin/s3');

module.exports = {
  async streamS3({ range }) {
    if (!range) {
      const stream = await getStreamPipe({ fileName: 'test.mp4' });

      return {
        stream,
      };
    }

    const {
      stream, start, end, total,
    } = await getParsedRangeStreamPipe({ range, fileName: 'test.mp4' });

    console.log(`bytes ${start}-${end}/${total}`);


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
};
