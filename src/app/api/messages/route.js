//Adam Melvin
import connect from "@/utils/connect";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    await connect();
    const formData = await req.formData();
    const sender = formData.get("user");
    const receiver = formData.get("selectedUser");
    const messageBody = formData.get("messageBody");
    const newMessage = new Message({ sender, receiver, messageBody });
    let result = await newMessage.save();
    return NextResponse.json({
      Message: "Success",
      status: 201,
      message: result,
    });
  } catch (error) {
    console.error("Error Sending Messages:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

export const GET = async (req, res) => {
  await connect();
  const url = new URL(req.url, `http://${req.headers.host}`);
  const searchParams = url.searchParams;
  const user = searchParams.get("user");
  const otherUser = searchParams.get("selectedUser");
  //Get Conversations First
  try {
    // Query unique conversation threads
    const conversationThreads = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: user }, { receiver: user }],
        },
      },
      {
        $project: {
          _id: 1,
          sender: 1,
          receiver: 1,
          messageBody: 1,
          timestamp: 1,
        },
      },
      {
        // Create otherUser, differentiate between conversations where current user is the sender and receiver.
        $addFields: {
          otherUser: {
            $cond: {
              if: { $eq: ["$sender", user] },
              then: "$receiver",
              else: "$sender",
            },
          },
        },
      },
      {
        $sort: {
          otherUser: 1,
          timestamp: 1,
        },
      },
      {
        $group: {
          _id: "$otherUser",
          messages: { $push: "$$ROOT" },
        },
      },
    ]);

    //Get Individual Messages in a Conversations if otherUser is selected
    if (otherUser) {
      const messages = await Message.find({
        $or: [{ sender: user }, { receiver: user }],
      });
      return NextResponse.json({
        Message: "Success",
        status: 200,
        messages,
        conversationThreads,
      });
    } else {
      return NextResponse.json({
        Message: "Success",
        status: 200,
        conversationThreads,
      });
    }
  } catch (error) {
    console.error("Error Fetching Conversations:", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
