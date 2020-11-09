const colors = require('colors');
const jwt = require('jsonwebtoken');
const express = require('express');
const invoiceController = require('./invoiceCtrl');
const clientController = require('./clientCtrl');
const userController = require('./userCtrl');
const passport = require('passport');

const router = express.Router();

// **********************************************************************************
// Aplikacija INVOICES  PATH /appinvoice   *****************************************
// INVOICES
router.get('/invoices', passport.authenticate('jwt', { session: false }), invoiceController.findAll);
router.get('/invoices/:id', passport.authenticate('jwt', { session: false }), invoiceController.findOne);
router.delete('/invoices/:id', passport.authenticate('jwt', { session: false }), invoiceController.delete);
router.put('/invoices/:id', passport.authenticate('jwt', { session: false }),invoiceController.update);
router.post('/invoices', passport.authenticate('jwt', { session: false }),invoiceController.create);


// CLIENTS
// router.get('/clients', clientController.findAll);
router.get('/clients', passport.authenticate('jwt', { session: false }), clientController.findAll);
router.get('/clients/:id',passport.authenticate('jwt', { session: false }),clientController.findOne);
router.delete('/clients/:id',passport.authenticate('jwt', { session: false }),clientController.delete);
router.put('/clients/:id',passport.authenticate('jwt', { session: false }),clientController.update);
router.post('/clients',passport.authenticate('jwt', { session: false }), clientController.create);

// USER
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/login', passport.authenticate('jwt', { session: false }), userController.getAll);
router.post('/test',passport.authenticate('jwt', { session: false }), userController.test);
router.get('/authenticate', passport.authenticate('jwt', { session: false }), userController.authenticate);
router.get('/logout', userController.logout);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', passport.authenticate('jwt', { session: false }), userController.resetPassword);



router.get('/failure', (req, res) => res.redirect(`${process.env.FRONTEND_URL}/app-invoice`));


// GOOGLE GOOGLE GOOGLE GOOGLE GOOGLE
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get( '/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }),
  function (req, res) {
    // res.json({ msg: 'Autentifikacija OK', req: req.currentUser });
    // Kreiram token i saljem u browser
    const token = jwt.sign({ id: req.currentUser._id }, process.env.JWT_SECRET, { expiresIn: '1d'});
  //  console.log('xxxxx', `${process.env.FRONTEND_URL}/app-invoice/invoice/?token=${token}`);
   
    // res.redirect(`${process.env.FRONTEND_URL}/app-invoice/invoice/?token=${token}`)
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`)
  }
);
// END GOOGLE GOOGLE GOOGLE *************************************************************


// GITHUB
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/failure' }),
function (req, res) {
  // Kreiram token i saljem u browser
  const token = jwt.sign({ id: req.currentUser._id }, process.env.JWT_SECRET, { expiresIn: '1d'});

  console.log(' Poruka  prije u invoice');
  
  res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`)

  // res.redirect(`http://localhost:3000/appinvoice/app-invoice/invoice/?token=125555`)
}
);

// Aplikacija COURSE
module.exports = router;
