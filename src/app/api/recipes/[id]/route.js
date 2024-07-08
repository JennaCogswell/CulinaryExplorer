import connect from "@/utils/connect";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

/**
 * @authors
 * Santi Rijal - fixed Dynamic server usage issue with req.url and moved GET, PUT and DELETE into same file. Fixed the PUT method to be able to update an edited recipe. Rating functionality.
 * Ayush Amrishbhai Patel - Added the GET and Delete method. GET method gets the recipe based on username and DELETE helps in deleting the recipe.
 * Adam Sarty - Moved DELETE method to handle username param for removal from user's recipes.
 */

// get recipes of user with object id passed in
export const GET = async (req, { params }) => {
  try {
    await connect();
    const username = params.id;

    const recipes = await Recipe.find({ authorName: username });

    return NextResponse.json({ Message: "Success", status: 200, recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  const id = params.id;
  const formData = await req.formData();

  try {
    await connect();

    const updateObject = {};

    if (formData.has("myfile")) {
      const file = formData.get("myfile");
      if (file && file.size > 0) {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        const imageBase64String = `data:image/jpeg;base64,${base64}`;
        updateObject.image = imageBase64String;
      }
    }
    if (formData.has("recipeTitle"))
      updateObject.recipeTitle = formData.get("recipeTitle");
    if (formData.has("ingredients")) {
      const ingredients = JSON.parse(formData.get("ingredients") || "[]");
      updateObject.ingredients = ingredients;
    }
    if (formData.has("instructions")) {
      const instructions = JSON.parse(formData.get("instructions") || "[]");
      updateObject.instructions = instructions;
    }
    if (formData.has("description"))
      updateObject.description = formData.get("description");
    if (formData.has("authorName"))
      updateObject.authorName = formData.get("authorName");
    if (formData.has("authorEmail"))
      updateObject.authorEmail = formData.get("authorEmail");
    if (formData.has("hours")) updateObject.hours = formData.get("hours");
    if (formData.has("minutes")) updateObject.minutes = formData.get("minutes");
    if (formData.has("category"))
      updateObject.category = formData.get("category");
    if (formData.has("difficultyLevel"))
      updateObject.difficultyLevel = formData.get("difficultyLevel");
    if (formData.has("allergens")) {
      const allergens = JSON.parse(formData.get("allergens") || "[]");
      updateObject.allergens = allergens;
    }
    if (formData.has("additionalNotes"))
      updateObject.additionalNotes = formData.get("additionalNotes");
    if (formData.has("myFile")) {
      const file = formData.get("myfile");

      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const imageBase64String = `data:image/jpeg;base64,${base64}`;

      updateObject.image = imageBase64String;
    }
    if (formData.has("likes")) updateObject.likes = formData.get("likes");
    if (formData.has("favourites"))
      updateObject.favourites = formData.get("favourites");

    const recipe = await Recipe.findByIdAndUpdate(id, updateObject, {
      new: true,
    });

    const alreadyInArray = recipe?.ratedBy?.includes(formData.get("id"));

    const rating = recipe?.rating + Number(formData.get("rating"));

    const score = Math.round(
      rating /
        (alreadyInArray ? recipe?.ratedBy?.length : recipe?.ratedBy?.length + 1)
    );

    let recipe2;

    if (alreadyInArray) {
      recipe2 = await Recipe.findByIdAndUpdate(
        id,
        {
          $set: { ratingScore: score, rating: rating },
        },
        { new: true }
      );
    } else {
      recipe2 = await Recipe.findByIdAndUpdate(
        id,
        {
          $addToSet: { ratedBy: formData.get("id") },
          $set: { ratingScore: score, rating: rating },
        },
        { new: true }
      );
    }

    if (!recipe || !recipe2) {
      return NextResponse.json({
        Message: "Recipe not found",
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Success",
        recipe: recipe2,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return NextResponse.json({
      Message: "Failed to update recipe",
      status: 500,
    });
  }
};
