const express = require('express');
const studentRouter = require('./routes/student.route');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/api/v1/students', studentRouter);

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
