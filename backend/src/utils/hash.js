import crypto from "crypto";

export function hash(inputStr) {
  return crypto.createHash("sha512").update(inputStr).digest("hex");
}

export function generateRandomSalt() {
  const BYTES_LENGTH = 64;
  return crypto.randomBytes(BYTES_LENGTH).toString("base64");
}

export function hashPassword(password, salt) {
  if (!password || !salt)
    throw new Error("password and salt must be defined for hashing");
  return hash(`${password}${salt}`);
}

// salt ≤--- randomSalt
// passwordHash <--- hash( password + salt)
// passwordSalt: salt
