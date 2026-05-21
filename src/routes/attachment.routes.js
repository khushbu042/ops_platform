/**
 * @swagger
 * tags:
 *   name: Attachments
 *   description: Ticket attachments
 */

/**
 * @swagger
 * /api/attachments/{ticketId}:
 *   post:
 *     summary: Upload an attachment for a ticket
 *     tags: [Attachments]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Attachment uploaded
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */

const express = require("express");

const router = express.Router();
const upload = require("../middleware/upload.middleware");
const { requireAuth } = require("../middleware/auth.middleware");
const attachmentController = require("../controllers/attachment.controller");

router.post( "/:ticketId",requireAuth, upload.single("file"),attachmentController.uploadAttachment);

module.exports = router;