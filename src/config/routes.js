// import express from 'express';
// import invoiceController from '../api/controllers/invoice.controller';
const express = require('express')
const invoiceController = require('../api/controllers/invoiceInvoiceCtrl')
const clientController = require('../api/controllers/invoiceClientCtrl')

const router = express.Router();

// Aplikacija INVOICES
router.get('/invoices', invoiceController.findAll);
router.get('/invoices/:id', invoiceController.findOne);
router.delete('/invoices/:id', invoiceController.delete);
router.put('/invoices/:id', invoiceController.update);
router.post('/invoices', invoiceController.create);

router.get('/clients', clientController.findAll);
router.get('/clients/:id', clientController.findOne);
router.delete('/clients/:id', clientController.delete);
router.put('/clients/:id', clientController.update);
router.post('/clients', clientController.create);





// aplikacija COURSE
module.exports = router;
