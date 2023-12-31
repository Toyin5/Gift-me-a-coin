import { Router } from "express";
import validateSchema from "../middlewares/validate";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validations/auth";
import { signUp } from "../controllers";
import { signin } from "../controllers/auth/signin";
import { signout } from "../controllers/auth/signout";

const authRouter = Router();

authRouter.post("/login", validateSchema(loginUserValidation), signin);
authRouter.post("/register", validateSchema(registerUserValidation), signUp);
authRouter.delete("/logout", signout);

export { authRouter };
