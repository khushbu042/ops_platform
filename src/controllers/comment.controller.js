const commentService = require("../services/comment.service");
const asyncHandler = require("../utils/asyncHandler");

exports.addComment = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  console.log(req.file);
  console.log("comment controller", ticketId)

  const data = {
    message: req.body.message,
    ticketId,
    userId: req.user.id,
    attachment: req.file ? req.file.path : null,
  };

  const comment = await commentService.addComment(data);

  res.status(201).json({
    success: true,
    data: comment,
  });
}
);