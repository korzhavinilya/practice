const { ApolloServer } = require('apollo-server-express');
let { typeDefs } = require('./schema/TypeDefs');
let { resolvers } = require('./schema/Resolvers');

const express = require('express');

const PORT = 3001;

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const app = express();

(async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
})();

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  )
);
