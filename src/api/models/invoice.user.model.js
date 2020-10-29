// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
// import bcryptjs from 'bcryptjs';

// const { Schema } = mongoose;
const UserSchema = new mongoose.Schema(
  {
    // email: {
    //   type: String,
    //   required: true,
    //   lowercase: true,
    //   unique: true,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },
    local: {
      email: String,
      password: String,
    },
    google: {
      email: String,
      id: String,
      displayName: String,
      token: String,
    },
  },
  { timestamps: true }
);


// // Enkripcija za password-a peijw snimanja passworda
// UserSchema.pre('save', async function () {
//   // if user is modified or user is new
//   if (this.isModified('password') || this.isNew) {
//     const salt = await bcryptjs.genSalt();
//     const hash = await bcryptjs.hash(this.password, salt);
//     this.password = hash;
//   }
// });

module.exports = mongoose.model('User', UserSchema);
