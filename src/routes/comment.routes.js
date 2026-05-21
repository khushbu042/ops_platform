/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Ticket comments
 */

/**
 * @swagger
 * /api/comments/{ticketId}:
 *   post:
 *     summary: Add a comment to a ticket
 *     tags: [Comments]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               attachment:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Comment added
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */

const express = require("express");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

const commentController = require("../controllers/comment.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.post( "/:ticketId", requireAuth,upload.single("attachment"),commentController.addComment);

module.exports = router