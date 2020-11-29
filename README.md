# MERN Stack Authentication App

## Tech Stack

- NodeJS
- Express JS
- React + Redux
- MongoDB
- TypeScript (Frontend & Backend)
- Material UI

## Running Locally

### Enviroment Variables

You'll have to set these to run the project locally. The development connection string is the only db connection that's needed to run in dev mode.

- MONGO_TEST_URI (db connection string for running tests)
- MONGO_DEV_URI (db connection string for development)
- MONGO_PROD_URI (db connection string for production)
- JWT_SECRET (jwt secret key for authentication)
- PORT (for server to run)

**No Environment Variable needed in the client**

```bash
 npm i
```

(postinstall script will install client packages too)

```bash
 npm run dev
```

Starts client on port 3000 and server on port 4000
