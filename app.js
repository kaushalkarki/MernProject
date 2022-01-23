const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./model/userSchema");
const cors = require("cors");
const app = express();
const userRouter = require("./router/auth");
var cookieParser = require('cookie-parser');




app.use(cookieParser());
app.use(userRouter);



dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ||5000;



if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"))
}

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});


