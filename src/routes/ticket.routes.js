/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary:
 *       Get all tickets
 *     responses:
 *       200:
 *         description:
 *           List of tickets
 */

const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticket.controller");
const { requireAuth, requireRole} = require("../middleware/auth.middleware");

router.get("/", requireAuth, ticketController.getAllTickets);
router.post("/", requireAuth, requireRole(["requester"]), ticketController.createTicket);
router.patch("/:id/status",requireAuth,requireRole(["agent", "admin"]), ticketController.updateTicketStatus);
router.patch("/:id/assign",requireAuth,requireRole(["admin"]),ticketController.assignTicket);
router.get("/:id",requireAuth,ticketController.getTicketById);

module.exports = router;