"use client";

import AllRecipes from "@/components/AllRecipes/AllRecipes";
import Feature from "@/components/Feature/Feature";
import NewRecipes from "@/components/NewRecipes/NewRecipes";
import React, { useEffect, useState } from "react";

const validPages = [
  "breakfast",
  "lunch",
  "dinner",
  "drinks",
  "dessert",
  "snacks",
];

/**
 *
 * @author Santi
 */

const FoodType = ({ params }) => {
  const [validPage, setValidPage] = useState(false);

  useEffect(() => {
    const valid = validPages.includes(params.slug);
    setValidPage(valid);
  }, [params]);

  return (
    validPage && (
      <div className="flex flex-col gap-y-[3rem]">
        <Feature />
        <NewRecipes />
        <AllRecipes />
      </div>
    )
  );
};

export default FoodType;
