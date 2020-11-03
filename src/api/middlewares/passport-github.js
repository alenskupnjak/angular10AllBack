const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/invoice.user.model');


exports.configureGithubStrategy = () => {
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (token, tokenSecret, profile, done) => {
        try {
          console.log('GITHUB accessToken: ', token);
          // find the user by github id
          const user = await User.findOne({ 'github.id': profile.id });
          // console.log(profile);
          if (user) {
            return done(null, user);
          }
          const newUser = new User({});
          newUser.github.id = profile.id;
          newUser.github.token = token;
          newUser.github.displayName = profile.displayName;
          newUser.github.email = profile.emails[0].value;
          await newUser.save();
          done(null, newUser);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
