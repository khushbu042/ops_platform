const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/auth.service");

exports.register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);

  // session create
  req.session.user = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  const userResponse = user.toJSON();

  delete userResponse.password;

  res.status(200).json({
    success: true,
    data: userResponse,
  });
});