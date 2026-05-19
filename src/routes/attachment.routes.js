const express = require("express");

const router = express.Router();
const upload = require("../middleware/upload.middleware");
const { requireAuth } = require("../middleware/auth.middleware");
const attachmentController = require("../controllers/attachment.controller");

router.post( "/:ticketId",requireAuth, upload.single("file"),attachmentController.uploadAttachment);

module.exports = router;