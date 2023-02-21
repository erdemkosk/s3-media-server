const streamService = require('../services/stream');
const fileListFormatter = require('../../formatter/fileList');

module.exports = {
  async streamS3(req, res) {
    const { range } = req.headers;
    const { fileName } = req.query;

    const {
      stream, head,
    } = await streamService.streamS3({ range, fileName });

    res.writeHead(206, head);

    return stream.pipe(res);
  },

  async fileList(req, res) {
    const {
      files,
    } = await streamService.fileList();

    return res.status(200).send(files.map(file => fileListFormatter(file)));
  },
};
