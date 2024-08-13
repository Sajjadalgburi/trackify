import { Schema, model, models, Document } from "mongoose";
import { hash, compare } from "bcrypt";

// Define interfaces for user and methods
interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  image?: string;
  applications: Schema.Types.ObjectId[]; // Reference to Application model
}

interface UserMethods {
  isValidPassword: (password: string) => Promise<boolean>;
}

// Create user schema
const userSchema = new Schema<UserInterface & UserMethods>({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 15,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (email: string) => /^[^@]+@[^@]+\.[^@]+$/.test(email),
      message: "Please enter a valid email address",
    },
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 128,
    required: [true, "Password is required"],
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

// Pre-save hook to hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await hash(this.password, 10);
      next();
    } catch (error) {
      console.log(error as Error);
      next(error as Error); // Ensure errors are passed to the next middleware
    }
  } else {
    next();
  }
});

// Method to check if provided password is valid
userSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean> {
  return compare(password, this.password);
};

// Create and export the model
export const User =
  models.User || model<UserInterface & UserMethods>("User", userSchema);
