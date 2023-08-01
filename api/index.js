const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");


dotenv.config();

const app = express();
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json());
app.use("/api/auth", userRoutes);


app.listen(3030, () => {console.log("Server started on port 3030")});


module.exports = app;



