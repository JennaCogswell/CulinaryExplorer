import { hash } from "bcryptjs";

import connect from "@/utils/connect";
import User from "@/models/User";
import { NextResponse } from "next/server";

/**
 * @Author Santi Rijal
 */

// Handle user registration.
export const POST = async (req) => {
  const { n, email, password } = await req.json(); // Get all values from req

  try {
    await connect(); // Connect to db
  } catch (err) {
    throw new Error("Connection to database failed. Try again.");
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Create new user
  const newUser = new User({
    name: n,
    email: email,
    password: hashedPassword,
  });

  // Try to save user
  try {
    await newUser.save();

    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    throw new Error("This accound already exists.");
  }
};
