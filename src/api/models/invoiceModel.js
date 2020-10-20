// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const chalk = require('chalk');

// const { Schema } = mongoose;
const InvoiceSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    due: {
      type: Date,
      required: true,
    },
    rate: {
      type: Number,
    },
    tax: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Rewiew = mongoose.model('Invoice', InvoiceSchema);

// EXPORTS
module.exports = Rewiew;
