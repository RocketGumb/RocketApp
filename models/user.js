const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

module.exports = User = mongoose.model('User', UserSchema);