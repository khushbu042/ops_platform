const express = require("express");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

const commentController = require("../controllers/comment.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.post( "/:ticketId", requireAuth,upload.single("attachment"),commentController.addComment);

module.exports = router