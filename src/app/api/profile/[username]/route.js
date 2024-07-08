/**
 * @author Adam Sarty
 */
import connect from "@/utils/connect";
import User from "@/models/User";
import Recipe from "@/models/Recipe";
import FavoriteRecipe from "@/models/FavouriteRecipe";
import Message from "@/models/Message";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const GET = async (req, { params }) => {
  const username = params.username;

  try {
    await connect();

    const userInfo = await User.findOne({ name: username }).lean();

    if (!userInfo) {
      return NextResponse.json({ message: "User Not Found", status: 404 });
    }

    return NextResponse.json({ message: "Success", status: 200, userInfo });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const username = params.username;

  try {
    await connect();

    // Attempt to find and delete the user
    const userToDelete = await User.findOne({ name: username }).select("_id");
    if (!userToDelete) {
      return NextResponse.json({ message: "User Not Found", status: 404 });
    }
    const userId = userToDelete._id;
    await User.deleteOne({ _id: userId });

    // Find and delete the user's recipes, and collect their IDs
    const recipesToDelete = await Recipe.find({ authorName: username }).select(
      "_id"
    );
    const recipeIds = recipesToDelete.map((recipe) => recipe._id);
    await Recipe.deleteMany({ authorName: username });

    // Remove the user's recipes from all users' savedRecipe arrays
    if (recipeIds.length > 0) {
      await User.updateMany({}, { $pull: { savedRecipe: { $in: recipeIds } } });
    }

    // Delete the user's favourite recipes and messages
    await FavoriteRecipe.deleteMany({ addedBy: username });
    await Message.deleteMany({
      $or: [{ sender: username }, { receiver: username }],
    });

    // Remove the user's ID from the following and followers arrays of all users
    await User.updateMany(
      {},
      { $pull: { following: userId, followers: userId } }
    );

    return NextResponse.json({
      message: "User and associated data deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user and associated data:", error);
    return NextResponse.json({
      message: "Failed to delete user and associated data",
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  const username = params.username;

  try {
    const body = await req.json();
    await connect();
    let updateResult;

    switch (body.updateType) {
      case "profilePicture":
        const imageData = body.image;
        updateResult = await User.findOneAndUpdate(
          { name: username },
          { $set: { image: imageData } },
          { new: true }
        );
        break;

      case "about":
        updateResult = await User.findOneAndUpdate(
          { name: username },
          { $set: { about: body.about } },
          { new: true }
        );
        break;

      case "password":
        const hashedPassword = await bcrypt.hash(body.newPassword, 10);
        updateResult = await User.findOneAndUpdate(
          { name: username },
          { $set: { password: hashedPassword } },
          { new: true }
        );
        break;

      case "addRecipe":
        updateResult = await User.findOneAndUpdate(
          { name: username },
          { $addToSet: { myRecipe: body.recipeId } },
          { new: true }
        );
        break;

      default:
        return NextResponse.json({
          message: "Invalid update type",
          status: 400,
        });
    }

    if (!updateResult) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json({
      message: "User profile updated successfully",
      status: 200,
      userInfo: updateResult,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({
      message: "Failed to update profile",
      status: 500,
    });
  }
};
