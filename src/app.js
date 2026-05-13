const express = require("express");
const session = require("express-session");
const routes = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();

app.use(express.json()); // body parser

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false, // true in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// routes middleware
app.use("/api", routes);

// upload middleware
app.use("/uploads", express.static("uploads"));

// error middleware 
app.use(errorMiddleware);

module.exports = app;


