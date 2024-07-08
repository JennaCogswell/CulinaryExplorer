"use client";

/**
 * @author Jenna
 */

import { useContext, useEffect, useState } from "react";
import RecipeList from "@/components/RecipeList/RecipeList";
import { useSession } from "next-auth/react";
import { Context } from "@/utils/ContextProvider";

export default function Fyp() {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState([]);
  const [recipesFound, setRecipesFound] = useState([]);

  const { user } = useContext(Context);

  useEffect(() => {
    if (session?.status === "loading") {
      setLoading(true);
      return;
    }

    const getFollowingList = async () => {
      try {
        const res = await fetch(
          `/api/follow/${session?.data?.user?.name}/following`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          const data = await res.json();
          setFollowing(data.data);

          // Array to store all recipes found
          let allRecipes = [];

          // Fetch recipes for each followed user
          for (const user of data.data) {
            const userRecipesRes = await fetch(`/api/recipes/${user.name}`, {
              method: "GET",
            });

            if (userRecipesRes.ok) {
              const userData = await userRecipesRes.json();
              allRecipes = allRecipes.concat(userData.recipes);
            } else {
              console.error(`Failed to fetch recipes for ${user.name}`);
            }
          }

          // Set recipesFound state to unique recipes
          setRecipesFound(Array.from(new Set(allRecipes)));
        } else {
          console.log("Failed to get following list.");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getFollowingList();
  }, [session, setLoading]);

  if (loading) {
    return (
      <div className="h-fit w-max">
        <h1>Loading recipes...</h1>
      </div>
    );
  }

  if (following?.length === 0) {
    return (
      <div className="h-fit w-max">
        <h1>
          You are currently not following any users. When you follow a user
          their recipes will show up here.
        </h1>
      </div>
    );
  }

  if (recipesFound?.length > 0) {
    return (
      <RecipeList recipes={recipesFound} activeTab="viewRecipes" user={user} />
    );
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
