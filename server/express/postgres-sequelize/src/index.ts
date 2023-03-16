import express from 'express';
import sequelize from './common/db/sequelize';
import errorHandler from './middlewares/error-handler.middleware';
import customerRouter from './routes/customers.route';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/api/v1/customers', customerRouter);

app.use(errorHandler);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase();
