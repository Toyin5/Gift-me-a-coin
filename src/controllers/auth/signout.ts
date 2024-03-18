import { Request, Response } from "express";
import { deleteSession } from "../../services/auth";
import { accessTokenConfig, refreshTokenConfig } from "../../config/default";
export const signout = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.sessionId;

  await deleteSession(sessionId);
  res.clearCookie(accessTokenConfig.cookieName);
  res.clearCookie(refreshTokenConfig.cookieName);

  return res.send("successfully logged out");
};
