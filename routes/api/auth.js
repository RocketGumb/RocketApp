const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require("../../middleware/auth");

// User model
const User = require("../../models/user");

/**
 * @route  POST api/auth
 * @desc   Auth User
 * @access Public
 */
router.post("/", (req, res) => {
  const {
    email,
    password
  } = req.body;

  // Simple validate
  if (!email || !password) {
    res
      .status(400)
      .json({
        message: "Please enter all field"
      })
  }

  // Check for existing user
  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({
            message: "User does not exists"
          })
      }

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({
              message: "Invalid credentials"
            })
          }

          jwt.sign({
              id: user.id
            },
            config.get('jwtSecret'), {
              expiresIn: '7d'
            },
            (error, token) => {
              if (error) throw error;

              res.json({
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            })
        })
    })

});

/**
 * @route  GET api/auth/user
 * @desc   Get user data
 * @access Private
 */
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router;