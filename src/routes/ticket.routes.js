/**
* @swagger
 tags:
 *   name: Tickets
 *   description: Ticket management
 */

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: List of tickets
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created
 *       403:
 *         description: Forbidden (requester role required)
 */

/**
 * @swagger
 * /api/tickets/{id}/status:
 *   patch:
 *     summary: Update ticket status
 *     tags: [Tickets]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated
 *       403:
 *         description: Forbidden (agent or admin role required)
 */

/**
 * @swagger
 * /api/tickets/{id}/assign:
 *   patch:
 *     summary: Assign a ticket to an agent
 *     tags: [Tickets]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               agentId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Ticket assigned
 *       403:
 *         description: Forbidden (admin role required)
 */

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
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