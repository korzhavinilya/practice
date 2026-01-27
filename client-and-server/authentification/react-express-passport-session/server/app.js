require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var cors = require('cors');

var SQLiteStore = require('connect-sqlite3')(session);

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var testRouter = require('./routes/test');

var app = express();

app.locals.pluralize = require('pluralize');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'keyboard cat',
    // if it's false, then we need to implement req.session.touch() to update maxAge of a session
    // if it's true, it will be updated each request time
    resave: false,
    saveUninitialized: false,
    // cookie: { httpOnly: true },
    // cookie: { maxAge: 5000 }, // will be expired in 5 sec
    store: new SQLiteStore({ db: 'sessions.db', dir: 'var/db' })
  })
);
app.use(passport.initialize());
// app.use(passport.authenticate('session'));
app.use(passport.session()); // alias

require('./lib/passport');

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/v1', testRouter);

app.use('/dev', (req, res, next) => {
  // console.log(req.login, req.logout);
  console.log('session', req.session);
  console.log('sessionID', req.sessionID);
  console.log('user', req.user);
  res.status(201).send({ greeting: 'Hello World!' });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
