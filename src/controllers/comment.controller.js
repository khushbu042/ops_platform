const commentService = require("../services/comment.service");
const asyncHandler = require("../utils/asyncHandler");

exports.addComment = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  console.log("comment controller", ticketId)

  const data = {
    message: req.body.message,
    ticketId,
    userId: req.user.id,
  };

  const comment = await commentService.addComment(data);

  res.status(201).json({
    success: true,
    data: comment,
  });
}
);