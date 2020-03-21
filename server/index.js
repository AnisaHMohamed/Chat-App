const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, getUser, removeUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 3001;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);


io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
   
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name} Welcome to the room ${user.room}!`
    });

    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
 //send a message to everone except this user
    callback();
  });


  socket.on('sendMessage', (message , callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message })
    
    callback();

  })

  socket.on("disconnect", () => {
    console.log("User has left");
    const user = removeUser(socket.id);

  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));
