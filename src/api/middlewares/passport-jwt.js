const PassportJWT = require('passport-jwt')
const passport = require('passport')
const User = require('../models/invoice.user.model')

exports.configureJWTStrategy = () => {
  const opts = {};
  opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
  console.log('xxxx',process.env.JWT_SECRET);
  
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      console.log('payload ****** =',payload);
      User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          console.log('Ne nisam prošao');
          return done(err, false);
        }
        if (user) {
          console.log('Da prošao sam');
          
          return done(null, user);
        }
        return done(null, false);
        // or you could create a new account
      });
    })
  );
};
