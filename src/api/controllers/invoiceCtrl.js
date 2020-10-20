// import { required } from "joi";
// import Joi, { required } from 'joi';
// import HttpStatus from 'http-status-codes';
// import Invoice from '../models/invoice.model';

const { text } = require('body-parser');
const chalk = require('chalk');
const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const Invoice = require('../models/invoiceModel');

// ************************************************
// Pronadi sve zapise
exports.findAll = (req, res, next) => {
  Invoice.find()
    .then((invoices) => {
      res.json(invoices);
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    });
};

// *************************************************
// Kreiranje invoice
exports.create = (req, res, next) => {
  // throw new Error('Bacena greška za vježbu')

  // JOI provjera Definicija
  const schema = Joi.object({
    item: Joi.string().required(),
    date: Joi.date().required(),
    due: Joi.date().required(),
    qty: Joi.number().integer().required(),
    tax: Joi.number().optional(),
    rate: Joi.number().optional(),
  });

  // const { error, value } = schemaNovo.validate({ item: item, date: date });
  const { error, value } = schema.validate({
    item: req.body.item,
    date: req.body.date,
    due: req.body.due,
    qty: req.body.qty,
    tax: req.body.tax,
    rate: req.body.rate,
  });

  if (error && error.details) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      poruka: 'Neuspjelo kreiranje Invoice. Joi greška',
      error: error,
    });
  }

  Invoice.create(value)
    .then((invoice) => {
      res.json(invoice);
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        poruka: 'Neuspjeli kreiranje invoice',
        error: err,
      });
    });
};

// **********************************
//  Pronadi pijedinačni zapis
exports.findOne = (req, res, next) => {
  Invoice.findById(req.params.id)
    .then((invoice) => {
      console.log('xxx', invoice);

      if (!invoice) {
        return (
          res
            // .status(HttpStatus.NOT_FOUND)
            .status(111)
            .json({ err: 'Could not find any invoice' })
        );
      }
      return res.json(invoice);
    })
    .catch((err) => {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ poruka: 'Nisam pronasao zapis sa tim ID-om', err: err });
    });
};

// *****************************************************
//  DELETE
exports.delete = (req, res, next) => {
  Invoice.findByIdAndRemove(req.params.id)
    .then((invoice) => {
      if (!invoice) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ err: 'Could not delete any invoice' });
      }
      return res.json({
        poruka: 'Invoice obrisan',
        invoice: invoice,
      });
    })
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
};

// **********************************************************
// UPDATE
exports.update = (req, res, next) => {
  const { id } = req.params;
  const schema = Joi.object().keys({
    item: Joi.string().optional(),
    date: Joi.date().optional(),
    due: Joi.date().optional(),
    qty: Joi.number().integer().optional(),
    tax: Joi.number().optional(),
    rate: Joi.number().optional(),
  });
  const { error, value } = Joi.validate(req.body, schema);
  if (error && error.details) {
    // return res.status(HttpStatus.BAD_REQUEST).json(error);
    return res.status(402).json(error);
  }
  Invoice.findOneAndUpdate({ _id: id }, value, { new: true })
    .then((invoice) => res.json(invoice))
    // .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    .catch((err) => {
      res.status(401).json(err);
    });
};
