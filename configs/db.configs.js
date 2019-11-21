const mongoose = require("mongoose")

mongoose.Promise = global.Promise;

const dbURL = "mongodb+srv://<user>:<password>@cluster0-f6a8b.mongodb.net/crud-mean?retryWrites=true&w=majority"

// Connecting to the database

const dbConn = mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});

module.exports = dbConn