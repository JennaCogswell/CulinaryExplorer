
/**
 * @Author Vrishti Dawra (B00906945)
 */
 
import { NextResponse } from "next/server";
import connect from "@/utils/connect";
import AddQuery from "@/models/AddQuery"; 

// Handle adding a query
export const POST = async (req) => {
  const { email, subject, message } = await req.json(); 

  await connect(); // Connect to db
  console.log("Connected to database successfully.");
  


  // Create new query
  const newQuery = new AddQuery({ 
    email: email,
    subject: subject,
    message: message 
  });

  //save query
  try {
    await newQuery.save();

    return new NextResponse("Form has been Submitted", {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
