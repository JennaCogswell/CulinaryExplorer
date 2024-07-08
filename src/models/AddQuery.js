
/**
 * @Author Vrishti Dawra (B00906945)
 */
 
import mongoose from "mongoose";
const { Schema } = mongoose;

const addQuerySchema = new Schema({
  email: {
    type: String,
    required: true,
 
  },
  subject: {
    type: String,
    required: true,

  },
  message: {
    type: String, 
    required: true,

  }
});

let AddQuery;

// Create a new schema if it doesn't exist.
if (mongoose.connection.models.AddQuery) {
  AddQuery = mongoose.connection.models.AddQuery; 
} else {
  AddQuery = mongoose.model("AddQuery", addQuerySchema); 
}

export default AddQuery;
