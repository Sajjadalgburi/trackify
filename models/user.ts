import { Schema, model, models, Document } from "mongoose";

// Define interfaces for user and methods
interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  image?: string;
  applications: Schema.Types.ObjectId[]; // Reference to Application model
}

// Create user schema
const userSchema = new Schema<UserInterface>({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 15,
    trim: true,
    required: false,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: (email: string) => /^[^@]+@[^@]+\.[^@]+$/.test(email),
      message: "Please enter a valid email address",
    },
    required: false,
  },
  password: {
    type: String,
    minlength: 8,
    trim: true,
    maxlength: 128,
    required: false, // this is set to false because we will be using OAuth providers for login and users can login without password
  },
  image: {
    type: String,
    required: false,
    default: "/placeholder_img.png",
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

// Create and export the model
export const UserModel =
  models.User || model<UserInterface>("User", userSchema);
