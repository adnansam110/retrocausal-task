import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log("Erro connecting to Mongo DB ~ error:", error);
  }
};
