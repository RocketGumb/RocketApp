const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Project model
const Project = require("../../models/project");
// Task model
const Task = require("../../models/task");

/**
 * @route  GET api/projects/:id
 * @desc   Get all projects for users
 * @access Private
 */
router.get("/:id", auth, (req, res) => {
  Project.find({
      users_id: req.params.id
    })
    .then(projects => res.json(projects))
    .catch(error => res.status(404).json({
      success: false,
      error: error.message
    }));
});

/**
 * @route  GET api/projects/tasks
 * @desc   Get all tasks for projects
 * @access Private
 */
router.get("/:id/tasks", auth, (req, res) => {
  Task.find({
      users_id: req.params.id,
      project_id: {
        $exists: true,
        $ne: ""
      }
    })
    .then(tasks => res.json(tasks))
    .catch(error => res.status(404).json({
      success: false,
      error: error.message
    }));
});

/**
 * @route  POST api/projects
 * @desc   Create At Project
 * @access Private
 */
router.post("/", auth, (req, res) => {
  const newProject = new Project({
    users_id: [
      req.body.id
    ],
    title: req.body.title
  });

  newProject
    .save()
    .then(project => res.json(project));
});

module.exports = router;