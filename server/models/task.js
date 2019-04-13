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
	},
	users_id: {
		type: Array,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true // Time to create and update
}, {
	versionKey: false // Version off
});

module.exports = Task = mongoose.model('Task', TaskSchema);