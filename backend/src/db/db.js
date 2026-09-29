import mongoose from "mongoose";
import {DATA_BASE} from "../constent.js";

const connectDB = async () => {
  try {
    const connectToDataBase = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DATA_BASE}`
    );
    console.log(`MongoDB connected: ${connectToDataBase.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection Error:", error);
    throw error;
  }
};

export default connectDB;