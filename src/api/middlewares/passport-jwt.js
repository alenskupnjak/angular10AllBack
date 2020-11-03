const PassportJWT = require('passport-jwt');
const passport = require('passport');
const User = require('../models/invoice.user.model');

exports.configureJWTStrategy = () => {
  console.log('Prošao sam kroz configureJWTStrategy');
  const opts = {};
  opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
  
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      console.log('x+x+x 01');
      
      User.findOne({ _id: payload.id }, (err, user) => {
        console.log('x+x+x 02');
        if (err) {
          return done('err u configureJWTStrategy ', false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
        // or you could create a new account
      });
    })
  );
};
