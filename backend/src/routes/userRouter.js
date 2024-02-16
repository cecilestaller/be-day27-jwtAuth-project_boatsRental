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
    // für COOKIE-SESSION
    req.session.refreshToken = result.tokens.refreshToken; // * Refresh-Token in Cookies Speichern
    console.log(req.session);

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

userRouter.post(
  "/logout",
  doJwtAuth, // validate the token in headers.authorization
  async function postLogoutCtrl(req, res) {
    try {
      if (req.verifiedUserClaims.type !== "refresh") {
        throw new Error("Token must be of type 'refresh'");
      }
      // valid refresh token
      // logout means setting refreshToken to null
      req.session.refreshToken = null;
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: error.message || "Could not logout user",
      });
    }
  }
);

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

userRouter.post("/verifyEmail", async function postVerifyEmailCtrl(req, res) {
  try {
    const userId = req.body.userId;
    const sixDigitCode = req.body.sixDigitCode;
    const result = await UserService.verifyEmail({
      userId,
      sixDigitCode, //! muss zurvor in seinem user-document in der DB gespeichert sein (HEIßT --> Anpassungen im registerUser-Service und im User-Model)
    });
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

userRouter.post("/resendEmail", async function postResendEmailCtrl(req, res) {
  try {
    const userId = req.body.userId;
    const result = await UserService.resendEmail({ userId });
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not resend verifaction email to user",
    });
  }
});

export default userRouter;
