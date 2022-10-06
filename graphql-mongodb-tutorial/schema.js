const { buildSchema } = require('graphql');

const schema = buildSchema(`

    type student {
        _id: ID,
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        favoriteSubjects: [String]
    }

    input StudentInput {
        _id: ID,
        firstName: String!,
        lastName: String!,
        email: String,
        gender: String!,
        favoriteSubjects: [String]
    }

    type Query {
        getAllStudents: [student],
        getStudent(id: ID): student
    }

    type Mutation {
        createStudent(input: StudentInput): student
    }
`);

module.exports = schema;
