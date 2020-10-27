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
router.get('/invoices', invoiceController.findAll);
router.get('/invoices/:id', invoiceController.findOne);
router.delete('/invoices/:id', invoiceController.delete);
router.put('/invoices/:id', invoiceController.update);
router.post('/invoices', invoiceController.create);

// CLIENTS
router.get('/clients', clientController.findAll);
router.get('/clients/:id', clientController.findOne);
router.delete('/clients/:id', clientController.delete);
router.put('/clients/:id', clientController.update);
router.post('/clients', clientController.create);

// USER
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/login', userController.getAll);
router.post('/test', passport.authenticate('jwt', { session: false }), userController.test);





// aplikacija COURSE
module.exports = router;
