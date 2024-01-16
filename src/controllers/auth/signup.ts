import { Request, Response } from "express";

import { createSession, createTokens } from "../../services/auth";
import { accessTokenConfig, refreshTokenConfig } from "../../config/default";
import UserModel from "../../models/UserModel";
import { sendMail } from "../../services/sendMail";
export const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, username } = req.body;
  if (!firstName || !lastName || !email || !password || !username) {
    return res.status(400).json({ err: "fields must not be empty" });
  }
  const userExists = await UserModel.findOne({ email: email });
  if (userExists) {
    return res.status(409).json({ err: "User with email already exists" });
  }
  const user = await UserModel.create({
    email,
    firstName,
    lastName,
    password,
    username,
  });

  // send a verification email
  await sendMail({
    type: "welcome",
    data: { name: user.firstName, to: user.email, url: "", priority: "1" },
  });
  const sessionId = await createSession(user._id, req.get("user-agent") || "");
  const { accessToken, refreshToken } = createTokens(user, sessionId);

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

  return res.status(201).json({
    message: "Registration successful",
  });
};
