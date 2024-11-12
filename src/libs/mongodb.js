import mongoose from "mongoose";

mongoose.connection.on("open", () => {
  console.info("Database connected 🟢");
});

mongoose.connection.on("disconnecting", () => {
  console.error("Database disconnected 🔴");
});

const connectToDB = async () => {
  // Check if ther's already a connection
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Error in db connection 🔴");
    console.error(error);
  }
};

export default connectToDB;
