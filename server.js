const express = require("express");
const router = require('./router');
const connectDB = require("./db");
const dotenv = require("dotenv");
const bodyParser = require("body-parser") 

const app = express();
app.use(bodyParser.json());
dotenv.config();

connectDB()
  .then(() => {
    console.log('DB connection succeeded');
    app.listen(process.env.PORT, async () => {
      console.log(`Server up on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));