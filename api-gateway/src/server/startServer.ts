import { ApolloServer } from "apollo-server-express";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import resolvers from "#root/graphql/resolvers";
import schema from "#root/graphql/schema";

import formatGraphqlErrors from "./formatGraphqlErrors";
import injectUserSession from "./middleware/injectUserSession";

const PORT = config.get("PORT") as number;

const startServer = () => {
  const apolloServer = new ApolloServer({
    context: (a) => a,
    formatError: formatGraphqlErrors,
    resolvers,
    typeDefs: schema,
  });

  const app = express();

  app.use(cookieParser());

  app.use(
    cors({
      credentials: true,
      origin: (origin, cb) => cb(null, true),
    })
  );

  app.use(injectUserSession);

  apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

  app.listen(PORT, "0.0.0.0", () => {
    console.info(`API Gateway listening on ${PORT}`);
  });
};

export default startServer;
