"use client";

/**
 * @Author Ayush Amrishbhai Patel
 * @BannerId B00855591
 * @Description Designed the initial recipe card component along with other associated features.
 *
 * References:
 *   1. Author: Ayush Amrishbhai Patel
 *      URL: https://dal.brightspace.com/d2l/lms/dropbox/user/folders_history.d2l?db=212393&grpid=0&isprv=0&bp=0&ou=311813
 *       Date Accessed: 25 March 2024
 *       Reason for usage: USed my own code to design the recipe card from assignment-1
 *   2. Author: Javascript development team
 *      Line of code: 155 to 175
 *      URL: https://jsdev.space/nextjs-rating/
 *      Date Accessed: 25 March 2024
 *      Reason for USage: Used the website to learn about how to implement the ratings feature in next js project.
 *
 * @authors
 * Jenna Cogswell - added stop event propgations, made card a button routed to details page
 * Ayush Amrishbhai Patel - Creation of the cards and added the required popup menus
 * Santi - Styling and fav recipe delete as well as hiding fav icon on user's recipe. Added actual functionality to rating system,
 *        rather than displaying what the user rated the recipe, it now displays a rounded number of average.
 */

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import deleteLogo from "@/images/delete_image.png";
import favouritesLogo from "@/images/add_favourites.png";
import Rating from "../RatingRecipe/RatingRecipe";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Author from "../author/Author";
import { useSession } from "next-auth/react";
import { Context } from "@/utils/ContextProvider";

const RecipeCard = ({ recipe, index, activeTab, user }) => {
  const session = useSession();
  const { updateRecipes, updateUser } = useContext(Context);
  const [imageUrl, setImageUrl] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFavouritesPopup, setShowFavouritesPopup] = useState(false);
  const [showRatingsPopup, setShowRatingsPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [rating, setRating] = useState(recipe?.ratingScore || 0);
  const [showFavButton, setShowFavButton] = useState(true);

  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    let imagePath = "";
    if (recipe.image === "") {
      imagePath = `/uploads/image_not.png`;
    } else {
      imagePath = `${recipe.image}`;
    }

    setImageUrl(imagePath);
  }, [recipe]);

  const handleDelete = async () => {
    if (activeTab === "myRecipes") {
      try {
        const response = await fetch(
          `/api/recipes/${selectedRecipe}/${session?.data?.user?.name}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          await updateRecipes();
          setShowDeletePopup(false);
        } else {
          console.error("Failed to delete recipe");
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }

    if (activeTab === "favouriteRecipes") {
      try {
        const response = await fetch(
          `/api/favRecipe/${recipe?._id}/${session?.data?.user?.name}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          await updateUser();
          setShowDeletePopup(false);
        } else {
          console.error("Failed to delete favourite recipe");
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  const handleAddToFavorites = async (id) => {
    try {
      if (session?.status === "unauthenticated") {
        console.log("User is not logged in");
        return;
      }
      const url = `/api/favRecipe/${id}/${session?.data?.user?.name}`;
      const response = await fetch(url, {
        method: "POST",
      });
      if (response.ok) {
        await updateUser();

        const data = await response.json();
        setPopupMessage(data.Message);
        setShowFavouritesPopup(true);
        setShowFavButton(false);
      } else {
        const data = await response.json();
        setPopupMessage(data.Message || "Failed to add recipe to favorites");
        setShowFavouritesPopup(true);
      }
    } catch (error) {
      console.error("Error adding recipe to favorites:", error);
      setPopupMessage(`Error adding recipe to favorites: ${error.message}`);
      setShowFavouritesPopup(true);
    }
  };

  const handleRate = async (newRating) => {
    const fd = new FormData();
    fd.set("rating", newRating);
    fd.set("id", user?._id);

    try {
      const response = await fetch(`/api/recipes/${recipe?._id}`, {
        method: "PUT",
        body: fd,
      });

      if (response.ok) {
        await updateRecipes();
        const data = await response.json();
        setRating(data?.recipe?.ratingScore);
        setShowRatingsPopup(true);
      } else {
        console.error("Failed to update rating");
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  useEffect(() => {
    const handleShowFavButton = () => {
      const savedSavedRecipe = user?.savedRecipe?.includes(recipe._id);
      const usersRecipe = session?.data?.user?.name === recipe?.authorName;

      if (usersRecipe || savedSavedRecipe) {
        setShowFavButton(false);
      } else {
        setShowFavButton(true);
      }
    };

    if (session?.status === "authenticated") handleShowFavButton();
  }, [user]);

  return (
    <button
      key={index}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`${path}/${recipe._id}`);
      }}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 p-2"
    >
      <div className="rounded-3xl overflow-hidden shadow-lg bg-white text-light-gold relative hover:border-solid hover:border-dark-gold hover:border-[2px] box-border">
        {activeTab === "myRecipes" && (
          <button
            className="rounded-3xl bg-red-500 hover:bg-red-700 hover:text-white font-bold py-2 px-2 absolute top-2 right-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRecipe(recipe._id);
              setShowDeletePopup(true);
            }}
          >
            <Image src={deleteLogo} alt="Delete Icon" width={20} height={20} />
          </button>
        )}
        {activeTab === "viewRecipes" && showFavButton && (
          <button
            className="rounded-3xl bg-red-500 hover:bg-red-700 hover:text-white font-bold py-2 px-2 absolute top-2 right-2 z-[1]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRecipe(recipe._id);
              handleAddToFavorites(recipe._id);
            }}
          >
            <Image
              src={favouritesLogo}
              alt="Add to Favourite Icon"
              width={20}
              height={20}
            />
          </button>
        )}

        {activeTab === "favouriteRecipes" && (
          <button
            className="rounded-3xl bg-red-500 hover:bg-red-700 hover:text-white font-bold py-2 px-2 absolute top-2 right-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRecipe(recipe?.recipeid);
              setShowDeletePopup(true);
            }}
          >
            <Image src={deleteLogo} alt="Delete Icon" width={20} height={20} />
          </button>
        )}
        <div className="relative h-64">
          <Image
            src={imageUrl}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t"
          />
        </div>

        <div className="px-6 py-4 flex flex-col justify-between items-start gap-y-[10px] bg-neutral-700">
          <div className="font-bold text-xl text-nowrap w-[100%] overflow-hidden overflow-ellipsis text-left">
            {recipe.recipeTitle}
          </div>
          <p className="line-clamp-1 text-[0.9rem] text-left opacity-[90%]">
            {recipe?.description}
          </p>
          <div className="flex w-[100%] justify-start gap-x-[10px] items-center flex-wrap">
            {activeTab === "myRecipes" && (
              <Rating totalStars={5} initialRating={rating} />
            )}
            {activeTab === "viewRecipes" && (
              <Rating
                totalStars={5}
                initialRating={rating}
                onRate={user && handleRate}
              />
            )}
            {activeTab === "favouriteRecipes" && (
              <Rating
                totalStars={5}
                initialRating={rating}
                onRate={handleRate}
              />
            )}

            <p className="text-[0.7rem] opacity-[80%]">
              Rated by {recipe?.ratedBy?.length} users
            </p>
          </div>

          <Author recipe={recipe} />
        </div>
      </div>
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to remove this recipe?
            </p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeletePopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showFavouritesPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">{popupMessage}</p>
            <div className="flex justify-center">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFavouritesPopup(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showRatingsPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">
              Recipe Rated Successfully!!
            </p>
            <div className="flex justify-center">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRatingsPopup(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </button>
  );
};

export default RecipeCard;
