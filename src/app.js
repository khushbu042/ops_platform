const express = require("express");
const session = require("express-session");
const routes = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");
const { RedisStore } = require("connect-redis");
const redisClient = require("./config/redis");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(express.json()); // body parser

// session middleware
app.use( session({
    store: new RedisStore({
      client: redisClient,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge:
        1000 * 60 * 60 * 24,
    },
  })
);

// health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

// routes middleware
app.use("/api", routes);

// upload middleware
app.use("/uploads", express.static("uploads"));

// error middleware 
app.use(errorMiddleware);

module.exports = app;


