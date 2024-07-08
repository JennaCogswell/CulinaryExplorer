"use client";

import React, { useContext, useEffect, useState } from "react";
import FeatureItem from "../FeatureItem/FeatureItem";
import { usePathname } from "next/navigation";
import { Context } from "@/utils/ContextProvider";

/**
 * @author Santi Rijal
 */

const Feature = () => {
  const [foodItem, setFoodItem] = useState(undefined);
  const [displayMost, setDisplayMost] = useState("likes");

  const { recipes } = useContext(Context);

  const path = usePathname();

  const handleClick = (type) => {
    setDisplayMost(type);
  };

  useEffect(() => {
    const filterRecipes = () => {
      const filteredByFoodTypeData =
        path !== "/home"
          ? recipes?.filter(
              (recipe) => recipe.category === path.replace("/", "")
            )
          : recipes;

      const theMostValueRecipe = filteredByFoodTypeData?.reduce(
        (maxRecipe, currentRecipe) => {
          switch (displayMost) {
            case "likes":
              return currentRecipe.likes > maxRecipe.likes
                ? currentRecipe
                : maxRecipe;
            case "favourites":
              return currentRecipe.favourites > maxRecipe.favourites
                ? currentRecipe
                : maxRecipe;
            case "ratingScore":
              return currentRecipe.ratingScore > maxRecipe.ratingScore
                ? currentRecipe
                : maxRecipe;
          }
        },
        filteredByFoodTypeData[0]
      );

      if (theMostValueRecipe) {
        setFoodItem(theMostValueRecipe);
      } else {
        setFoodItem(undefined);
      }
    };

    filterRecipes();
  }, [recipes, displayMost, path]);

  return (
    <div className="bg-neutral-700 flex flex-col gap-y-[20px] md:rounded-3xl md:p-[1.2rem] sm:rounded-none">
      <header className="flex justify-between p-[1.2rem] md:px-0">
        <section className="text-light-gold md:text-2xl text-lg">Most:</section>
        <section className="flex justify-evenly items-center gap-x-[1.2rem] text-white md:text-[1rem] text-sm">
          <p
            className={`cursor-pointer ${
              displayMost === "likes" && "text-dark-gold"
            }`}
            onClick={() => handleClick("likes")}
          >
            Likes
          </p>
          <p
            className={`cursor-pointer ${
              displayMost === "favourites" && "text-dark-gold"
            }`}
            onClick={() => handleClick("favourites")}
          >
            Favourites
          </p>
          <p
            className={`cursor-pointer ${
              displayMost === "rates" && "text-dark-gold"
            }`}
            onClick={() => handleClick("rates")}
          >
            Rates
          </p>
        </section>
      </header>

      <FeatureItem foodItem={foodItem} />
    </div>
  );
};

export default Feature;
