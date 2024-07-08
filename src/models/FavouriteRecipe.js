/**
  * @Author Ayush Amrishbhai Patel
 * @BannerId B00855591
 */


import mongoose from "mongoose";

const { Schema } = mongoose;

const favoriteRecipeSchema = new Schema(
  {
    recipeTitle: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], 
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    authorName: {
      type: String,
      required: true,
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
    image:{
      type: String,
      required: false,
    },
    addedBy: {
      type: String, 
      required: true,
    },
    recipeid:{
        type: String,
        required: false,
    },
    rating:{
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

let FavoriteRecipe;

// Create a new schema if it doesn't exist.
if (mongoose.connection.models.FavoriteRecipe) {
  FavoriteRecipe = mongoose.connection.models.FavoriteRecipe;
} else {
  FavoriteRecipe = mongoose.model("FavoriteRecipe", favoriteRecipeSchema);
}

export default FavoriteRecipe;
