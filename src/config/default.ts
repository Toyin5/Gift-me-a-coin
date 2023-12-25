export const accessTokenConfig = {
  duration: "15m",
  cookieName: "access_token",
  cookieOptions: { maxAge: 300000, httpOnly: true, secure: true },
};

export const refreshTokenConfig = {
  duration: "30m",
  cookieName: "refresh_token",
  cookieOptions: { maxAge: 3000000, httpOnly: true, secure: true },
};
