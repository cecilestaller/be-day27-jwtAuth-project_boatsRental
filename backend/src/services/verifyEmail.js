import { User } from "../models/index.js";

export async function verifyEmail({ userId, sixDigitCode }) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.sixDigitCode !== sixDigitCode)
    throw new Error("Invalid six digit code");

  user.emailVerified = true;
  await user.save();
  return userToProfileInfo(user);
}

function userToProfileInfo({ name, email, bio, profilePictureUrl }) {
  return { name, email, bio, profilePictureUrl };
}
