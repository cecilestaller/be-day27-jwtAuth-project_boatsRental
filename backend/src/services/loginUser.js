import { User } from "../models/index.js";
import { hashPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";

export async function loginUser({ email, password }) {
  // 1. login credentials validieren
  const foundUser = await User.findOne({ email });
  if (!foundUser) throw new Error("User with this email doesn't exist");
  // check password
  const passwordHash = hashPassword(password, foundUser.passwordSalt);
  const correctPassword = passwordHash === foundUser.passwordHash;
  if (!correctPassword) throw new Error("Wrong password");
  // 2. token generieren und senden (user profile info noch fürs frontend)
  const accessToken = createToken(foundUser, "access"); // 1h
  const refreshToken = createToken(foundUser, "refresh"); // 10d
  return {
    user: userToProfileInfo(foundUser),
    tokens: { accessToken, refreshToken },
  };
}

function userToProfileInfo({ name, email, bio, profilePictureUrl }) {
  return { name, email, bio, profilePictureUrl };
}
