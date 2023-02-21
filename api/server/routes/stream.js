const router = require('express').Router();

const {
  streamS3,
  fileList,
} = require('../controllers/stream');


router.get('/', streamS3);

router.get('/file-list', fileList);

module.exports = router;
