import { Request, Response } from "express";

import { createSession, createTokens } from "../../services/auth";
import { accessTokenConfig, refreshTokenConfig } from "../../config/default";
import UserModel from "../../models/UserModel";
import { sendMail } from "../../services/sendMail";
import generateToken from "../../helpers/generateToken";
import verifyModel from "../../models/verifyModel";
export const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, username } = req.body;
  if (!firstName || !lastName || !email || !password || !username) {
    return res.status(400).json({ err: "fields must not be empty" });
  }
  const userExists = await UserModel.findOne({ email: email });
  if (userExists) {
    return res
      .status(409)
      .json({ status: 409, error: "User with email already exists" });
  }
  const user = await UserModel.create({
    email,
    firstName,
    lastName,
    password,
    username,
  });

  const token = generateToken();

  await verifyModel.create({
    userId: user._id,
    token: token,
  });

  // send a verification email
  await sendMail({
    type: "welcome",
    data: { name: user.firstName, to: user.email, token: token, priority: "1" },
  });
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

  return res.status(201).json({
    status: 201,
    message: "Registration successful",
  });
};
