export const accessTokenConfig = {
  duration: "15m",
  cookieName: "gmac-access_token",
  cookieOptions: { maxAge: 300000, httpOnly: true, secure: true },
};

export const refreshTokenConfig = {
  duration: "30m",
  cookieName: "gmac-refresh_token",
  cookieOptions: { maxAge: 3000000, httpOnly: true, secure: true },
};
