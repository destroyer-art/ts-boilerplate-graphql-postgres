import jwt from 'jsonwebtoken';

type cookieOptsType = {
  path: string;
  httpOnly: boolean;
  secure: boolean;
};

const cookieOpts: cookieOptsType = {
  path: '/',
  httpOnly: true,
  secure: false,
};

export const signToken = (user: any) => {
  return jwt.sign({ _id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const setCookie = (token: string, ctx: any): void => {
  const headerKey = `x-access-token`;
  ctx.res.cookie(headerKey, JSON.stringify(token), cookieOpts);
};

export const generateToken = (str: string) => {
  if (str) {
    try {
      const token = JSON.parse(str);
      return token;
    } catch (err) {
      return null;
    }
  }
  return null;
};

export const isValidToken = (token: string) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }
  return null;
};

export const getStatus = (token: string): number => {
  return isValidToken(token) ? 200 : 401;
};
