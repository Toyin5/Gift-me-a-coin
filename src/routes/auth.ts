import { Router } from "express";
import validateSchema from "../middlewares/validate";
import {
  loginUserValidation,
  registerUserValidation,
  verifyUserValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../validations/auth";
import { signUp } from "../controllers";
import { signin } from "../controllers/auth/signin";
import { signout } from "../controllers/auth/signout";
import { verify } from "../controllers/auth/verify";
import { forgotPassword } from "../controllers/auth/forgot-password";
import { resetPassword } from "../controllers/auth/resetPassword";
import { authenticateUser } from "../middlewares/auth";

const authRouter = Router();

authRouter.post("/login", validateSchema(loginUserValidation), signin);
authRouter.post("/register", validateSchema(registerUserValidation), signUp);
authRouter.post(
  "/verify",
  validateSchema(verifyUserValidation),
  authenticateUser,
  verify
);
authRouter.post("/forgot-password",validateSchema(forgotPasswordValidation), authenticateUser, forgotPassword);
authRouter.post("/reset-password", validateSchema(resetPasswordValidation), authenticateUser, resetPassword);
authRouter.delete("/logout", authenticateUser, signout);

export { authRouter };
