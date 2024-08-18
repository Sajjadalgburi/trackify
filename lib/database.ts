// lib/database.ts
import mongoose from "mongoose";

let isConnected = false;

const localUri = "mongodb://localhost:27017/Trackify";
const ClouduUri = process.env.MONGODB_URI as string;

export const connectToMongoDb = async () => {
  if (isConnected) {
    console.log("Database is already connected");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(localUri, {
      dbName: "Trackify",
    });
    isConnected = true;
    console.log("Database connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to database", error);
    throw new Error("Error connecting to database");
  }
};
