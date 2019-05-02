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
	project_id: {
		type: String
	},
	priority: {
		type: Number,
		default: 0
	},
	completed: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true // Time to create and update
});

module.exports = Task = mongoose.model('Task', TaskSchema);