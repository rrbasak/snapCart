import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    //console.log(`Connectd to mongoDB ${conn.connection.host}`.bgMagenta.white);
    console.log(
      `Connected to MongoDB: ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    //console.log(`Error in MongoDB ${error}`.bgRed.white)
    console.log(`Error in MongoDB: ${error.message}`.bgRed.white);
    process.exit(1); // Exit process with failure
  }
};
export default connectDB;