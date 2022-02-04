import { ITokens } from 'api/types';
import jwt_decode, { JwtPayload } from 'jwt-decode';

const ITEM_KEY = 'token';

export const setTokens = (tokens: ITokens) => {
  localStorage.setItem(ITEM_KEY, JSON.stringify(tokens));
};

export const removeTokens = () => {
  localStorage.removeItem(ITEM_KEY);
};

export const getTokens = (): ITokens | null => {
  const tokensString = localStorage.getItem(ITEM_KEY);

  if (!tokensString) return null;

  return JSON.parse(tokensString);
};

interface IClaims extends JwtPayload {
  username: string;
  role: string;
}

export const getDecodedToken = (): IClaims | null => {
  const tokensString = localStorage.getItem(ITEM_KEY);
  if (!tokensString) return null;

  const tokens = JSON.parse(tokensString);
  return jwt_decode(tokens.access.token);
};
