import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a unique username..."],
      unique: [true, "Username already exists..."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password..."],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Please provide a unique email..."],
      unique: [true, "Email already exists..."],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    address: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model.Users || mongoose.model("User", UserSchema);
