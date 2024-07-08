import { NextResponse } from "next/server";
import connect from "@/utils/connect";
import Recipe from "@/models/Recipe";

/**
 * @Author Santi Rijal - fixed Dynamic server usage issue with req.url and moved post and get to same file.
 * Jenna - added .save error catching, and split for ingredients, instructions, and allergens, changed cooking time to hours and minutes
 */

export const GET = async () => {
  try {
    await connect();

    const recipes = await Recipe.find();

    return NextResponse.json({ Message: "Success", status: 200, recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("myfile");
  if (!file) {
    return new Response(JSON.stringify({ error: "No files received." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const imageBase64String = `data:image/jpeg;base64,${base64}`;

  try {
    await connect();

    const ingredients = JSON.parse(formData.get("ingredients") || "[]");
    const instructions = JSON.parse(formData.get("instructions") || "[]");
    const allergens = JSON.parse(formData.get("allergens") || "[]");

    const newRecipe = new Recipe({
      recipeTitle: formData.get("recipeTitle"),
      ingredients,
      instructions,
      description: formData.get("description"),
      authorName: formData.get("authorName"),
      authorEmail: formData.get("authorEmail"),
      hours: formData.get("hours"),
      minutes: formData.get("minutes"),
      category: formData.get("category"),
      difficultyLevel: formData.get("difficultyLevel"),
      allergens,
      additionalNotes: formData.get("additionalNotes"),
      image: imageBase64String,
    });

    const result = await newRecipe.save();

    return new Response(
      JSON.stringify({
        message: "Success",
        recipe: result,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error occurred", error);
    return new Response(
      JSON.stringify({ message: "Failed", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
