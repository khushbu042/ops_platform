module.exports = (err, req, res, next) => {
  console.error(err); // later we replace with logger

  // Zod error handle
  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: err.issues.map(e => e.message) 
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
