const express = require("express");
const { addMessage, getAllMessages } = require("./messagesController");

const app = express.Router();

app.post("/addmsg", addMessage);
app.post('/getmsg', getAllMessages);


module.exports = app;