const streamService = require('../services/stream');

module.exports = {
  async streamS3(req, res) {
    const { range } = req.headers;

    const {
      stream, head,
    } = await streamService.streamS3({ range });

    res.writeHead(206, head);

    return stream.pipe(res);
  },
};
