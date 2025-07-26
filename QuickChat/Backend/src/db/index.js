import mongoose from "mongoose";

// Function to connect to the mongodb database:
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("🔗 💯 MONGODB connected sucessfully✅")
    );
    await mongoose.connect(`${process.env.MONGO_URI}chatapp`);
  } catch (error) {
    console.log("❌ MONGODB connection failed ❌", error);
  }
};
