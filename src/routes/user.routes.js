const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controllers")

// get all the users

router.get("/", userControllers.getAllUsers)

// create a new user

router.post("/add", userControllers.newUser)

// get a single user

router.get("/userID/:userID", userControllers.getUser)

// delete a user

router.delete("/delete/userID/:userID", userControllers.deleteUser)

module.exports = router