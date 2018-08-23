const bcrypt = require('bcryptjs');
const express = require('express');
const gravatar = require('gravatar');
const keys = require('../../config/keys').secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

// 8. Load input validation
const validateRegisterInput = require('../../validation/register');

// 9. Load login validation
const validateLoginInput = require('../../validation/login');

// Load user model
const User = require('../../models/User');

// 3a. @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    "msg": "Users is working"
  }));

// 5. @route  POST api/users/register
// @desc    register user
// @access  Public
router.post('/register', (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  // Check Validation (Register)
  if (!isValid) {
    return res.status(400).json(
      errors
    )
  }

  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(400).json(
          errors
        );
      } else {

        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });

        const newUser = new User({
          avatar,
          email: req.body.email,
          name: req.body.name,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });

      }
    });
});

// 6. @route   POST api/users/login
// @desc    User login / Returning JWT
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  // Check Validation (Login)
  if (!isValid) {
    return res.status(400).json(
      errors
    )
  }

  // Find user by email
  User.findOne({
      email
    })
    .then(user => {

      // Check for user
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // 7. User matched / Creating JWT

            // 7a. Create JWT payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            // 7b. Sign token
            jwt.sign(
              payload,
              keys, // 7c. Create secret
              {
                expiresIn: 3600
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            errors.password = "Password incorrect"
            return res.status(400).json(
              errors
            );
          }
        })
        .catch(err => console.log(err));

    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})





module.exports = router;