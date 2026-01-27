import type { User } from '@lerna/common';
import express from 'express';

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  const user: User = {
    name: 'Ilya',
    age: 26,
    friends: [
      {
        name: 'Sveta',
        age: 27,
        friends: []
      }
    ]
  };

  res.send(200);
});

app.listen(PORT, () => {
  console.log(`App is listening on`, PORT, `http://localhost:PORT`);
});
