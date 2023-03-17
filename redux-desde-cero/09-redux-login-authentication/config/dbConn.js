//mongoose
import mongoose from "mongoose";

//config
import { DATABASE_URI } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
