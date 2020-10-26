// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// const { Schema } = mongoose;
const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// export default mongoose.model('Client', ClientSchema);

module.exports = mongoose.model('Client', ClientSchema);
