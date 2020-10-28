const bcryptjs = require('bcryptjs');
// import bcryptjs from 'bcryptjs';
const jwt = require('jsonwebtoken');
const userService = require('../service/invoice.user.service');
// import User from './user.model';
const User = require('../models/invoice.user.model');
// import { devConfig } from '../../../config/env/development';

// *******************************************************************
// SIGNUP SIGNUP SIGNUP SIGNUP SIGNUP
exports.signup = async (req, res) => {
  try {
    console.log('Signup =', req.body);

    const { error, value } = userService.validateSchema(req.body);
    if (error && error.details) {
      return res.status(400).json(error);
    }

    // Kreiranje usera
    const user = await User.create(value);

    return res.json({
      success: true,
      message: 'User created successfully',
      pozdrav: req.pozdrav,
      user: user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};


// ************************************************************
//  GET ALL users
exports.getAll = async (req, res) => {
  try {
    const user = await User.find();
    return res.json({
      poruka: 'Povukao sve User-e iz baze',
      success: true,
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};

// ************************************************************
//  TEST TEST TEST
exports.test = async (req, res) => {
  return res.json(req.currentUser);
};

// ***************************************************************************
// LOGIN LOGIN LOGIN LOGIN
exports.login = async (req, res) => {
  try {
    // Validiram vrijednost unesenih podataka
    const { error, value } = userService.validateSchema(req.body);
    if (error && error.details) {
      return res.status(400).json(error);
    }

    // Tražim usera u bazi, ako ga ne nade vraca vrijednost NULL
    const user = await User.findOne({ email: value.email });

    // ako je user nije pronadem javljam grešku
    if (!user) {
      return res.status(400).json({ err: 'Invalid email or password' });
    }

    // Usporedujem upisani password sa passwordom u bazi
    const matched = await bcryptjs.compare(value.password, user.password);

    // ako je neispravan password javljam greški
    if (!matched) {
      return res.status(401).json({ err: 'Invalid credentials' });
    }

    // Kreiram token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1d'});
    console.log('token iz backenda=', token);
    

    return res.json({ poruka: 'Token kreiran', success: true, token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

// ****************************************************+
// TEST TEST TEST
exports.test = async (req, res) => {
  return res.json(req.currentUser);
};
