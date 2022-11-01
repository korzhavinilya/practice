const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Class {
    _id: ID
    name: String!
    users: [User]
  }

  type User {
    _id: ID
    name: String!
    email: String!
    phone: String!
    class: Class
  }

  input UserInput {
    _id: ID
    name: String!
    email: String!
    phone: String
    classId: ID!
  }

  input FilterUser {
    name: String
  }

  type Query {
    classes: [Class]
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
