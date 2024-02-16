import { User } from "../models/index.js";
import { generateRandomSalt, hashPassword } from "../utils/hash.js";
import { sendVerificationEmail } from "../utils/verificationEmail.js";

// userInfo := { name*, email*, password*, bio, profilePictureUrl }
export async function registerUser({
  name,
  email,
  password,
  bio,
  profilePictureUrl,
}) {
  const sixDigitCode = generateRandomSixDigitCode(); // wird verwendet um seine E-Mail zu verifizieren!

  const passwordSalt = generateRandomSalt();
  const passwordHash = hashPassword(password, passwordSalt);
  const user = new User({
    name,
    email,
    passwordHash,
    passwordSalt,
    bio,
    profilePictureUrl,
    sixDigitCode,
    emailVerified: false, // wird im /verifyEmail Endpoint auf true gesetzt wenn der übergeben sixDigitCode korrekt ist
  });
  await user.save();

  // --- Hier soll Verifizierungs-Email mit vorher generiertem 6-digit-Code an User geschickt werden:
  await sendVerificationEmail(user);

  return userToProfileInfo(user);
}

function userToProfileInfo({ _id, name, email, bio, profilePictureUrl }) {
  return { _id, name, email, bio, profilePictureUrl };
}

function generateRandomSixDigitCode() {
  return Math.random().toString().slice(2, 8);
}
