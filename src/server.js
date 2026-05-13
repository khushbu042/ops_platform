require("dotenv").config();

const http = require("http");
const sequelize = require("./config/db");
const app = require("./app");
const { User, Ticket } = require("./models");
const { initSocket } = require("./socket");
const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

sequelize.authenticate()
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.error("DB Error ❌", err));
  
sequelize.sync({ alter: true })
  .then(() => console.log("Tables synced ✅"));