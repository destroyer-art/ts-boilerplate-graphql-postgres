# Full Stack Boilerplate with JWT Authentication

## About

Full Stack boilerplate with JWT authentication.

Built with React, Typescript, Node, Express, GraphQL, PostgreSQL, Redis, and Webpack.

Uses custom hooks and [code splitting optimization](https://reactjs.org/docs/code-splitting.html) via route-based component lazy loading with the Suspense component.

Unexpired tokens on sign-out are stored in a redis list and checked against on all authentication attempts.

## Installation

Clone the repo:

```bash
git clone https://github.com/scottjason/ts-boilerplate-graphql-postgres.git
```

Then cd into the root directory and run `npm install`

## Local Development

Add a `.env` file in the root directory of the repo with the following, and update the values:

```bash
JWT_SECRET=enter your JWT secret, a long random string
DEV_ORIGIN=http://localhost:8080
PROD_ORIGIN=Enter your production origin
REDIS_URL=Enter your redis url ie redis://...
REDIS_TLS_URL=Enter your redis tls url ie rediss://...
DEV_DB_HOST=localhost
DEV_DB_USER=yourname
DEV_DB_PASSWORD=yourpassword
DEV_DB_NAME=testdb
DEV_DB_DIALECT=postgres
DEV_DB_MAX=5
DEV_DB_MIN=0
DEV_DB_ACQUIRE=30000
```

Then run `npm run dev` to start development and your browser should open to `http://localhost:8080`.

## Build

To build the production bundle, run `npm run build`

## Preview

Deployed to Heroku, [preview](https://ts-auth-graphql-postgres.herokuapp.com/) app.

![preview](https://portfolio-img-uploads.s3.us-west-1.amazonaws.com/ts-boilerplate-graphql-pg-preview.png)

## License

MIT License

Copyright (c) 2022 Scott Jason

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
