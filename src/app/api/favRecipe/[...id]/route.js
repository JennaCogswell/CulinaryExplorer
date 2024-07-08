import connect from "@/utils/connect";
import User from "@/models/User";
import Recipe from "@/models/Recipe";
import FavoriteRecipe from "@/models/FavouriteRecipe";
import { NextResponse } from "next/server";

/**
 * @Author Santi Rijal - fixed Dynamic server usage issue with req.url and moved post and get to same file.
 * @Author Ayush Amrishbhai Patel - Added the GET and POST method. GET method gets the recipe based on username and POST helps in posting the recipe.
 */

export const GET = async (req, { params }) => {
  try {
    // Connect to the database
    await connect();

    const username = params.id[0];

    let recipes;

    // If username is provided, fetch recipes for that authorName
    recipes = await FavoriteRecipe.find({ addedBy: username });

    // Return the recipes as a JSON response
    return NextResponse.json({ Message: "Success", status: 200, recipes });
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

export const POST = async (req, { params }) => {
  const selectedRecipeId = params.id[0];
  const username = params.id[1];

  try {
    await connect();

    const existingFavorite = await FavoriteRecipe.findOne({
      recipeid: selectedRecipeId,
      addedBy: username,
    });

    if (existingFavorite) {
      return NextResponse.json({
        Message: "Recipe already added to favorites",
        status: 400,
      });
    }

    const recipe = await Recipe.findByIdAndUpdate(
      selectedRecipeId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!recipe) {
      return NextResponse.json({ Message: "Recipe not found", status: 404 });
    }

    const favoriteRecipe = new FavoriteRecipe({
      recipeTitle: recipe.recipeTitle,
      ingredients: recipe.ingredients,
      description: recipe.description,
      instructions: recipe.instructions,
      authorName: recipe.authorName,
      authorEmail: recipe.authorEmail,
      hours: recipe.hours,
      minutes: recipe.minutes,
      category: recipe.category,
      difficultyLevel: recipe.difficultyLevel,
      allergens: recipe.allergens,
      additionalNotes: recipe.additionalNotes,
      image: recipe.image,
      addedBy: username,
      recipeid: selectedRecipeId,
      rating: recipe.rating,
    });

    await favoriteRecipe.save();

    const recipeObject = recipe.toObject();

    // Update the user's savedRecipe array with the recipe details
    const user = await User.findOneAndUpdate(
      { name: username },
      { $addToSet: { savedRecipe: recipeObject } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ Message: "User not found", status: 404 });
    }

    return NextResponse.json({
      Message: "Recipe added to favorites",
      status: 200,
    });
  } catch (error) {
    console.error("Error adding recipe to favorites:", error);
    return NextResponse.json({
      Message: "Failed to add recipe to favorites",
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const id = params.id[0];
  const username = params.id[1];

  try {
    await connect();

    const deletedRecipe = await FavoriteRecipe.findOneAndDelete({
      recipeid: id,
    });

    if (!deletedRecipe) {
      return NextResponse.json({ Message: "Recipe not found", status: 404 });
    }

    await User.updateOne({ name: username }, { $pull: { savedRecipe: id } });

    return NextResponse.json({
      Message: "Recipe deleted successfully",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      Message: "Failed to delete favourite recipe",
      status: 500,
    });
  }
};
