import bcrypt from 'bcryptjs';
import db from '../database';
import { setCookie, signToken, getStatus, generateToken } from './utils/tokenUtils';
import { client } from '../database/redis';

const TOKEN_NAME = 'x-access-token';

const resolvers = {
  Query: {
    getUserByEmail: async (_: any, args: any): Promise<object> => {
      const {
        input: { email },
      } = args;
      return db.user.findOne({
        where: { email },
      });
    },
    isAuthenticated: async (
      _: any,
      _args: any,
      ctx: any
    ): Promise<{ status: number }> => {
      let isValid = false;
      const accessToken: string = generateToken(ctx.req.cookies[TOKEN_NAME]);
      const status: number = getStatus(accessToken);
      if (status === 200) {
        const invalidTokens = await client.lrange('invalid-tokens', 0, -1);
        isValid = !invalidTokens.includes(accessToken);
      } else if (accessToken) {
        client.lpush('invalid-tokens', accessToken);
        ctx.res.clearCookie(TOKEN_NAME);
      }
      return {
        status: isValid ? 200 : 401,
      };
    },
  },
  Mutation: {
    createUser: async (_: any, args: any, ctx: any): Promise<object> => {
      const {
        input: { email, password },
      } = args;
      let user;
      const salt: string = bcrypt.genSaltSync(10);
      try {
        user = await db.user.create({
          email,
          password: bcrypt.hashSync(password, salt),
        });
      } catch (err) {
        throw new Error(err);
      }
      const token: string = signToken(user);
      setCookie(token, ctx);
      const { id } = user;
      return {
        id,
        token,
        message: 'success',
      };
    },
    signInUser: async (_: any, args: any, ctx: object): Promise<object> => {
      const {
        input: { email, password },
      } = args;
      let user;
      try {
        user = await db.user.findOne({
          where: { email },
        });
      } catch (err) {
        throw new Error(err);
      }
      const isValidPassword: boolean = bcrypt.compareSync(password, user.password);
      if (isValidPassword) {
        const token: string = signToken(user);
        setCookie(token, ctx);
        const { id } = user;
        return {
          id,
          token,
          message: 'success',
        };
      } else {
        return {
          message: 'invalid password',
        };
      }
    },
    signOutUser: async (_: any, args: any, ctx: any): Promise<{ status: number }> => {
      const accessToken = generateToken(ctx.req.cookies[TOKEN_NAME]);
      if (accessToken) {
        client.lpush('invalid-tokens', accessToken);
      }
      ctx.res.clearCookie(TOKEN_NAME);
      return {
        status: 200,
      };
    },
  },
};

export default resolvers;
