const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const colors = require('colors');

// const addproblems = require('./utils/problemsinsertion.js');
// const addsolutions = require('./utils/solutioninsertion.js');
// const addrooms = require('./utils/addrooms.js');
// const func = require('./utils/removesolutions.js');

const addmessages = require('./utils/admessagetodb.js')
const {userJoin, userLeave, getCurrentUser, getRoomUsers} = require("./utils/socketusers.js");
const formatMessage = require("./utils/socketmessages.js");

const http = require('http');
const { Server } = require('socket.io');

dotenv.config();  
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;

app.use('/contests', require('./routes/contestroute'));
app.use('/auth', require('./routes/authroute.js'));
app.use('/user', require('./routes/userroutes.js'));
app.use('/problems', require('./routes/problemsroute.js'));
app.use('/solutions', require('./routes/solutionroute.js'));
app.use('/rooms', require('./routes/roomroute.js'));
app.use('/messages', require('./routes/messagesroute.js'));


// newfunc();
// addproblems();
// addsolutions();
// addrooms();
// func();

io.on('connection', (socket) => {

  console.log('Socket connected:', socket.id);
  

  socket.on('joinRoom', ({ id, handle }) => {


    const user = userJoin(socket.id, handle , id);

    // only to particular room
    socket.join(user.room);
    console.log(`${handle} joined room ${id}`);

    
    // broadcast message to only connected user after 2 sec because front-end loads previous messages
    setTimeout(()=>{
      socket.emit("recieve-message", formatMessage("Zcoder", "Welcome to the discussion room!"));
    }, 2000);

    // broadcast message to all except user
    socket.broadcast.to(user.room).emit("recieve-message",formatMessage("Zcoder", `${user.handle} has joined the chat`));

    //send usera online data to the room
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    })

   });

    // catch the messge sent by user and broadcast to all
    socket.on("send-message", ({handle, text}) => {

      const user = getCurrentUser(socket.id);

      socket.broadcast.to(user.room).emit("recieve-message",formatMessage(handle, text));
      addmessages(user.room, handle, text);
      // console.log(handle+": "+text);

    });


    // When disconnect
    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
      const user = userLeave(socket.id);

      if (user) {
        socket.broadcast.to(user.room).emit("recieve-message",formatMessage("Zcoder", `${user.handle} has left the chat`));
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });

});

server.listen(PORT, () => {
  console.log(`Server running with Socket.IO on http://localhost:${PORT}`);
});
