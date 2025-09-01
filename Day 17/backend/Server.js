
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Handle socket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Listen for messages
  socket.on("chat message", (msg) => {
    io.emit("chat message", { id: socket.id, text: msg });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
