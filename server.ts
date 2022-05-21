import 'dotenv/config';
import path from 'path';
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/schema';
import { middleware } from './middleware';
import resolvers from './graphql/resolvers';
import db from './database';

const { PORT, NODE_ENV, DEV_ORIGIN, PROD_ORIGIN } = process.env;

const app: express.Application = express();
const port: string | number = PORT || 3000;
const isDevelopment: boolean = NODE_ENV === 'development';
const staticDir: string = isDevelopment ? './dist' : '.';
const origin: string = isDevelopment ? DEV_ORIGIN : PROD_ORIGIN;

interface Opts {
  origin: string;
  credentials: boolean;
}

const cors: Opts = {
  origin,
  credentials: true,
};

middleware(app);

db.sequelize.authenticate();
db.sequelize.sync();

app.get('*', (_req: Request, res: Response): void => {
  res.sendFile('index.html', {
    root: path.join(__dirname, staticDir),
  });
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }): Promise<{ req: object; res: object }> => ({
    req,
    res,
  }),
});

(async (): Promise<void> => {
  await server.start();
  server.applyMiddleware({
    app,
    cors,
    path: '/graphql',
  });
  app.listen(port, () => {
    console.log(`Express server listeting on port ${port}`);
  });
})();
