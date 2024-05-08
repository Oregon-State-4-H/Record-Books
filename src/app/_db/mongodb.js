import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    return mongoose.connection; // Return the connection object
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export default connectDB;
