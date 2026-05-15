const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const redisClient = require("../config/redis");

exports.loginLimiter =
  rateLimit({
    store: new RedisStore({
      sendCommand: (...args) =>
        redisClient.sendCommand(args),
    }),
    windowMs:
      15 * 60 * 1000,
    max: 5,
    message: {
      success: false,
      message:
        "Too many login attempts. Try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });