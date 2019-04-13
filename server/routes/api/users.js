const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const config = require('config');
const jwt = require('jsonwebtoken');

// User model
const User = require("../../models/user");

/**
 * @route  POST api/users
 * @desc   Register New User
 * @access Public
 */
router.post("/", (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  // Simple validate
  if (!name || !email || !password) {
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
      if (user) {
        return res
          .status(400)
          .json({
            message: "Пользователь уже существует",
            emailExists: true
          })
      }

      const newUser = new User({
        name,
        email,
        password
      })

      // Create salt & hash
      bcrypt.genSalt(10, (error, salt) => {
        if (error) throw error;

        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;

          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign({
                  id: user.id
                },
                config.get('jwtSecret'), {
                  expiresIn: 3600
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
                }
              )
            })
        })
      })
    })

});

module.exports = router;