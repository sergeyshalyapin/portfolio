const refreshTokens = [];

export const addRefreshToken = (token) => {
  if (!refreshTokens.includes(token)) {
    refreshTokens.push(token);
  }
};

export const isRefreshTokenValid = (token) => {
  return refreshTokens.includes(token);
};

export const getRefreshTokens = () => [...refreshTokens]; // clone
