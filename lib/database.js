// creating a connect to database which is hosted on mongodb atlas database
import mongoose from "mongoose";

let isConnected = false;

// make a connection to the database using local host, if the database is hosted on mongodb atlas then use the uri of the database
const uri = "mongodb://localhost:27017/Trackify" || process.env.MONGODB_URI;

// function to connect to the database
export const connectToMongoDb = async () => {
  if (isConnected) {
    return console.log("Database is already connected");
  }

  try {
    await mongoose.connect(uri, {
      dbName: "Trackify",
    });

    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error in connecting to database", error);
  }
};
