"use client";

/**
 * @author Ayush Amrishbhai Patel - Designed the initial form and added the api for post recipe form.
 * @BannerId B00855591
 *
 * References:
 *   1. Line of Code Snippets: 55-59, 139-154
 *      Author: Uzochukwu Eddie Odozi
 *      URL: https://blog.logrocket.com/create-drag-and-drop-component-react-dropzone/
 *       Date Accessed: 05 February 2024
 *       Reason for usage: Used this website to understabd the react dropzone component for creating a dropbox for uploading images.
 *
 * @author Adam Sarty - added recipe count update method for user schema
 *
 * @author Jenna - added ingredients form label example, added authorEmail, added 6 allergens, made the ingredients and instructions input by adding items to a list, added more styling, changed cooking time to hours and minutes, added allergen default
 *
 * @author Santi - Came up with some new layout, copied author styling from NewRecipeCard component, made cooking time metric dropdown and implemented recipe edit
 */

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import addLogo from "@/images/addimage.png";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import successLogo from "@/images/success.png";
import { MultiSelect } from "react-multi-select-component";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import "./style.css";
import { useRouter } from "next/navigation";
import { Context } from "@/utils/ContextProvider";

const PostRecipe = ({ editRecipe }) => {
  const session = useSession();
  const { user, updateRecipes, updateUser } = useContext(Context);
  const [response, setResponse] = useState(null);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [category, setCategory] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [allergens, setAllergens] = useState([
    { label: "No known allergens", value: "No known allergens" },
  ]);
  const [image, setImage] = useState();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [missingDataPopupVisible, setMissingDataPopupVisible] = useState(false);
  const options = [
    { label: "No known allergens", value: "No known allergens" },
    { label: "Peanuts", value: "Peanuts" },
    { label: "Tree nuts", value: "Tree nuts" },
    { label: "Dairy", value: "Dairy" },
    { label: "Eggs", value: "Eggs" },
    { label: "Wheat", value: "Wheat" },
    { label: "Soy", value: "Soy" },
    { label: "Meat", value: "Meat" },
    { label: "Fish", value: "Fish" },
    { label: "Shellfish", value: "Shellfish" },
    { label: "Animal-derived Gelatin", value: "Animal-derived Gelatin" }, // Not suitable for vegetarians or vegans
    { label: "Honey", value: "Honey" }, // Not suitable for strict vegans
    { label: "Gluten", value: "Gluten" },
  ];

  const router = useRouter();

  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleAddIngredient = () => {
    if (ingredients.length < 30) {
      setIngredients([...ingredients, ""]);
    }
  };

  const handleRemoveIngredient = (index) => {
    if (ingredients.length > 1) {
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    }
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddInstruction = () => {
    if (instructions.length < 25) {
      setInstructions([...instructions, ""]);
    }
  };

  const handleRemoveInstruction = (index) => {
    if (instructions.length > 1) {
      const updatedInstructions = [...instructions];
      updatedInstructions.splice(index, 1);
      setInstructions(updatedInstructions);
    }
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const makeFd = () => {
    const allergenValues = allergens.map((allergen) => allergen.value);
    const fd = new FormData();
    fd.append("myfile", image);
    fd.append("recipeTitle", recipeTitle);
    fd.append("description", description);
    fd.append("ingredients", JSON.stringify(ingredients));
    fd.append("instructions", JSON.stringify(instructions));
    fd.append("hours", hours.toString());
    fd.append("minutes", minutes.toString());
    fd.append("category", category);
    fd.append("authorName", session?.data?.user?.name);
    fd.append("authorEmail", session?.data?.user?.email);
    fd.append("additionalNotes", additionalNotes);
    fd.append("difficultyLevel", difficultyLevel);
    fd.append("allergens", JSON.stringify(allergenValues));

    return fd;
  };

  const handlePostButtonClick = async () => {
    try {
      if (
        !image ||
        !recipeTitle ||
        !description ||
        instructions.length === 0 ||
        ingredients.length === 0 ||
        !category
      ) {
        setMissingDataPopupVisible(true);
        return;
      }

      const fd = makeFd();

      const res = await fetch("/api/recipes", {
        method: "POST",
        body: fd,
      });

      if (res.ok) {
        const responseData = await res.json();

        await updateRecipes();
        await updateUserRecipeCount(responseData?.recipe?._id);

        setResponse(responseData);
        setPopupMessage("Recipe posted successfully!!");
        setPopupVisible(true);
      } else {
        console.error("Failed to post recipe");
      }
    } catch (error) {
      console.error("Error posting recipe:", error);
    }
  };

  // Update recipe
  const handleUpdateButtonClick = async () => {
    try {
      if (
        !image ||
        !recipeTitle ||
        !description ||
        instructions.length === 0 ||
        ingredients.length === 0 ||
        !category
      ) {
        setMissingDataPopupVisible(true);
        return;
      }

      const fd = makeFd();

      const res = await fetch(`/api/recipes/${editRecipe?._id}`, {
        method: "PUT",
        body: fd,
      });

      if (res.ok) {
        await updateRecipes();

        const responseData = await res.json();
        setResponse(responseData);
        setPopupMessage("Recipe Updated successfully!!");
        setPopupVisible(true);
      } else {
        console.error("Failed to post recipe");
      }
    } catch (error) {
      console.error("Error posting recipe:", error);
    }
  };

  const updateUserRecipeCount = async (recipeId) => {
    try {
      const authorName = session?.data?.user?.name;
      console.log(authorName, recipeId);
      const res = await fetch(`/api/profile/${authorName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updateType: "addRecipe",
          recipeId: recipeId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user recipe count");
      }

      await updateUser();
      console.log("User recipe count updated successfully");
    } catch (error) {
      console.error("Error updating user recipe count:", error);
    }
  };

  useEffect(() => {
    if (editRecipe) {
      setRecipeTitle(editRecipe?.recipeTitle);
      setDescription(editRecipe?.description);
      setIngredients(editRecipe?.ingredients);
      setInstructions(editRecipe?.instructions);
      setHours(editRecipe?.hours);
      setMinutes(editRecipe?.minutes);
      setCategory(editRecipe?.category);
      setAdditionalNotes(editRecipe?.additionalNotes);
      setDifficultyLevel(editRecipe?.difficultyLevel);
    }
  }, [editRecipe]);

  return (
    <div className="p-4 w-full">
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg text-center">
            <div className="mb-4">
              <div className="relative w-48 h-48 mx-auto mb-2">
                <Image
                  src={successLogo}
                  alt="Description of the image"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p className="font-bold">{popupMessage}</p>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  window.location.href = `/profile/${response.recipe._id}`;
                }}
              >
                View Recipe
              </button>
            </div>
          </div>
        </div>
      )}

      {missingDataPopupVisible && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
              <p className="font-bold">Error:</p>
              <p>
                Please fill in all required fields (Recipe Image, Title,
                Description, Instructions, Category and Ingredients).
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setMissingDataPopupVisible(false)}
              >
                Go Back to Recipe Form
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-y-[20px]">
        <div
          {...getRootProps()}
          className="bg-gray-200 h-100 rounded-3xl mb-4 flex flex-col justify-center items-center"
          style={{ padding: "8.5rem" }}
        >
          <input {...getInputProps()} />
          <div
            className="bg-white rounded-3xl p-4 mb-4 shadow-md hover:cursor-pointer"
            title="Upload image"
          >
            {" "}
            {/* Container for image */}
            <div style={{ textAlign: "center" }}>
              <Image
                src={addLogo}
                alt="Description of the image"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div>
            {" "}
            {/* Container for text */}
            {image && (
              <p className="border bg-white p-2 w-full rounded-3xl">
                {image.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col gap-6 basis-2/3 w-full md:w-1/2 mr-24 mb-4 md:mb-0">
            <div className="input-container">
              <label className="block mb-2 font-bold">
                Recipe Name{" "}
                <span className="text-[0.8rem] opacity-[80%] font-light">
                  (Required)
                </span>
              </label>
              <input
                type="text"
                className="border p-2 w-full bg-gray-200 rounded-xl"
                value={recipeTitle}
                onChange={(e) => setRecipeTitle(e.target.value)}
              />
            </div>

            <div className="textarea-container">
              <label className="block mb-2 font-bold">
                Description{" "}
                <span className="text-[0.8rem] opacity-[80%] font-light">
                  (Required)
                </span>
              </label>
              <textarea
                className="border p-2 w-full h-32 bg-gray-200 rounded-xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-bold">
                Ingredients{" "}
                <span className="text-[0.8rem] opacity-[80%] font-light">
                  (Required)
                </span>
              </label>
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 input-container"
                >
                  <input
                    type="text"
                    className="border p-2 w-full bg-gray-200 rounded-xl mr-2"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                  />
                  {index !== 0 && (
                    <FiMinusCircle
                      className="text-red-700 cursor-pointer"
                      onClick={() => handleRemoveIngredient(index)}
                    />
                  )}
                </div>
              ))}
              {ingredients.length < 25 && (
                <div className="flex items-center">
                  <FiPlusCircle
                    className="text-lime-700 cursor-pointer"
                    onClick={handleAddIngredient}
                  />
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={handleAddIngredient}
                  >
                    Add Ingredient
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 font-bold">
                Instructions{" "}
                <span className="text-[0.8rem] opacity-[80%] font-light">
                  (Required)
                </span>
              </label>
              {instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 input-container"
                >
                  <span className="mr-2">{index + 1}.</span>
                  <input
                    type="text"
                    className="border p-2 w-full bg-gray-200 rounded-xl mr-2"
                    value={instruction}
                    onChange={(e) =>
                      handleInstructionChange(index, e.target.value)
                    }
                  />
                  {index !== 0 && (
                    <FiMinusCircle
                      className="text-red-700 cursor-pointer"
                      onClick={() => handleRemoveInstruction(index)}
                    />
                  )}
                </div>
              ))}
              {instructions.length < 25 && (
                <div className="flex items-center">
                  <FiPlusCircle
                    className=" text-lime-700 cursor-pointer"
                    onClick={handleAddInstruction}
                  />
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={handleAddInstruction}
                  >
                    Add Instruction
                  </span>
                </div>
              )}
            </div>

            <div className="flex-grow textarea-container">
              <label className="block mb-2 font-bold">Additional Notes:</label>
              <textarea
                className="border p-2 w-full h-32 bg-gray-200 rounded-xl"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col basis-1/3 gap-1 h-fit w-full md:w-1/2 mr-4 mb-4 md:mb-0">
            <div className="flex flex-col mb-5">
              <label className="block mb-2 font-bold">Author</label>
              <div className="flex items-center gap-2">
                <Image
                  src={
                    user?.image === "placeholder.png"
                      ? "/uploads/placeholder.png"
                      : user?.image
                  }
                  width={40}
                  height={40}
                  alt="Profile image"
                  className="rounded-full w-[40px] h-[40px] object-cover"
                />
                <p>{session?.data?.user?.name}</p>
              </div>
            </div>

            <div className="flex-grow mb-5 input-container">
              <label className="block mb-2 font-bold">Cooking Time</label>
              <div className="flex gap-2">
                <select
                  className="border p-2 w-1/2 bg-gray-200 rounded-xl"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                >
                  {hourOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour} {hour === 1 ? "hour" : "hours"}
                    </option>
                  ))}
                </select>
                <select
                  className="border p-2 w-1/2 bg-gray-200 rounded-xl"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                >
                  {minuteOptions.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute} {minute === 1 ? "minute" : "minutes"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-grow mb-5">
              <label className="block mb-2 font-bold">
                Category{" "}
                <span className="text-[0.8rem] opacity-[80%] font-light">
                  (Required)
                </span>
              </label>
              <select
                className="border p-2 w-full bg-gray-200 rounded-xl"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="dessert">Dessert</option>
                <option value="snacks">Snack</option>
                <option value="drinks">Drink</option>
                <option value="dinner">Dinner</option>
                <option value="lunch">Lunch</option>
              </select>
            </div>

            <div className="flex-grow mb-5">
              <label className="block mb-2 font-bold">Difficulty Level</label>
              <select
                className="border p-2 w-full bg-gray-200 rounded-xl"
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="flex-grow mb-5">
              <label className="block mb-2 font-bold">Allergens</label>
              <MultiSelect
                className="w-full-200 rounded-3xl"
                options={options}
                value={allergens}
                onChange={setAllergens}
                labelledBy="Select"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-[2rem]">
          <button
            className="bg-white font-bold text-black px-10 md:min-w-[10rem] md:py-[10px] py-1 border-2 border-dark-gold lg:text-sm rounded-full hover:border-dark-gold hover:bg-dark-gold hover:text-white active:opacity-70 sm:text-lg md:text-sm"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            className="bg-yellow-300 font-bold text-black px-10 md:min-w-[10rem] md:py-[10px] py-1 border-3 lg:text-sm rounded-full hover:border-dark-gold hover:bg-dark-gold hover:text-white active:opacity-70 sm:text-lg md:text-sm"
            onClick={
              editRecipe ? handleUpdateButtonClick : handlePostButtonClick
            }
          >
            {editRecipe ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostRecipe;
