const express = require("express");
const router = express.Router();

const ticketRoutes = require("./ticket.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const commentRoutes = require("./comment.routes");
const attachmentRoutes = require("./attachment.routes");

router.use("/tickets", ticketRoutes);
router.use("/users",userRoutes);
router.use("/auth", authRoutes);
router.use("/comments", commentRoutes);
router.use("/attachments", attachmentRoutes);

module.exports = router;