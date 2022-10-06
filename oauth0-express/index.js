const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const isLoggedIn = require('./utils/isLoggedIn');

dotenv.config();

require('./auth');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);

app.get('/check-session', (req, res) => {
  req.sessionStore.all((err, sessions) => {
    console.log('sessions', sessions);
  });
  res.send();
});

app.get('/me', isLoggedIn, (req, res) => {
  res.json({ userId: req.user });
});

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/logout', async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.get('/auth/google', [
  passport.authenticate('google', { scope: ['email', 'profile'] }),
]);

app.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: process.env.FAILURE_LOGIN_URL,
    successRedirect: process.env.SUCCESS_LOGIN_URL,
  }),
  (req, res) => {
    res.send(`Thank you for signing in ${req.user}`);
  }
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user}`);
});

app.get('/failure', (req, res) => {
  res.send('Something went wrong...');
});

async function startMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URL, {
      useNewUrlParser: true,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
    });

    app.listen(PORT, () => {
      console.log('Listening on', PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startMongoDB();
