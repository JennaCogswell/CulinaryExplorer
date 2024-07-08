/**
 * @author Jenna - put method for adding follower + following, get method for getting followers + following lists, delete method for removing follower + following
 */

import connect from "@/utils/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    // Connect to the database
    await connect();

    const usernameToFollow = params.username[0];
    const usernameCurrent = params.username[1];

    const currentUser = await User.findOne({name: usernameCurrent});
    const userToFollow = await User.findOne({name: usernameToFollow});

    if(!currentUser || !userToFollow){
      console.log("users not found");
      return NextResponse.json({ Message: "User not found", status: 404 });
    }

    currentUser.following.push(userToFollow._id);
    await currentUser.save();

    userToFollow.followers.push(currentUser._id);
    await userToFollow.save();
    
    return NextResponse.json({ Message: "Success", status: 200});
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error following user:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    // Connect to the database
    await connect();

    const username = params.username[0];
    const listType = params.username[1];

    const user = await User.findOne({name: username});

    if(!user){
      return NextResponse.json({ Message: "User not found", status: 404 });
    }

    let list;
    if(listType === 'followers'){
      list = await User.find({_id: { $in: user.followers } }).select('name');
    }
    else if(listType === 'following'){
      list = await User.find({ _id: { $in: user.following } }).select('name');
    }
    else {
      return NextResponse.json({ Message: `Invalid list type ${listType}`, status: 400 });
    }
    
    return NextResponse.json({ Message: "Success", status: 200, data: list});
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error getting list:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    // Connect to the database
    await connect();

    const usernameToUnfollow = params.username[0];
    const usernameCurrent = params.username[1];

    const currentUser = await User.findOne({ name: usernameCurrent });
    const userToUnfollow = await User.findOne({ name: usernameToUnfollow });

    if (!currentUser || !userToUnfollow) {
      console.log("Users not found");
      return NextResponse.json({ Message: "User not found", status: 404 });
    }

    // Remove the userToUnfollow's _id from the following list of currentUser
    currentUser.following = currentUser.following.filter(id => id.toString() !== userToUnfollow._id.toString());
    await currentUser.save();

    // Remove the currentUser's _id from the followers list of userToUnfollow
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUser._id.toString());
    await userToUnfollow.save();

    return NextResponse.json({ Message: "Success", status: 200 });
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error unfollowing user:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
