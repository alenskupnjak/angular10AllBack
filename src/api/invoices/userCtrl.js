const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./user.service');
const User = require('./models/user.model');
const sendEmail = require('./modules/sendEmail');
const utilCtrl = require('./modules/util');



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
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1d',});
    // ili
    const token = utilCtrl.getJWTToken({ id: user._id });

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

// AUTENTIFIKACIJA
exports.authenticate = (req, res) => {
  console.log('Da, korisnik postoji u bazi.');
  console.log(req.currentUser);
  if (req.currentUser.google.email) {
    user = req.currentUser.google.email;
  }

  if (req.currentUser.github.email) {
    user = req.currentUser.github.email;
  }

  return res.json({ user: user, authstatus: true });
};

//  LOGOUT
exports.logout = (req, res) => {
  console.log('prosao kroz Logout');
  req.logout(); // remove the session and remove req.currentUser;
  return res.json({ success: true });
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    // Validiram vrijednost unesenih podataka
    const { value, error } = userService.validateForgotSchema(req.body);

    if (error && error.details) {
      return res.status(518).json(error);
    }

    const criteria = {
      $or: [
        { 'google.email': value.email },
        { 'github.email': value.email },
        // { 'twitter.email': value.email },
        { 'local.email': value.email },
      ],
    };

    console.log('criteria?', criteria);

    // Pronadi usera u bazi
    const user = await User.findOne(criteria);

    if (!user) {
      return res.status(519).json({ err: 'could not find user' });
    }

    // Kreiram token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1d',});

    const resetLink = `
    <h4> Please click on the link to reset the password </h4>
    <a href ='${process.env.FRONTEND_URL}/app-invoice/reset-password/${token}'>Reset Password</a>
    `;

    // definiraj usera
    const sanitizedUser = userService.getUser(user);

    const results = await sendEmail({
      html: resetLink,
      subject: 'Forgot Password poslano iz aplikacije Angular10All',
      email: sanitizedUser.email,
    });

    return res.json({
      message: 'Mail poslan korisniku.',
      sanitizedUser: sanitizedUser,
      token: token,
      results: results,
    });

    // return res.json(results);
  } catch (err) {
    console.error(err);
    return res.status(555).json(err);
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(523).json({ err: 'password is required' });
    }

    console.log(req.currentUser, req.currentUser);

    const user = await User.findById(req.currentUser._id);
    const sanitizedUser = userService.getUser(user);
    if (!user.local.email) {
      user.local.email = sanitizedUser.email;
      user.local.name = sanitizedUser.name;
    }

    console.log('xxxx','password');
    
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);
    // ili
    const hash1 = await utilCtrl.getEncryptedPassword(password);
    console.log('hash', hash);
    console.log('hash1', hash1);

    
    user.local.password = hash;
    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(555).json(err);
  }
};
