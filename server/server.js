const express = require("express")
const dotenv = require("dotenv").config()
const router = express.Router()
const cors = require("cors")
const connect = require("./config/db")
const path = require("path")
const Port = process.env.PORT

//running connection
connect()

//initializing app
const app = express()

//cross origin resource sharing
app.use(cors())

//middleware and apis
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/books", require("./routes/bookRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/borrowings", require("./routes/borrowingRoutes"))
app.use("/api/requests", require("./routes/requestRoutes"))
app.use("/api/past-borrowings", require("./routes/pastBorrowingRoutes"))

/* Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'client', 'dist', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }
*/

//connecting to port
app.listen(Port)
console.log(`listening to port: ${Port}`)