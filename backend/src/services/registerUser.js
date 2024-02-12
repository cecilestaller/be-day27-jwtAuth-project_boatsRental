import { User } from "../models/index.js";
import { generateRandomSalt, hashPassword } from "../utils/hash.js";

// userInfo := { name*, email*, password*, bio, profilePictureUrl }
export async function registerUser({
  name,
  email,
  password,
  bio,
  profilePictureUrl,
}) {
  const passwordSalt = generateRandomSalt();
  const passwordHash = hashPassword(password, passwordSalt);
  const user = new User({
    name,
    email,
    passwordHash,
    passwordSalt,
    bio,
    profilePictureUrl,
  });
  await user.save();
  return userToProfileInfo(user);
}

function userToProfileInfo({ name, email, bio, profilePictureUrl }) {
  return { name, email, bio, profilePictureUrl };
}
