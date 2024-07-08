"use client";
/**
 * @author Adam Sarty
 */
import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Context } from "@/utils/ContextProvider";

const ProfileUpdate = ({ userInfo }) => {
  const session = useSession();
  const { updateUser } = useContext(Context);
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadFeedback, setUploadFeedback] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setProfilePicture(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    },
  });

  const handleDeleteAccount = async () => {
    const username = session?.data?.user?.name;
    try {
      const response = await fetch(`/api/profile/${username}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await signOut();
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!profilePicture) {
      setUploadFeedback("Please select a picture to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      try {
        const response = await fetch(
          `/api/profile/${session?.data?.user?.name}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image: base64Image,
              updateType: "profilePicture",
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to upload profile picture.");

        const responseData = await response.json();
        setUploadFeedback(
          responseData.message || "Profile picture updated successfully!"
        );
        if (response.ok) await updateUser();
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setUploadFeedback(error.message || "Failed to upload profile picture.");
      }
    };
    reader.readAsDataURL(profilePicture);
  };

  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    const { newPassword } = data;

    try {
      const response = await fetch(
        `/api/profile/${session?.data?.user?.name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword, updateType: "password" }),
        }
      );
      const responseData = await response.json();
      const isMatch = await bcrypt.compare(currentPassword, userInfo.password);

      if (!isMatch) throw new Error("Incorrect password.");
      if (!response.ok)
        throw new Error(responseData.error || "Failed to change password");

      setFeedback({
        message: "Password successfully changed!",
        type: "success",
      });
      reset();
    } catch (error) {
      setFeedback({
        message: error.message || "An error occurred, please try again.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    return () => {
      if (profilePicture) URL.revokeObjectURL(profilePicture.preview);
    };
  }, [profilePicture]);

  return (
    <div className="mx-4 md:mx-8 lg:mx-12">
      <div className="mb-10 bg-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
        <hr className="mb-6 border-gray-300" />
        {/* Account Information Section */}
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Account Information (not changeable)
          </h3>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <div
            id="email"
            className="mt-1 p-2 bg-gray-100 text-gray-900 rounded border border-gray-300"
          >
            {session?.data?.user?.email || "No email address available"}
          </div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Username
          </label>
          <div
            id="username"
            className="mt-1 p-2 bg-gray-100 text-gray-900 rounded border border-gray-300"
          >
            {session?.data?.user?.name || "No username available"}
          </div>
        </div>
        <hr className="mb-6 border-gray-300" />
        {/* Profile Picture Upload Section */}
        <div className="container mx-auto">
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Profile Picture
          </h3>
          <div
            {...getRootProps()}
            className="border-dashed border-4 border-gray-300 rounded-lg p-10 mt-4 cursor-pointer flex flex-col justify-center items-center"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>
                Drag &apos;n&apos; drop a profile image here, or click to select
                a file.
              </p>
            )}
            {profilePicture && (
              <aside className="mt-4">
                <Image
                  src={profilePicture.preview}
                  alt="Profile preview"
                  width="200"
                  height="200"
                />
              </aside>
            )}
          </div>
          {/* Feedback and Button Container */}
          <div className="flex items-center mt-4 mb-8">
            <button
              onClick={handleProfilePictureUpload}
              className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition-colors duration-200"
            >
              Upload
            </button>
            {/* Conditionally rendered feedback message next to the button */}
            {uploadFeedback && (
              <p
                className={`ml-4 p-2 text-sm font-medium rounded ${
                  uploadFeedback.includes("successfully")
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {uploadFeedback}
              </p>
            )}
          </div>
        </div>
        <hr className="mb-6 border-gray-300" />
        {/* Password Change Section */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Change Password
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Current Password Input */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className="mt-1 p-2 w-full bg-white text-gray-900 rounded border border-gray-300"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            {/* New Password Input */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long, including at least one number and one special character.",
                  },
                })}
                className="mt-1 p-2 w-full bg-white text-gray-900 rounded border border-gray-300"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            {/* Confirm New Password Input */}
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                {...register("confirmNewPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === newPassword || "The passwords do not match",
                })}
                className="mt-1 p-2 w-full bg-white text-gray-900 rounded border border-gray-300"
              />
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
            {/* Submit Button and Feedback Message */}
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-800 text-white rounded transition-colors duration-200 py-2 px-4"
              >
                Change Password
              </button>
              {feedback.message && (
                <div
                  className={`flex items-center text-sm font-medium p-2 rounded ${
                    feedback.type === "error"
                      ? "text-red-600 bg-red-100"
                      : "text-green-600 bg-green-100"
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </div>
          </form>
          <hr className="mt-6 mb-2 border-gray-300" />
          {/* Button to trigger confirmation dialog, styled to match the rest of the form */}
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="mt-4 w-full bg-red-600 hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            DELETE ACCOUNT
          </button>

          {/* Confirmation Dialog, styled to match the form */}
          {showConfirmDialog && (
            <div className="mt-4 bg-red-100 p-4 rounded-lg shadow-inner">
              <p className="text-red-800 font-semibold mb-4">ARE YOU SURE?</p>
              <div className="flex justify-between">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                  YES, DELETE MY ACCOUNT
                </button>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
