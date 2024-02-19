import express from "express";
import http from "http";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";
import mercury from "@mercury-js/core";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { setContext } from "./helpers";
import { typeDefs, resolvers } from "./graphql";
// Connect models to the process. Mercury will generate the API/Query and Mutations
import "./models";
import "./profiles";
import "./hooks";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/hello", (req: any, res: any) => {
  res.send("Hello World")
});


mercury.addGraphqlSchema(typeDefs, resolvers);

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: mercury.typeDefs,
    resolvers: mercury.resolvers,
  })
);

(async function startApolloServer() {
  // connect db to mercury
  mercury.connect(process.env.DB_URL || "mongodb://localhost:27017/mercury-2-test");

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    introspection: true,
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    rootValue: () => {
      return {
        mercuryResolvers: mercury.resolvers,
      };
    },
  });
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => await setContext(req),
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4003 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();