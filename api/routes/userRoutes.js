const express = require("express");
const {register, login, getAllUsers} = require("./userController");

const app = express.Router();

app.post("/register", register);
app.post("/login", login);
app.get('/allUsers/:id', getAllUsers);


module.exports = app;