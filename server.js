const express = require("express")
const bodyParser = require("body-parser") 
const dotenv = require("dotenv")

// local imports 
const connectDB = require("./db")

const employeeRoutes = require("./controllers/employee.controller")
const companiesRoutes = require("./controllers/company.controller")
const departmentsRoutes = require("./controllers/department.controller")
const leadersRoutes = require("./controllers/leader.controller")

const app = express()
dotenv.config()
app.use(bodyParser.json())
app.use('/api/employees', employeeRoutes)
app.use('/api/companies', companiesRoutes)
app.use('/api/departments', departmentsRoutes)
app.use('/api/leaders', leadersRoutes)

connectDB()
  .then(() => {
    console.log('DB connection succeeded')
    app.listen(process.env.PORT, async () => {
      console.log(`Server up on port ${process.env.PORT}`)
    })
  })
  .catch(err => console.log(err))