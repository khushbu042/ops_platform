const { Server } = require("socket.io");

let io;

exports.initSocket = (server) => {

    io = new Server(server, {

        cors: {
            origin: "*",
        },

    });

    io.on("connection", (socket) => {

        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(
                `Socket joined room: ${room}`
            );

});

        console.log(
            "Client connected:",
            socket.id
        );

        socket.on("disconnect", () => {

            console.log(
                "Client disconnected:",
                socket.id
            );

        });

    });

};

exports.getIO = () => {

    if (!io) {
        throw new Error(
            "Socket.io not initialized"
        );
    }

    return io;
};