const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 60
  },
  desc: {
    type: String,
    default: "Новый проект",
    maxlength: 200
  },
  users: {
    type: Array,
    required: true
  }
});

module.exports = Project = mongoose.model('Project', ProjectSchema);