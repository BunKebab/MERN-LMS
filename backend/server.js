const express = require("express")
const dotenv = require("dotenv").config()
const router = express.Router()

const Port = process.env.PORT

//declaring app
const app = express()

//middleware and apis
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", require("./routes/userRoutes"))

//listening to port
app.listen(Port)
console.log(`listening to port: ${Port}`)