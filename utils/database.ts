import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("Already Connected");
    return;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URL!, {
        dbName: "devTech",
      });

      isConnected = true;

      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
    }
  }
};
