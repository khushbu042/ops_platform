const { io } =
  require("socket.io-client");

const socket =
  io("http://localhost:3000");

socket.on("connect", () => {

  console.log(
    "Connected:",
    socket.id
  );

  socket.emit(
    "joinRoom",
    "agent_5"
  );

});

socket.on(
  "ticketAssigned",
  (data) => {

    console.log(
      "Assigned ticket:",
      data
    );

  }
);