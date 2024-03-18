import { get } from "lodash";
import SessionModel from "../models/Session";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { accessTokenConfig, refreshTokenConfig } from "../config/default";
import { UserDocument } from "../models/UserModel";

export const createSession = async (
  userId: string,
  userAgent: string
): Promise<string> => {
  const session = await SessionModel.create({ userId, userAgent });

  return session._id;
};

export const deleteSession = async (sessionId: string) => {
  await SessionModel.findByIdAndDelete(sessionId);
};

export const createTokens = (user: object, sessionId: string) => {
  const accessToken = signJwt(
    { user, sessionId },
    { expiresIn: accessTokenConfig.duration }
  );
  const refreshToken = signJwt(
    { sessionId },
    { expiresIn: refreshTokenConfig.duration }
  );

  return { accessToken, refreshToken };
};

export const reissueTokens = async (refreshToken: string) => {
  const { decodedValue, expired } = verifyJwt(refreshToken);
  const sessionId = get(decodedValue, "sessionId");
  if (!decodedValue || !sessionId || expired) return null;

  const session = await SessionModel.findById(sessionId);
  if (!session || !session.valid) return null;

  const newTokens = createTokens(decodedValue.user, session._id);

  return newTokens;
};
