const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    phone: String!
  }

  input UserInput {
    _id: ID
    name: String!
    email: String!
    phone: String
  }

  input FilterUser {
    name: String
  }

  type Query {
    users(limit: Int, filter: FilterUser): [User]
  }

  type Mutation {
    createUser(user: UserInput): User
    updateUser(user: UserInput): User
    deleteUser(id: String): User
  }
`;

module.exports = {
  typeDefs,
};
