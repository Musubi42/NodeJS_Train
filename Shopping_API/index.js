const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoots = require("./routes/users");
const authRoots = require("./routes/auth");

dotenv.config(); //Key : Value de ce que contient le fichier .env

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Success"))
  .catch((err) => console.log("Error: " + err));

app.use(express.json()); //Permet d'utiliser le JSON
app.use("/api/users", userRoots);
app.use("/api/auth", authRoots); //Route vers le module d'authentification

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running");
  console.log(dotenv.config());
});
