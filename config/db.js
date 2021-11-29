const mongooose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const connectDB = async () => {
  try {
    await mongooose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MongoDB is conncted...."); 
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
