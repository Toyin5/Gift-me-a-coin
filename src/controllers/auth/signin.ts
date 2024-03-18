import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import { accessTokenConfig, refreshTokenConfig } from "../../config/default";
import { createSession, createTokens } from "../../services/auth";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email }).select(
    "+loginRetries +isSuspended +verified +lastLogin +password"
  );
  if (!user) {
    return res.status(404).json({ err: "User not found" });
  }
  const isValidPassword = await user.verifyPassword(password);

  if (!isValidPassword) {
    await UserModel.findByIdAndUpdate(user._id, {
      $inc: { loginRetries: 1 },
    });
    return res.status(401).json({ err: "Incorrect password" });
  }
  if (user.isSuspended) {
    return res.status(403).json({ err: "Your account has been suspended" });
  }
  const sessionId = await createSession(user._id, req.get("user-agent") || "");
  const { accessToken, refreshToken } = createTokens(
    { id: user._id, verified: user.verified },
    sessionId
  );

  res.cookie(
    accessTokenConfig.cookieName,
    accessToken,
    accessTokenConfig.cookieOptions
  );
  res.cookie(
    refreshTokenConfig.cookieName,
    refreshToken,
    refreshTokenConfig.cookieOptions
  );
  if (!user.verified) {
    //resend verification email
    return res
      .status(401)
      .json({ err: "Your email address is not yet verified" });
  }
  await UserModel.findByIdAndUpdate(user._id, {
    loginRetries: 0,
    lastLogin: Date.now(),
    refreshToken,
  });

  return res.status(200).json({
    message: "Login successful",
  });
};
