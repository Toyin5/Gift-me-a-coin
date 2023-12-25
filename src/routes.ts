import express from "express";
import { authRateLimiter } from "./middlewares/security";
import { authRouter } from "./routes/auth";

const router = express.Router();

router.use("/auth", authRateLimiter, authRouter);

export default router;
