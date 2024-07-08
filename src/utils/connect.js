import mongoose from "mongoose";

/**
 * @Author Santi Rijal
 */

const connect = async () => {
  // Tries to connect to the database using mongoose connect method using the enviroment variable MONGO.
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (err) {
    console.log(err);
  }

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};

export default connect;
