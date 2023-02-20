const router = require('express').Router();

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const {
  uploadS3,
} = require('../controllers/upload');


/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */


router.post('/', upload.single('file'), uploadS3);

module.exports = router;
