require("dotenv").config();

const http = require("http");
const sequelize = require("./config/db");
const app = require("./app");
const { initSocket } = require("./socket");
const {
  connectRabbitMQ,
} = require("./config/rabbitmq");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocket(server);

const startServer = async () => {
  try {
    // Wait for DB
    let dbConnected = false;

    while (!dbConnected) {
      try {
        await sequelize.authenticate();

        console.log("DB Connected");

        dbConnected = true;
      } catch (err) {
        console.log(
          "DB not ready, retrying in 5 sec..."
        );

        await new Promise((resolve) =>
          setTimeout(resolve, 5000)
        );
      }
    }

    // Sync tables
    await sequelize.sync({ alter: true });

    console.log("Tables synced");

    // Wait for RabbitMQ
    await connectRabbitMQ();

    // Start server only after everything ready
    server.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.log(
      "Server startup error:",
      error
    );
  }
};

startServer();