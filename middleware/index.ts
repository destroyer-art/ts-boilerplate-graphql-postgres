import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';

const isDevelopment: boolean = process.env.NODE_ENV === 'development';
const staticDir: string = isDevelopment ? './dist' : '.';

export const middleware = (app: express.Application): void => {
  app.use(compression());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, staticDir)));
};
