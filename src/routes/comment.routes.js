const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.post("/:ticketId", requireAuth, commentController.addComment);

module.exports = router;