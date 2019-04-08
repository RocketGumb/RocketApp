const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Task model
const Task = require("../../models/task");

/**
 * @route  GET api/tasks
 * @desc   Get all tasks
 * @access Public
 */
router.get("/", (req, res) => {
	Task.find()
		.sort({
			createdAt: -1
		})
		.then(tasks => res.json(tasks));
});

/**
 * @route  POST api/tasks
 * @desc   Create At Task
 * @access Private
 */
router.post("/", auth, (req, res) => {
	const newTask = new Task({
		title: req.body.title
	});

	newTask
		.save()
		.then(task => res.json(task));
});

/**
 * @route  DELETE api/tasks/:id
 * @desc   Delete A Task
 * @access Private
 */
router.delete("/:id", auth, (req, res) => {
	Task.findById(req.params.id)
		.then(task => task.remove())
		.then(() => res.json({
			success: true,
			id: req.params.id
		}))
		.catch(error => res.status(404).json({
			success: false,
			error: error.message
		}))
});

module.exports = router;