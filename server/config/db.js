import mongoose from "mongoose";
const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Connected To Database!!"))
      .catch((err) => console.log({ err }));
  } catch (error) {}
};
export default connectDB;
