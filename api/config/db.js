const mongoose = require("mongoose");

const dbConnetion = () => {
  // process.env.DB_URL ||
  const SERVER = "mongodb://localhost:27017/privacy";
  mongoose
    .connect(SERVER, {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB CONNECTED SUCESSFULLY`))
    .catch((error) => {
      console.log(`DB CONNECTION ISSUE ${error}`);
      process.exit(1);
    });

  mongoose.connection.on("error", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = dbConnetion;
