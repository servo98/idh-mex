import mongoose from "mongoose";

mongoose.connection.on("open", () => {
  console.info("Database connected 🟢");
});

mongoose.connection.on("disconnecting", () => {
  console.error("Database disconnecting 🔴");
});

mongoose.connection.on("close", () => {
  console.error("Database connection closed 🔴");
});

mongoose.connection.on("error", (error) => {
  console.error("Database connection error 🔴");
  console.error(error);
});

const connectToDB = async () => {
  // Revisar si hay conexión activa antes de intentar conectar
  if (mongoose.connections[0].readyState) {
    console.info("Already connected to the database.");
    return;
  }

  try {
    console.info("Attempting to connect to the database...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error in DB connection 🔴");
    console.error(error);
    throw new Error("Failed to connect to the database");
  }
};

export default connectToDB;
