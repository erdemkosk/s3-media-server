const router = require('express').Router();
const { getHealthStatus } = require('../controllers/health');

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check the health of the server
 *     description: Returns the current time and uptime of the server.
 *     tags:
 *       - Health
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                   description: Whether an error occurred during the request.
 *                 results:
 *                   type: object
 *                   properties:
 *                     time:
 *                       type: string
 *                       example: "19-02-2023 4:53:30"
 *                       description: The current time on the server.
 *                     uptime:
 *                       type: string
 *                       example: "1 min."
 *                       description: The uptime of the server.
 */

router.get('/', getHealthStatus);

module.exports = router;
