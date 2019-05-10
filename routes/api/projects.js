const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Project model
const Project = require("../../models/project");
// Task model
const Task = require("../../models/task");

/**
 * @route  GET api/projects/
 * @desc   Get all projects for users
 * @access Private
 */
router.get("/", auth, (req, res) => {
	Project.find({
			users: req.query.email
		})
		.then(projects => {
			res.json({
				projects
			})
		})
		.catch(error =>
			res.status(404).json({
				success: false,
				error: error.message
			})
		);
});

/**
 * @route  GET api/projects/tasks
 * @desc   Get all tasks for projects
 * @access Private
 */
router.get("/tasks", auth, (req, res) => {
	Task.find({
			project_id: req.query.project
		})
		.then(tasks => res.json(tasks))
		.catch(error =>
			res.status(404).json({
				success: false,
				error: error.message
			})
		);
});

/**
 * @route  PUT api/projects/:id
 * @desc   Update A Project
 * @access Private
 */
router.put("/:id", auth, (req, res) => {
	const {
		title,
		desc,
		user,
		deleteUser
	} = req.body;
	let data = {};
	if (title && desc) {
		data = {
			title,
			desc
		}
	} else if (user) {
		data = {
			$push: {
				users: user
			}
		}
	} else if (deleteUser) {
		data = {
			$pull: {
				users: deleteUser
			}
		}
	}
	Project.findByIdAndUpdate({
			_id: req.params.id
		}, data)
		.then(() => {
			Project.findOne({
				_id: req.params.id
			}).then(project => {
				res.json({
					success: true,
					data: project
				});
			});
		})
		.catch(error =>
			res.status(404).json({
				success: false,
				error: error.message
			})
		);
});

/**
 * @route  POST api/projects
 * @desc   Create At Project
 * @access Private
 */
router.post("/", auth, (req, res) => {
	const newProject = new Project({
		// users_id: [
		//   req.body.id
		// ],
		users: [req.body.email],
		title: req.body.title
	});

	newProject.save().then(project => res.json(project));
});

/**
 * @route  DELETE api/projects/:id
 * @desc   Delete A Project
 * @access Private
 */
router.delete("/:id", auth, (req, res) => {
	Project.findById(req.params.id)
		.then(project => project.remove())
		.then(() =>
			res.json({
				success: true,
				id: req.params.id
			})
		)
		.catch(error =>
			res.status(404).json({
				success: false,
				error: error.message
			})
		);
});

module.exports = router;