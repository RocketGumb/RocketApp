const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const TaskSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	desc: {
		type: String
	}
}, {
	timestamps: true // Time to create and update
}, {
	versionKey: false // Version off
});

module.exports = Task = mongoose.model('Task', TaskSchema);