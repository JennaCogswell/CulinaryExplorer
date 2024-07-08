"use client";

import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import RecipeList from "../RecipeList/RecipeList";
import AllRecipesHeader from "../AllRecipesHeader/AllRecipesHeader";
import { useSession } from "next-auth/react";
import { Context } from "@/utils/ContextProvider";

/**
 *
 * @author - Santi
 */

const AllRecipes = () => {
  const { recipes, user } = useContext(Context);
  const [foodTypeRecipes, setFoodTypeRecipes] = useState(undefined);
  const [searchedRecipes, setSearchedRecipes] = useState(undefined);

  const path = usePathname();
  const session = useSession();

  useEffect(() => {
    const filterRecipes = () => {
      const filteredByFoodTypeData = recipes?.filter(
        (recipe) => recipe.category === path.replace("/", "")
      );

      if (filteredByFoodTypeData && filteredByFoodTypeData.length > 0) {
        setFoodTypeRecipes(filteredByFoodTypeData);
      } else {
        setFoodTypeRecipes(undefined);
      }
    };

    filterRecipes();
  }, [recipes, path]);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();

    const searchedRecipes = value
      ? foodTypeRecipes?.filter(
          (recipe) =>
            recipe.recipeTitle.toLowerCase().includes(value) ||
            recipe.description.toLowerCase().includes(value)
        )
      : foodTypeRecipes;

    if (searchedRecipes) {
      setSearchedRecipes(searchedRecipes);
    } else {
      setSearchedRecipes(undefined);
    }
  };

  return (
    <div className="bg-ash-grey flex flex-col md:rounded-3xl max-h-[50rem]">
      <section className="bg-neutral-800 md:rounded-t-3xl">
        <AllRecipesHeader handleChange={handleChange} />
      </section>

      {foodTypeRecipes ? (
        <section className="overflow-y-auto py-[1.5rem] px-[3rem]">
          <RecipeList
            recipes={searchedRecipes ? searchedRecipes : foodTypeRecipes}
            activeTab={"viewRecipes"}
            user={user}
          />
        </section>
      ) : (
        <div className="text-black flex justify-center items-center h-[20rem] px-[10px]">
          There arent any {path.replace("/", "")} recipes in our database at the
          moment, come back later. Thank you.
        </div>
      )}
    </div>
  );
};

export default AllRecipes;
