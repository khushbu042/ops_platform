const asyncHandler = require("../utils/asyncHandler");
const attachmentService = require("../services/attachment.service");

exports.uploadAttachment = asyncHandler(async (req, res) => {

  const data = {

    ticketId:
      req.params.ticketId,

    userId:
      req.user.id,

    fileName:
      req.file.filename,

    filePath:
      req.file.path,

    mimeType:
      req.file.mimetype,

  };

  const attachment = await attachmentService.uploadAttachment(data);

  res.status(201).json({
    success: true,
    data: attachment,
  });
});