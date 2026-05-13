const { Ticket } = require("../models");
const { Comment } = require("../models");


exports.addComment = async (data) => {
  
  console.log("comment service", data);
  const ticket = await Ticket.findByPk(
    data.ticketId
  );

  if (!ticket) {
    throw new AppError(
      "Ticket not found",
      404
    );
  }
  
  
  const comment = await Comment.create(data);
  console.log("comment created", comment);

  return comment;
};