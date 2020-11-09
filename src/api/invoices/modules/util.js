// import jwt from 'jsonwebtoken';
// import bcryptjs from 'bcryptjs';

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.getJWTToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d',});
  return token;
};


exports.getEncryptedPassword = async (password) => {
  console.log('Prošako kroz  getEncryptedPassword');
  const salt = await bcryptjs.genSalt();
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

exports.printaj = () => {
  console.log('Prošako kroz  printaj');
};
