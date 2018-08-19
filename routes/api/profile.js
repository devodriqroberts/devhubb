const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

// 11. Load profile model
const Profile = require('../../models/Profile');
// 11. Load User profile model
const User = require('../../models/User');

// 3a. @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    "msg": "Profile is working"
  }));


// 11. @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {};
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user'
        return res.status(404).json({
          errors
        })
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


// 12. @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;

  // Skills split into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // social
  profileFields.social = {};
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.youTube) profileFields.social.youTube = req.body.youTube;

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate({
            user: req.user.id
          }, {
            $set: profileFields
          }, {
            new: true
          })
          .then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exist
        Profile.findOne({
            handle: profileFields.handle
          })
          .then(profile => {
            if (profile) {
              errors.handle = 'Handle already exists'
              res.status(400).json(errors);
            }

            // Save Profile
            new Profile(profileFields).save()
              .then(profile => res.json(profile));
          })
      }
    })

});





module.exports = router;