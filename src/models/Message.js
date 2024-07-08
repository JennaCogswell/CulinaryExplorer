//Adam Melvin
import mongoose from "mongoose";

const { Schema } = mongoose;

// Message schema.
const messageSchema = new Schema(
    {
      sender: {
        type: String,
        required: true,
      },
      receiver: {
        type: String,
        required: true,
      },
      messageBody: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        required: true,
        default: Date.now,
      },
    }
  );
  
  let Message;
  
  // Create a new schema if it doesn't exist.
  if (mongoose.connection.models.Message) {
    Message = mongoose.connection.models.Message;
  } else {
    Message = mongoose.model("Message", messageSchema);
  }
  
  export default Message;