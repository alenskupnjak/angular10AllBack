// import { required } from "joi";
const chalk = require('chalk');
// import Joi, { required } from 'joi';
const Joi = require('joi');
// import HttpStatus from 'http-status-codes';
// import { required } from 'joi';
// const HttpStatus = require('http-status-codes');
// import Invoice from '../models/invoice.model';

const Invoice = require('../models/invoice.model');


exports.findAll = (req, res, next) => {
  res.json({ msg: 'evo ga u invoice' });

  // Invoice.find()
  //   .then(invoices => res.json(invoices))
  //   .catch(err => {
  //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)});
};

exports.create = (req, res, next) => {
  const schema = Joi.object().keys({
    item: Joi.string().required(),
    date: Joi.date().required(),
    due: Joi.date().required(),
    qty: Joi.number().integer().required(),
    tax: Joi.number().optional(),
    rate: Joi.number().optional(),
  });
  const { error, value } = Joi.validate(req.body, schema);
  if (error && error.details) {
    // return res.status(HttpStatus.BAD_REQUEST).json(error);
    return res.status(401).json(error);
  }
  Invoice.create(value)
    .then((invoice) => res.json(invoice))
    // .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    .catch((err) => res.status(401).json(err));
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Invoice.findById(id)
  Invoice.findById(id)
    .then((invoice) => {
      if (!invoice) {
        return res
          // .status(HttpStatus.NOT_FOUND)
          .status(402)
          .json({ err: 'Could not find any invoice' });
      }
      return res.json(invoice);
    })
    // .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    .catch((err) => res.status(401).json(err));
};

exports.delete = (req, res, next) => {
  const { id } = req.params;
  Invoice.findByIdAndRemove(id)
    .then((invoice) => {
      if (!invoice) {
        return res
          // .status(HttpStatus.NOT_FOUND)
          .status(402)
          .json({ err: 'Could not delete any invoice' });
      }
      return res.json(invoice);
    })
    // .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    .catch((err) => res.status(401).json(err));
};

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
