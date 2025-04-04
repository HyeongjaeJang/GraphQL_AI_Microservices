import mongoose from "mongoose";
import "dotenv/config";

const mongodbUrl =
  process.env.MONGODB_URL || "mongodb://localhost:27017/lab3_ex1";

export const mongodb = async () => {
  try {
    await mongoose.connect(mongodbUrl).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};
