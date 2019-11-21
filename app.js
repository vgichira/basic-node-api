const express = require("express");
const bodyParser = require("body-parser");
const dbConn = require("./configs/db.configs")
const app = express();
const port = process.env.PORT || 5000

dbConn

// middlewares

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// include the users controllers routes

var userRoutes = require("./src/routes/user.routes")

app.use("/api/users", userRoutes)

// create server

app.listen(port, ()=>{
    console.log("Listening to port " + port)
})
