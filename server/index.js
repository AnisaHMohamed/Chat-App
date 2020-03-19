const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 3001;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

server.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));
