const AppError = require("../utils/AppError");
const { Ticket, Comment, User } = require("../models");
const { getIO } = require("../socket");

// GET all tickets
exports.getAllTickets = async (user,query) => {

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;
  const offset = (page - 1) * limit;
 
  const where = {};

  // requester only own tickets
  if (user.role === "requester") {
    where.userId = user.id 
  } 
  
  //filter by status
  if (query.status) {
    where.status = query.status;
  }

  const tickets = await Ticket.findAndCountAll({
    where,
    limit,
    offset,
    order: [ ["createdAt", "DESC"] ],
  });


  return tickets;
};

// CreateTicket
exports.createTicket = async (data) => {
  const ticket = await Ticket.create(data);

  // socket access HERE
  const io = getIO();

  io.emit(
  "ticketCreated",
  {
    message: "New ticket created",
    ticket,
  }
);

  return ticket

};

// Tickets status update
exports.updateTicketStatus = async (ticketId, status) => {

  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    throw new AppError(
      "Ticket not found",
      404
    );
  }

  ticket.status = status;

  await ticket.save();

  return ticket;
};

// Assign Ticket by admin
exports.assignTicket = async (ticketId, assignedTo) => {

  const ticket = await Ticket.findByPk(ticketId);

  if (!ticket) {
    throw new AppError(
      "Ticket not found",
      404
    );
  }

  const agent = await User.findByPk(
    assignedTo
  );

  if (!agent) {
    throw new AppError(
      "Agent not found",
      404
    );
  }

  if (agent.role !== "agent") {
    throw new AppError(
      "User is not an agent",
      400
    );
  }

  ticket.assignedTo = assignedTo;

  await ticket.save();

  const io = getIO();

  io.to(
    `agent_${assignedTo}`
  ).emit(
    "ticketAssigned",
    {
      message:
        "New ticket assigned",

      ticket,
    }
  );

  return ticket;
};

// Fetch Ticket with all details
exports.getTicketById = async (id) => {

  const ticket = await Ticket.findByPk(id, {

    include: [
      {
        model: Comment,

        include: [
          {
            model: User,

            attributes: [
              "id",
              "name",
              "email",
            ],
          },
        ],
      },

    ],

  });

  if (!ticket) {
    throw new AppError(
      "Ticket not found",
      404
    );
  }

  return ticket;
};