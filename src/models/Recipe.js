/**
 * @author Ayush Amrishbhai Patel
 * @BannerId B00855591
 */

import mongoose from "mongoose";

const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    recipeTitle: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: false,
    },
    authorEmail: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: false,
    },
    minutes: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    difficultyLevel: {
      type: String,
      required: false,
    },
    allergens: {
      type: [String],
      required: false,
    },
    additionalNotes: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratedBy: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    favourites: {
      type: Number,
      default: 0,
    },
    ratingScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

let Recipe;

// Create a new schema if it doesn't exist.
if (mongoose.connection.models.Recipe) {
  Recipe = mongoose.connection.models.Recipe;
} else {
  //console.log(recipeSchema)
  Recipe = mongoose.model("Recipe", recipeSchema);
}

export default Recipe;
