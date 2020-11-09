const chalk = require('chalk');
const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const Invoice = require('./models/invoice.model');

// ************************************************
// Pronadi sve zapise
exports.findAll = (req, res, next) => {
  Invoice.find().populate('invoiceclient')
    .then((invoices) => {
      res.json(invoices);
    })
    .catch((err) => {
      res.status(801).json({greska:'find All'});
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
    invoiceclient: Joi.string().required(),
    qty: Joi.number().integer().required(),
    tax: Joi.number().optional(),
    rate: Joi.number().optional(),
  });

  // const { error, value } = schemaNovo.validate({ item: item, date: date });
  const { error, value } = schema.validate({
    item: req.body.item,
    date: req.body.date,
    due: req.body.due,
    invoiceclient: req.body.invoiceclient,
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
      console.log(chalk.bold.green('Invoice kreiran'));

      res.json({ poruka: 'Invoice kreiran', invoice });
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
  Invoice.findById(req.params.id).populate('invoiceclient')
    .then((invoice) => {
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
        return res.status(404).json({ err: 'Could not delete any invoice' });
      }
      return res.status(200).json({
        poruka: 'Invoice obrisan',
        invoice: invoice,
      });
    })
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
};

// **********************************************************
// UPDATE
exports.update = (req, res, next) => {
  // const { id } = req.params;
  const schema = Joi.object({
    item: Joi.string().optional(),
    date: Joi.date().optional(),
    due: Joi.date().optional(),
    qty: Joi.number().integer().optional(),
    tax: Joi.number().optional(),
    rate: Joi.number().optional(),
    // Povezani podatak veza sa Invoice - clients
    invoiceclient: Joi.string().optional(),
  });
  const { error, value } = schema.validate({
    item: req.body.item,
    date: req.body.date,
    due: req.body.due,
    qty: req.body.qty,
    tax: req.body.tax,
    rate: req.body.rate,
    invoiceclient: req.body.invoiceclient,
  });
  //  ako ima grešku javlja ju...
  if (error && error.details) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
  Invoice.findOneAndUpdate({ _id: req.params.id }, value, { new: true })
    .then((invoice) =>
      res.json({ poruka: 'Invoice uspješno obnovljen', invoice: invoice })
    )
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    });
};
