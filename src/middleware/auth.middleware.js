const AppError = require("../utils/AppError");

const requireAuth = (req, res, next) => {

  if (!req.session.user) {
    return next(
      new AppError("Unauthorized", 401)
    );
  }

  req.user = req.session.user;

  next();
};

const requireRole = (roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("Forbidden", 403)
      );
    }

    next();
  };
};

module.exports = {
  requireAuth,
  requireRole,
};