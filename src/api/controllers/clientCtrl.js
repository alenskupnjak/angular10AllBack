const chalk = require('chalk');
const HttpStatus = require('http-status-codes');
const Client = require('../models/clientModel');
const Joi = require('joi');

// ************************************************
// Pronadi sve zapise
exports.findAll = (req, res, next) => {
  Client.find()
    .then((client) => {
      res.json(client);
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    });
};

// *************************************************
// Kreiranje Client
exports.create = (req, res, next) => {
  // JOI provjera Definicija
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const { error, value } = schema.validate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  if (error && error.details) {
    return res.status(404).json({
      poruka: 'Neuspjelo kreiranje Clienta. Joi greška',
      error: error,
    });
  }

  Client.create(value)
    .then((client) => {
      console.log(chalk.bold.green('Client kreiran'));

      res.json({ poruka: 'Client kreiran', client });
    })
    .catch((err) => {
      res.status(404).json({
        poruka: 'Neuspjeli kreiranje Clienta',
        error: err,
      });
    });
};

// **********************************
//  Pronadi pijedinačni zapis
exports.findOne = (req, res, next) => {
  Client.findById(req.params.id)
    .then((client) => {
      if (!client) {
        return (
          res
            .status(404)
            .json({ err: 'Could not find any Client' })
        );
      }
      return res.json(client);
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
  Client.findByIdAndRemove(req.params.id)
    .then((client) => {
      if (!client) {
        return res.status(404).json({ err: 'Could not delete any client' });
      }
      return res.status(200).json({
        poruka: 'Client obrisan',
        client: client,
      });
    })
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
};

// **********************************************************
// UPDATE
exports.update = (req, res, next) => {
  // const { id } = req.params;
  const schema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().optional(),
  });
  const { error, value } = schema.validate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  //  ako ima grešku javlja ju...
  if (error && error.details) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
  Client.findOneAndUpdate({ _id: req.params.id }, value, { new: true })
    .then((client) =>
      res.json({ poruka: 'Invoice uspješno obnovljen', client: client })
    )
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    });
};
