// import mongoose from 'mongoose';
const mongoose = require('mongoose');

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
    invoiceclient: {
      ref:'Client',
      type: mongoose.Schema.ObjectId,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);
