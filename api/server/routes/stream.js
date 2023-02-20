const router = require('express').Router();

const {
  streamS3,
} = require('../controllers/stream');


router.get('/', streamS3);

module.exports = router;
