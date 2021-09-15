# JWT Authentication with Refresh Tokens

## NodeJs, ExpressJS, and Mongoose

Example to illustrate the workflow of an ExpressJS server that provides authentication and authorization mechanism with JWTs and refresh tokens.

## Endpoints

### Auth

- /api/auth/signup
  Registers new users into the system and returns the new created user, access token and refresh token.

- /api/auth/signin
  Signs in existing users and issues them access token and refresh token.

- /api/auth/signout
  Revokes current user's existing refresh token.

- /api/auth/refresh_token
  Returns a new access token, must be provided the refresh token.

## Setting up the project

Provide a `.env` file with the variables provided in `.env.example` template, and run:

```
npm i

```

to install dependencies.

Then run `npm run dev` for development, or `npm run start` to test in production.
