const express = require('express');
const mongoose = require('mongoose');
const studentRoute = require('./routes/student.route');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api/v1/students', studentRoute);

async function startMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/test?authSource=admin', {
      useNewUrlParser: true,
      user: 'rootuser',
      pass: 'rootpass',
    });

    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startMongoDB();
