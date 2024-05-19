const express = require("express")
const dotenv = require("dotenv").config()
const router = express.Router()
const connect = require("./config/db")
const Port = process.env.PORT

//running connection
connect()

//initializing app
const app = express()

//middleware and apis
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//connecting to port
app.listen(Port)
console.log(`listening to port: ${Port}`)