"use client";
/**
 * @author Jenna Cogswell
 *    worked on search feature (search input/bar, search results, search api)
 *    incorporated Ayush's RecipeList component to display the results
 */

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import RecipeList from "../RecipeList/RecipeList";
import { Context } from "@/utils/ContextProvider";

export default function Results() {
  const searchParams = useSearchParams();
  const searchTerms = searchParams.get("search");
  const [recipesFound, setRecipesFound] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState(0);

  const { user } = useContext(Context);

  useEffect(() => {
    const onSearch = async () => {
      try {
        const res = await fetch(`/api/search?search=${searchTerms}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          setRecipesFound(data.recipes);
          setMatches(data.maxScore);
        } else {
          window.alert("Failed to get results.");
        }
      } catch (err) {
        window.alert(err);
      } finally {
        setLoading(false);
      }
    };

    onSearch();
  }, [searchTerms]);

  if (loading) {
    return (
      <div className="h-fit w-max">
        <h1>Loading Search results...</h1>
      </div>
    );
  } else if (recipesFound.length > 0) {
    if (matches > 0) {
      return (
        <RecipeList
          recipes={recipesFound}
          activeTab="viewRecipes"
          user={user}
        />
      );
    } else {
      return (
        <div>
          <h1>No results for search term: {searchTerms}</h1>
          <h1>Showing all recipes.</h1>
          <RecipeList
            recipes={recipesFound}
            activeTab="viewRecipes"
            user={user}
          />
        </div>
      );
    }
  }
  // no results found - alert user
  else {
    return (
      <div className="h-fit w-max">
        <h1>No recipes found.</h1>
      </div>
    );
  }
}
