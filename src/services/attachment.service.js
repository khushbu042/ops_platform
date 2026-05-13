const {
  Attachment,
  Ticket,
} = require("../models");

const AppError =
  require("../utils/AppError");

exports.uploadAttachment = async (data) => {

    const ticket = await Ticket.findByPk(
        data.ticketId
      );

    if (!ticket) {
      throw new AppError(
        "Ticket not found",
        404
      );
    }

    const attachment = await Attachment.create(data);

    return attachment;
  };