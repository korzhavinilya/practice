const User = require('./models/user.model');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth2');

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const { id, provider, displayName, email } = profile;
      const user = await User.findOne({ googleId: id });

      if (user) {
        done(null, user);
      } else {
        const newUser = await User.create({
          googleId: id,
          provider,
          displayName,
          email,
        });

        done(null, newUser);
      }
    }
  )
);
