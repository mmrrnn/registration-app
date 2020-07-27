const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  }
}, {
  timestamps: true,
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;