const mongoose = require("mongoose");

const connectToDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  console.log(mongoURI);

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
