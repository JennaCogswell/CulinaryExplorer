import connect from "@/utils/connect";
import User from "@/models/User";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

/**
 * @Author Santi Rijal - fixed Dynamic server usage issue with req.url and moved GET, PUT and DELETE into same file. Fixed the PUT method with the issue of recipe not bing updating when rating changed.
 *
 * @Author Ayush Amrishbhai Patel - Added the GET and Delete method. GET method gets the recipe based on username and DELETE helps in deleting the recipe.
 * 
 * @Author Adam Sarty - Moved and updated DELETE method to handle username param for removal from user's recipes.
 */

// delete recipe by id
export const DELETE = async (req, { params }) => {
  try {
    await connect();

    const recipeId = params.id;
    const user = params.username;

    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    await User.updateOne(
      { name: user },
      { $pull: { myRecipe: recipeId } }
    );

    if (!deletedRecipe) {
      return NextResponse.json({ Message: "Recipe not found", status: 404 });
    }

    return NextResponse.json({
      Message: "Recipe deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json({
      Message: "Failed to delete recipe",
      status: 500,
    });
  }
};