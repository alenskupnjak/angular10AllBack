const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/invoice.user.model');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
exports.configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('accessToken: ', accessToken);
          console.log('refreshToken: ', refreshToken);
          // console.log('profile: ', profile);
          console.log('+++++');
          

          // const user = await User.findOrCreate({ 'google.id': profile.id }, (err, user) => done(err, user));

          // find the user by google id
          const user = await User.findOne({ 'google.id': profile.id });
          console.log('Google password prosao.');

          // if user exit, return this user
          if (user) {
            return done(null, user);
          }
          // otherwise create the user with google
          const newUser = new User({});
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.displayName = profile.displayName;
          newUser.google.email = profile.emails[0].value;

          // Snimanjie usera u database
          await newUser.save();

          console.log('newUser poslije save()', newUser);
          done(null, newUser);
        } catch (err) {
          console.error(err, 'Passport-Google');
          return done(err);
        }
      }
    )
  );
};
