const asyncHandler = require("../utils/asyncHandler");
const ticketService = require("../services/ticket.service");
const { createTicketSchema } = require("../validators/ticket.validator");


// GET API 
exports.getAllTickets = asyncHandler(async (req, res) => {

  const tickets = await ticketService.getAllTickets(
    req.user,
    req.query
  );

  res.status(200).json({
    success: true,
    data: tickets,
  });
});

// post API 
exports.createTicket = asyncHandler(async (req, res) => {

  const data = {
    ...req.body,
    userId: req.user.id,
  };

  const ticket = await ticketService.createTicket(data);

  res.status(201).json({
    success: true,
    data: ticket,
  });
});

// PATCH Update ticket status
exports.updateTicketStatus = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  const ticket = await ticketService.updateTicketStatus(id, status);

  res.status(200).json({
    success: true,
    data: ticket,
  });
}
);

// PATCH Assign ticket by admin
exports.assignTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { assignedTo } = req.body;

  const ticket = await ticketService.assignTicket(id, assignedTo);

  res.status(200).json({
    success: true,
    data: ticket,
  });
}
);


// Get single ticket
exports.getTicketById = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const ticket = await ticketService.getTicketById(id);

  res.status(200).json({
    success: true,
    data: ticket,
  });
}
);