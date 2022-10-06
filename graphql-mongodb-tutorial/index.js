const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const PORT = process.env.PORT || 3000;

const app = express();

const students = [
  {
    _id: 1,
    firstName: 'Ilya',
    lastName: 'Korzhavin',
    gender: 'm',
    email: 'cerber941@gmail.com',
  },
  {
    _id: 2,
    firstName: 'Svetlana',
    lastName: 'Korzhavina',
    gender: 'm',
  },
];

const root = {
  getAllStudents: () => {
    return students;
  },
  getStudent: (id) => {
    return students.find((student) => student._id === id);
  },
  createStudent: ({ input }) => {
    const _id = Date.now();
    const student = { _id, ...input };
    students.push(student);
    return student;
  },
};

app.use('/graphql', graphqlHTTP({ graphiql: true, schema, rootValue: root }));

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
