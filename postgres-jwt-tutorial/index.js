const express = require('express');
const studentRouter = require('./routers/student.router');
const authRouter = require('./routers/auth.router');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/api/v1/students', studentRouter);
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
