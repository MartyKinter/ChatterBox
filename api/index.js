const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const socket = require("socket.io");

dotenv.config();

const app = express();

app.use(cors({ 
    origin: process.env.REACT_APP_CLIENT_URL,
    credentials: true
  }));

app.use(express.json());


app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);


const server = app.listen(3030, () => {console.log("Server started on port 3030")});

const io = socket(server, { 
  cors:{
    origin: process.env.REACT_APP_CLIENT_URL,
    credentials: true
  }
});

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
  global.chatSocket = socket;
  socket.on("add-user", (userId)=> {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data)=>{
    const sendUserSocket = onlineUsers.get(data.to_user);
    if(sendUserSocket){
      console.log("msg-sent");
      socket.to(sendUserSocket).emit("msg-received", data.text);
    }
  });
});

module.exports = app;



