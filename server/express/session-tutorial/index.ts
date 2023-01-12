import express from 'express';
import session, { MemoryStore } from 'express-session';
import cookie from 'cookie-parser';
import connectRedis from 'connect-redis';
import redis from 'redis';

const redisStorage = connectRedis(session);
const redisClient = redis.createClient();

const PORT = 3000;

const app = express();
const sessionStore = new MemoryStore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(
  session({
    secret: 'you secret key',
    cookie: { maxAge: 40000 },
    // if true, generates a new req.sessionID on each request and passes to cookie
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.get('/me', (req, res) => {
  sessionStore?.get?.(req.sessionID || '', (err, session) => {
    res.send({ ...session, sessionId: req.sessionID });
  });
});

app.get('/sessions', (req, res) => {
  sessionStore?.all?.((err, sessions) => {
    res.send(sessions);
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    if (req.session?.authenticated) {
      res.send('You are already logged in');
    } else {
      if (req.session) {
        req.session.authenticated = true;
        req.session.user = {
          username,
          password,
        };
      }
      res.send('You have been logged in');
    }
  } else {
    res.send(400);
  }
});

app.listen(PORT, function () {
  console.log(`Server listens on port`, PORT);
});

// FIX broken express-session typing https://dev.to/qoobes/express-session-failing-with-typescript-types-express-session-1ehk
