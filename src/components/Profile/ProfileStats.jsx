"use client";

/**
 * @author Adam Sarty
 */
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Context } from "@/utils/ContextProvider";

const ProfileStats = ({ userInfo }) => {
  const { updateUser } = useContext(Context);
  const [editMode, setEditMode] = useState(false);
  const [aboutText, setAboutText] = useState(userInfo?.about || "");

  useEffect(() => {
    setAboutText(userInfo?.about || "");
  }, [userInfo?.about]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/profile/${userInfo?.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          about: aboutText,
          updateType: "about",
        }),
      });

      if (!response.ok) {
        console.error("Failed to save about description");
        alert("Failed to update the profile.");
        return;
      }

      await updateUser();
      setEditMode(false);
    } catch (error) {
      console.error("Error saving about description:", error);
      alert("Failed to update the profile.");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
          <Image
            src={
              userInfo?.image === "placeholder.png"
                ? "/uploads/placeholder.png"
                : userInfo?.image
            }
            alt="Profile Picture"
            className="rounded-full mb-4 sm:mb-0 sm:mr-4 w-[150px] h-[150px] object-cover border border-black shadow-md"
            width={150}
            height={150}
          />
          <h1 className="text-xl font-semibold">{userInfo?.name}</h1>
        </div>
        {/* Displaying user statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">
              {userInfo?.myRecipe?.length}
            </p>
            <p className="text-sm">Recipes</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">
              {userInfo?.followers?.length}
            </p>
            <p className="text-sm">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">
              {userInfo?.following?.length}
            </p>
            <p className="text-sm">Following</p>
          </div>
        </div>
      </div>
      <div className="about-section bg-gray-200 p-4 rounded-lg mb-7 shadow-md relative">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        {editMode ? (
          <>
            <textarea
              className="w-full p-2 mt-4 h-32 resize-none outline-none"
              value={aboutText}
              maxLength="255"
              onChange={(e) => setAboutText(e.target.value)}
            />
            <div className="text-right text-sm pr-2 pt-1">
              {`${aboutText.length}/255`}
            </div>
          </>
        ) : (
          <div className="mt-4">
            {aboutText.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        )}
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded absolute right-4 top-4"
          onClick={editMode ? handleSave : () => setEditMode(true)}
        >
          {editMode ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default ProfileStats;
