const { ApolloServer } = require('apollo-server-express');
let { typeDefs } = require('./schema/TypeDefs');
let { resolvers } = require('./schema/Resolvers');

const express = require('express');

const PORT = 3001;
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () =>
    console.log('Now browse to http://localhost:' + PORT + server.graphqlPath)
  );
});
