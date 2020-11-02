const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../service/invoice.user.service');
const User = require('../models/invoice.user.model');

// *******************************************************************
// SIGNUP SIGNUP SIGNUP SIGNUP SIGNUP
exports.signup = async (req, res) => {
  try {
    // provjeri jesu li upisani podaci ispravni
    const { error, value } = userService.validateSchema(req.body);

    if (error && error.details) {
      return res.status(400).json(error);
    }

    // Ako korisnik vec postoji izbacuje grešku
    const existingUser = await User.findOne({ 'local.email': value.email });
    if (existingUser) {
      return res.status(404).json({ err: 'You have already created account' });
    }

    // Kreiranju usera
    const user = await new User();
    user.local.email = value.email;
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(value.password, salt);
    user.local.password = hash;
    await user.save();

    return res.json({
      success: true,
      message: 'User created successfully',
      pozdrav: req.pozdrav,
      user: user,
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

    // Ako je greška vracam error
    if (error && error.details) {
      return res.status(400).json(error);
    }

    // Tražim usera u bazi, ako ga ne nade vraca vrijednost NULL
    const user = await User.findOne({ 'local.email': value.email });

    // ako je user nije pronadem javljam grešku
    if (!user) {
      return res.status(400).json({ err: 'Invalid email or password' });
    }

    // Usporedujem upisani password sa passwordom u bazi
    const matched = await bcryptjs.compare(value.password, user.local.password);

    // ako je neispravan password javljam greški
    if (!matched) {
      return res.status(401).json({ err: 'Invalid credentials' });
    }

    // Kreiram token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.json({
      poruka: 'Token kreiran',
      success: true,
      user: value.email,
      token: token,
    });
  } catch (err) {
    console.error('greska Login', err);
    return res.status(500).json(err);
  }
};

// ****************************************************+
// TEST TEST TEST
exports.test = async (req, res) => {
  return res.json(req.currentUser);
};

exports.authenticate = (req, res) => {
  console.log('Da, korisnik postoji u bazi *******************');
  console.log(req.currentUser);
  if (req.currentUser.google.email) {
    user = req.currentUser.google.email;
  }

  if (req.currentUser.github.email) {
    user = req.currentUser.github.email;
  }

  return res.json({ user: user, authstatus: true });
};

exports.logout = (req, res) => {
  console.log('prosao kroz Logout');
  req.logout(); // remove the session and remove req.currentUser;
  return res.json({ success: true });
};
