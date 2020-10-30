const colors = require('colors');
const jwt = require('jsonwebtoken');
const express = require('express');
const fileController = require('../api/controllers/course.file.ctrl');
const baseController = require('../api/controllers/course.base.ctrl');
// const invoiceClientController = require('../api/controllers/invoiceClientCtrl');
// const userController = require('../api/controllers/invoiceUserCtrl');
const passport = require('passport');

const router = express.Router();

// **********************************************************************************

// INVOICES
router.get('/courses', fileController.findAll);
router.get('/courses/:id', fileController.findOne);
router.post('/courses', fileController.create);
router.delete('/courses/:id', fileController.deleteOne);
router.put('/courses/:id', fileController.updateOne);


router.get('/api/courses', baseController.getAllCourses);
router.get('/api/courses/:id', baseController.getCourseById);
router.get('/api/lessons/:id', baseController.getAllLessons);





// CLIENTS
// router.get('/clients', clientController.findAll);
// router.get('/clients', passport.authenticate('jwt', { session: false }), invoiceClientController.findAll);
// router.get('/clients/:id',passport.authenticate('jwt', { session: false }),invoiceClientController.findOne);
// router.delete('/clients/:id',passport.authenticate('jwt', { session: false }),invoiceClientController.delete);
// router.put('/clients/:id',passport.authenticate('jwt', { session: false }),invoiceClientController.update);
// router.post('/clients',passport.authenticate('jwt', { session: false }),invoiceClientController.create);

// USER
// router.post('/signup', userController.signup);
// router.post('/login', userController.login);
// router.get('/login', passport.authenticate('jwt', { session: false }), userController.getAll);
// router.post('/test',passport.authenticate('jwt', { session: false }),userController.test);

// GOOGLE
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback

// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

// router.get( '/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
//   function (req, res) {
//     // res.json({ msg: 'Autentifikacija OK', req: req.currentUser });
//     // Kreiram token
//     const token = jwt.sign({ id: req.currentUser._id }, process.env.JWT_SECRET, { expiresIn: '1d'});

//     res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`)
//   }
// );


// ****************************************************************************************************







// Aplikacija COURSE
module.exports = router;
