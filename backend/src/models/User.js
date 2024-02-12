import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    bio: { type: String },
    profilePictureUrl: { type: String },
  },
  { collection: "users", timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
