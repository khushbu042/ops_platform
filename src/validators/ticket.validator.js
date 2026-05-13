const { z } = require("zod");

const createTicketSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
});

const updateStatusSchema = z.object({
  status: z.enum([
    "open",
    "in_progress",
    "resolved",
    "closed",
  ]),
});

const assignTicketSchema = z.object({
  assignedTo: z.number(),
});

module.exports = {
  createTicketSchema,
  updateStatusSchema,
  assignTicketSchema
};