const color = require('color');
const jwt = require('jsonwebtoken');
const express = require('express');
const invoiceController = require('../api/controllers/invoiceInvoiceCtrl');
const clientController = require('../api/controllers/invoiceClientCtrl');
const userController = require('../api/controllers/invoiceUserCtrl');
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
router.post('/clients',passport.authenticate('jwt', { session: false }),clientController.create);

// USER
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/login', passport.authenticate('jwt', { session: false }), userController.getAll);
router.post('/test',passport.authenticate('jwt', { session: false }),userController.test);

// GOOGLE
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get( '/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // res.json({ msg: 'Autentifikacija OK', req: req.currentUser });
    // Kreiram token
    const token = jwt.sign({ id: req.currentUser._id }, process.env.JWT_SECRET, { expiresIn: '1d'});

    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`)
  }
);


// ****************************************************************************************************







// Aplikacija COURSE
module.exports = router;
