"use client";

/**
 * @author Jenna Cogswell
 */

import React, { useState, useEffect, useContext } from "react";
import Author from "../author/Author";
import { useSession } from "next-auth/react";
import { Context } from "@/utils/ContextProvider";

export default function Aside({ recipe, myRecipe }) {
  const [following, setFollowing] = useState(false);
  const session = useSession();
  const { updateUser } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session?.status === "loading") {
      return;
    }

    setErrorMessage("");

    if (session?.data && !myRecipe) {
      const getFollowList = async (username, listType) => {
        try {
          const response = await fetch(`/api/follow/${username}/${listType}`, {
            method: "GET",
          });
          const data = await response.json();
          if (response.ok) {
            // use data (list) to check if current user is in recipe.author followers list
            setFollowing(
              data.data.some((item) => item.name === session?.data?.user?.name)
            );
          } else {
            console.error(data.Message);
          }
        } catch (error) {
          console.error(
            `Error fetching ${listType} list for user ${username}:`,
            error
          );
        }
      };

      getFollowList(recipe.authorName, "followers");
    }
  }, [session, myRecipe, recipe.authorName]);

  const handleFollow = async () => {
    try {
      if (!session?.data) {
        console.log("User is not logged in");
        setErrorMessage("User not logged in.");
        return;
      }
      const url = `/api/follow/${recipe.authorName}/${session?.data?.user?.name}`;
      const response = await fetch(url, {
        method: "PUT",
      });
      if (response.ok) {
        await updateUser();

        setFollowing(true);
      } else {
        console.error("error trying to follow user");
        setErrorMessage("cannot follow user.");
      }
    } catch (e) {
      console.error("Error trying to follow:", e);
    }
  };

  const handleUnfollow = async () => {
    try {
      const url = `/api/follow/${recipe.authorName}/${session?.data?.user?.name}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        await updateUser();
        setFollowing(false);
      } else {
        console.error("error trying to unfollow user");
        setErrorMessage("cannot unfollow user.");
      }
    } catch (e) {
      console.error("Error trying to unfollow:", e);
    }
  };

  return (
    <div className="flex flex-col items-start justify-items-stretch lg:min-w-72 bg-gray-800 bg-opacity-90 rounded-3xl p-5 w-full text-white">
      <div className="flex flex-col w-full my-3">
        <h3 className="font-bold text-xl sm:text-2xl mb-2">Author</h3>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Author recipe={recipe} />
          </div>
          {!myRecipe && !following && (
            <button
              className="flex justify-end items-end bg-amber-200 rounded-full px-2 py-1 text-black"
              onClick={() => {
                handleFollow();
              }}
            >
              Follow
            </button>
          )}
          {!myRecipe && following && (
            <button
              className="flex justify-end items-end bg-amber-200 rounded-full px-2 py-1 text-black"
              onClick={() => {
                handleUnfollow();
              }}
            >
              Unfollow
            </button>
          )}
        </div>

        {!myRecipe && errorMessage && (
          <div className="text-red-400">{errorMessage}</div>
        )}
      </div>

      <div className="w-full my-3">
        <h3 className="font-bold text-xl sm:text-2xl mb-2">Category</h3>
        <p>{recipe.category}</p>
      </div>

      <div className="w-full my-3">
        <h3 className="font-bold text-xl sm:text-2xl mb-2">Cooking time</h3>
        <p>
          {recipe.hours} hours and {recipe.minutes} minutes
        </p>
      </div>

      <div className="w-full my-3">
        <h3 className="font-bold text-xl sm:text-2xl mb-2">Difficulty Level</h3>
        <p>{recipe.difficultyLevel}</p>
      </div>
    </div>
  );
}
