const mongoose = require("mongoose");

mongoose.connect(
  `${process.env.MONGO_URI}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log(
        "Le serveur est connecté à la base de données: " +
          process.env.MONGO_URI.split("/")[3]
      );
    } else console.log("Connetion error : " + err);
  }
);
