import express from "express";
import { UserService } from "../services/index.js";
import { doJwtAuth } from "../middleware/doJwtAuth.js";

const userRouter = express.Router();

// refreshToken --> (new) accessToken (EXCHANGE 🤝)
userRouter.post(
  "/refreshToken",
  doJwtAuth, // validate the token in headers.authorization
  async function postRefreshTokenCtrl(req, res) {
    try {
      if (req.verifiedUserClaims.type !== "refresh") {
        throw new Error("Token must be of type 'refresh'");
      }
      // valid refresh token
      const authenticatedUserId = req.verifiedUserClaims.sub;
      const result = await UserService.refreshToken(authenticatedUserId);
      res.json({ success: true, result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not create refreshToken",
      });
    }
  }
);

userRouter.post("/login", async function postLoginUserCtrl(req, res) {
  try {
    const loginInfo = { email: req.body.email, password: req.body.password };
    //! Note: Hier brauchen wir loginService weil accessToken dort generiert wird
    const result = await UserService.loginUser(loginInfo);
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not register user",
    });
  }
});

// function userToProfileInfo({ name, email, bio, profilePictureUrl }) {
//   return { name, email, bio, profilePictureUrl };
// }

userRouter.post("/register", async function postRegisterUserCtrl(req, res) {
  try {
    const result = await UserService.registerUser(req.body);
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not register user",
    });
  }
});

export default userRouter;
