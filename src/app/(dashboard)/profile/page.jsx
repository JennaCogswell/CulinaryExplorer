"use client";

/**
 * @author Ayush Patel
 * @author Adam Sarty
 *  Implemented fetchUserInfo and integrated Profile components.
 * @author Santi
 *  fixed backend issues and implemented redirect to login when user isnt authenticated.
 *  Styling.
 *  Changed fetch fav recipe functionality to filter users fav recipes from over all recipes using recipe id saved in user.
 */

import React, { useState, useEffect, useContext } from "react";
import { IoSettingsOutline, IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import RecipeList from "@/components/RecipeList/RecipeList";
import ProfileStats from "@/components/Profile/ProfileStats";
import TabNavigation from "@/components/Profile/TabNavigation";
import ProfileUpdate from "@/components/Profile/ProfileUpdate";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Context } from "@/utils/ContextProvider";

const Profile = () => {
  const session = useSession();
  const { recipes, user } = useContext(Context);
  const [activeTab, setActiveTab] = useState("myRecipes");
  const [myRecipes, setMyRecipes] = useState(undefined);
  const [favouriteRecipes, setFavouriteRecipes] = useState(undefined);
  const [error, setError] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const userRecipes = recipes?.filter((recipe) =>
        user?.myRecipe?.includes(recipe._id)
      );

      if (userRecipes && userRecipes.length > 0) {
        setMyRecipes(userRecipes);
      } else {
        setMyRecipes(undefined);
      }
    };

    const fetchFavRecipes = async () => {
      const userSavedRecipes = recipes?.filter((recipe) =>
        user?.savedRecipe?.includes(recipe._id)
      );

      if (userSavedRecipes && userSavedRecipes.length > 0) {
        setFavouriteRecipes(userSavedRecipes);
      } else {
        setFavouriteRecipes(undefined);
      }
    };

    if (activeTab === "myRecipes") fetchMyRecipes();
    else if (activeTab === "favouriteRecipes") fetchFavRecipes();
  }, [activeTab, user, recipes]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return session.status === "authenticated" ? (
    <div className="flex flex-col gap-y-8">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex justify-end items-center">
          {!showSettings ? (
            <IoSettingsOutline
              className="text-4xl cursor-pointer"
              onClick={toggleSettings}
            />
          ) : (
            <div className="flex justify-between w-full">
              <IoArrowBack
                className="text-4xl cursor-pointer"
                onClick={toggleSettings}
              />
            </div>
          )}
        </div>
      </div>
      {!showSettings ? (
        <>
          <ProfileStats userInfo={user} error={error} about={user?.about} />
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="mt-4 mb-8 bg-ash-grey p-4 rounded-3xl shadow-md">
              {activeTab === "myRecipes" &&
                (myRecipes ? (
                  <RecipeList
                    recipes={myRecipes}
                    activeTab={activeTab}
                    user={user}
                  />
                ) : (
                  <p className="text-center text-neutral-800">
                    Time to share your culinary creations!{" "}
                    <Link href={"/post"} className="underline text-black">
                      Post
                    </Link>{" "}
                    a recipe now.
                  </p>
                ))}
              {activeTab === "viewRecipes" && (
                <RecipeList
                  recipes={recipes}
                  activeTab={activeTab}
                  user={user}
                />
              )}
              {activeTab === "favouriteRecipes" &&
                (favouriteRecipes ? (
                  <RecipeList
                    recipes={favouriteRecipes}
                    activeTab={activeTab}
                    user={user}
                  />
                ) : (
                  <p className="text-center">
                    Find and favourite recipes to see them displayed here!
                  </p>
                ))}
            </div>
          </div>
        </>
      ) : (
        <ProfileUpdate userInfo={user} />
      )}
    </div>
  ) : (
    session.status !== "loading" && router.push("/login")
  );
};

export default Profile;
