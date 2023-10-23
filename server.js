const express = require("express");
const bodyParser = require("body-parser") 
const dotenv = require("dotenv");


// local imports 
const connectDB = require("./db");
// const router = require('./router');
const employeeRoutes = require("./controllers/employee.controller")

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use('/api/employees', employeeRoutes)




connectDB()
  .then(() => {
    console.log('DB connection succeeded');
    app.listen(process.env.PORT, async () => {
      console.log(`Server up on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));