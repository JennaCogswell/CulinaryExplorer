import mongoose from "mongoose";

/**
 * @Author Santi Rijal
 */

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    image: {
      type: String,
      required: false,
      default: "placeholder.png",
    },
    name: {
      type: String,
      unique: true,
      required: false,
    },
    about: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: false,
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: false,
    },
    myRecipe: {
      type: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
      required: false,
    },
    savedRecipe: {
      type: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
      required: false,
    },
  },
  { timestamps: true }
);

let User;
if (mongoose.connection.models.User) {
  User = mongoose.connection.models.User;
} else {
  User = mongoose.model("User", userSchema);
}

export default User;
