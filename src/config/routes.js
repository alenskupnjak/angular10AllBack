// import express from 'express';
const express = require('express')
const invoiceController = require('../api/controllers/invoiceCtrl')
const chalk = require('chalk');
// import invoiceController from '../api/controllers/invoice.controller';

const router = express.Router();

// Aplikacija INVOICES

router.get('/invoices', invoiceController.findAll);
router.get('/invoices/:id', invoiceController.findOne);
router.delete('/invoices/:id', invoiceController.delete);
// router.put('/invoices/:id', invoiceController.update);
router.post('/invoices', invoiceController.create);






// aplikacija COURSE

module.exports = router;
