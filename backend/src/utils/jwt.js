import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export function createToken(user, tokenType = "access") {
  const tokenPayload = {
    sub: user._id.toString(), // subject ist bei uns immer die user-id
    type: tokenType, // note: es kann auch andere tokenTypes geben (zb refresh, verifyEmail, resetPw)
  };
  const options = { algorithm: "HS256", expiresIn: "1h" }; // algorithm ist HS256 auch schon per default
  const tokenString = jwt.sign(tokenPayload, jwtSecret, options);
  return tokenString;
}
