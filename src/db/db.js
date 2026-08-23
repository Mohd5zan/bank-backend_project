const mongoose = require("mongoose");
async function connectdb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the DataBase");
  } catch (error) {
    console.error(error);
    console.log("Error connecting to the DB");
    process.exit(1);
  }
}

module.exports = connectdb;
