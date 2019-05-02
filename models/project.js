const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: "Новый проект"
  },
  users_id: {
    type: Array,
    required: true
  }
});

module.exports = Project = mongoose.model('Project', ProjectSchema);