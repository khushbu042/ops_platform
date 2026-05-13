const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/user.service");
// const { createTicketSchema } = require("../validators/ticket.validator");


// GET API 
exports.getAllUsers = asyncHandler(async (req, res) => {
  const user = await userService.getAllUser();

  res.json({
    success: true,
    data: user,
  });
});

// post API 
exports.createUser = asyncHandler(async (req, res) => {
//   const validatedData = createTicketSchema.parse(req.body);
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});