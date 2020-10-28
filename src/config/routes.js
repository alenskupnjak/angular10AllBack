// import express from 'express';
// import invoiceController from '../api/controllers/invoice.controller';
const express = require('express')
const invoiceController = require('../api/controllers/invoiceInvoiceCtrl')
const clientController = require('../api/controllers/invoiceClientCtrl')
const userController = require('../api/controllers/invoiceUserCtrl')
const passport = require('passport');

const router = express.Router();

// Aplikacija INVOICES *****************************************
// INVOICES
router.get('/invoices', passport.authenticate('jwt', { session: false }), invoiceController.findAll);
router.get('/invoices/:id', passport.authenticate('jwt', { session: false }), invoiceController.findOne);
router.delete('/invoices/:id', passport.authenticate('jwt', { session: false }), invoiceController.delete);
router.put('/invoices/:id', passport.authenticate('jwt', { session: false }), invoiceController.update);
router.post('/invoices', passport.authenticate('jwt', { session: false }), invoiceController.create);

// CLIENTS
router.get('/clients', clientController.findAll);
// router.get('/clients', passport.authenticate('jwt', { session: false }), clientController.findAll);
router.get('/clients/:id', passport.authenticate('jwt', { session: false }), clientController.findOne);
router.delete('/clients/:id', passport.authenticate('jwt', { session: false }), clientController.delete);
router.put('/clients/:id', passport.authenticate('jwt', { session: false }), clientController.update);
router.post('/clients', passport.authenticate('jwt', { session: false }), clientController.create);

// USER
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/login', passport.authenticate('jwt', { session: false }), userController.getAll);
router.post('/test', passport.authenticate('jwt', { session: false }), userController.test);



// aplikacija COURSE
module.exports = router;
