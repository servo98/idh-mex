const mongoose = require("mongoose");
// require("dotenv").config();

const functions = require("firebase-functions");

const mongoURI = functions.config().mongo.uri;

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    // console.log("Ya estamos conectados a MongoDB");
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    // console.error("Error de conexión a MongoDB", error);
    throw new Error("Error de conexión a la base de datos");
  }
};

// Usando module.exports para exportar la función
module.exports = connectToDB;
