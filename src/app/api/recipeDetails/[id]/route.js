/**
 * @author Jenna Cogswell
 */

import connect from '@/utils/connect';
import Recipe from '@/models/Recipe';
import { NextResponse } from "next/server";

export const GET = async (req, {params}) => {
  if (req.method === 'GET') {
      try {
          await connect();

          let recipe;
          const id = params.id

          recipe = await Recipe.find({ _id: id });

          return NextResponse.json({ Message: "Success", status: 200, recipe });

      } catch (error) {
          console.error("Error fetching recipes:", error);
          return NextResponse.json({ Message: "Failed", status: 500 });
      }
  } else {
      return NextResponse.json({ Message: "Method Not Allowed", status: 405 });
  }
};