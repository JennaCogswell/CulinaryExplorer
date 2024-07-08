"use client";
/**
 * @author Jenna Cogswell
 */

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TitleImage from "./TitleImage";
import MainSection from "./MainSection";
import Aside from "./Aside";
import Reviews from "./Reviews";
import Image from "next/image";
import StarRating from "../RatingRecipe/RatingRecipe";
import favouritesLogo from "@/images/add_favourites.png";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TbHeartPlus } from "react-icons/tb";
import { useSession } from "next-auth/react";

export default function RecipeDetails() {
  const session = useSession();
  const [recipe, setRecipe] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const id = useParams().id;
  const [myRecipe, setMyRecipe] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFavouritesPopup, setShowFavouritesPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [likeError, setLikeError] = useState("");

  useEffect(() => {
    if (session?.status === "loading") {
      return;
    }

    const getDetails = async () => {
      try {
        const response = await fetch(`/api/recipeDetails/${id}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setRecipe(data.recipe[0]);
          if (
            session?.data &&
            session?.data?.user?.email === data.recipe[0].authorEmail
          ) {
            setMyRecipe(true);
          }
          setRating(data.recipe[0].rating);
          setLikes(data.recipe[0].likes);
        } else {
          console.error("Failed to get recipe details.");
        }
      } catch (error) {
        console.error("Error getting recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, []);

  const handleDelete = async () => {
    try {
      console.log(selectedRecipe);
      const response = await fetch(
        `/api/recipes/${selectedRecipe}/${session.data.user.name}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        router.push("/profile");
        window.location.reload();
      } else {
        console.error("Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleAddToFavorites = async (id) => {
    try {
      if (!session?.data) {
        console.log("User is not logged in");
        setLikeError("User not logged in.");
        return;
      }
      const url = `/api/favRecipe/${id}/${session?.data?.user?.name}`;
      const response = await fetch(url, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setPopupMessage(data.Message);
        setShowFavouritesPopup(true);
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

    try {
      const response = await fetch(`/api/recipe/${recipe?._id}`, {
        method: "PUT",
        body: fd,
      });

      if (response.ok) {
        setRating(newRating);
      } else {
        console.error("Failed to update rating");
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  if (loading) {
    return <div>Loading details...</div>;
  } else {
    return (
      <section className="flex flex-col w-full">
        <div className="m-2 h-fit w-full">
          <TitleImage recipe={recipe} myRecipe={myRecipe} />
        </div>

        <div className="m-2 p-5 flex justify-between">
          <div className="flex items-center gap-4">
            <h1 className=" text-4xl sm:text-5xl">{recipe.recipeTitle}</h1>
            {myRecipe && (
              <div className="text-[1.2rem] flex justify-center items-center gap-x-[1rem]">
                <button
                  className="rounded-3xl bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRecipe(recipe._id);
                    setShowDeletePopup(true);
                  }}
                >
                  <MdDelete />
                </button>

                <button
                  className="rounded-3xl bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRecipe(recipe._id);
                    handleEdit(recipe._id);
                  }}
                >
                  <MdModeEdit />
                </button>
              </div>
            )}
          </div>

          <div>
            {myRecipe && (
              <div className="flex items-center justify-end gap-4 h-[100%]">
                <StarRating
                  totalStars={5}
                  initialRating={rating}
                  onRate={() => {}}
                />
                <div className="rounded-3xl cursor-pointer bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-2 text-[1.2rem]">
                  <TbHeartPlus />
                </div>
                {likes} likes
              </div>
            )}

            {likeError && <div className="text-red-700">{likeError}</div>}

            {!myRecipe && (
              <div className="flex gap-4  items-center justify-end">
                <StarRating
                  totalStars={5}
                  initialRating={rating}
                  onRate={handleRate}
                />
                <button
                  className="rounded-3xl bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 "
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRecipe(recipe._id);
                    handleAddToFavorites(recipe._id);
                  }}
                >
                  <Image
                    src={favouritesLogo}
                    alt="Add to Favourite Icon"
                    width={25}
                    height={25}
                  />
                </button>
                {likes} likes
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row mx-2 my-6 h-fit w-full items-start justify-between">
          <div className=" my-1 h-full basis-2/3 mr-10 w-full">
            <MainSection recipe={recipe} myRecipe={myRecipe} />
          </div>

          <div className="my-1 h-fit basis-1/3 lg:basis-1/5 w-full">
            <Aside recipe={recipe} myRecipe={myRecipe} />
          </div>
        </div>

        <div className="m-2 mt-10 h-fit w-full p-5">
          <Reviews recipe={recipe} myRecipe={myRecipe} />
        </div>

        {showDeletePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
            <div className="bg-white p-8 rounded shadow-lg">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to remove this recipe?
              </p>
              <div className="flex justify-end">
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
      </section>
    );
  }
}
