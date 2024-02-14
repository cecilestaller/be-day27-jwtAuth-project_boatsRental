import { User } from "../models/index.js";
import { generateRandomSalt, hashPassword } from "../utils/hash.js";
import { sendEmail } from "../utils/sendEmail.js";

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

  // --- Hier soll Verifizierungs-Email an User geschickt werden:

  // const sixDigitCode = 678900; // use random to generate!
  await sendEmail({
    to: email,
    subject: "Registration Successful!",
    text: `Hello ${name},
  welcome to Bootsverleih Gezeitenklo.
  Your registration was succesful. 
  Yours,
  Bootsverleih Team`,
  });

  return userToProfileInfo(user);
}

function userToProfileInfo({ name, email, bio, profilePictureUrl }) {
  return { name, email, bio, profilePictureUrl };
}
