"use client";

import React, { useContext, useEffect, useState } from "react";
import NewRecipeCard from "../NewRecipeCard/NewRecipeCard";
import { usePathname } from "next/navigation";
import { Context } from "@/utils/ContextProvider";

/**
 * @Author Santi Rijal
 */

const NewRecipes = () => {
  const { recipes } = useContext(Context);
  const [newRecipes, setNewRecipes] = useState([]);

  const path = usePathname();

  useEffect(() => {
    const filterRecipes = () => {
      const filteredByFoodTypeData = recipes?.filter(
        (recipe) => recipe.category === path.replace("/", "")
      );

      const filteredRecipes = filteredByFoodTypeData?.filter((recipe) => {
        const createdDate = new Date(recipe.createdAt);

        // Todays date
        const date = new Date();
        const todayDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );

        return createdDate.toDateString() === todayDate.toDateString();
      });

      if (filteredRecipes) {
        setNewRecipes(filteredRecipes);
      }
    };

    filterRecipes();
  }, [recipes, path]);

  return (
    <div className="bg-neutral-700 flex flex-col gap-y-[20px] md:rounded-3xl md:p-[1.2rem] sm:rounded-none">
      <header className="p-[1.2rem] md:px-0">
        <section className="text-light-gold md:text-2xl text-lg">
          New Recipes:
        </section>
      </header>

      <section className="bg-black md:rounded-3xl flex justify-start items-center p-[10px] box-border gap-x-[10px] overflow-x-auto">
        {newRecipes.length > 0 ? (
          newRecipes.map((recipe) => (
            <NewRecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p className="text-white min-h-[18rem] w-[100%] flex justify-center items-center">
            No new recipes today!
          </p>
        )}
      </section>
    </div>
  );
};

export default NewRecipes;
