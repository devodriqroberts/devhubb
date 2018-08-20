const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

// 11. Load profile model
const Profile = require('../../models/Profile');
// 11. Load User profile model
const User = require('../../models/User');
// 12. Load profile input validation
const validateProfileInput = require('../../validation/profile');
// 13. Load experience input validation
const validateExperienceInput = require('../../validation/experience');
// 14. Load education input validation
const validateEducationInput = require('../../validation/education');

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
    .populate('user', ['name', 'avatar'])
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


// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = 'Profiles could not be found';
        return res.status(404).json(errors);
      }

      res.json(profiles)
    })
    .catch(err => res.status(404).json({
      noProfiles: "Profiles could not be found"
    }));
})

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({
      handle: req.params.handle
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err => res.status(404).json(err));
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({
      user: req.params.user_id
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err => res.status(404).json({
      noProfile: 'There is no profile for this user'
    }));
})



// 12. @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
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


// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  const {
    errors,
    isValid
  } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to experience array
      profile.experience.unshift(newExp);
      profile.save()
        .then(profile => res.json(profile));
    });
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  const {
    errors,
    isValid
  } = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to experience array
      profile.education.unshift(newEducation);
      profile.save()
        .then(profile => res.json(profile));
    });
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete a profile experience 
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      // Get Remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Save 
      profile.save()
        .then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete a profile education 
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      // Get Remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      // Splice out of array
      profile.education.splice(removeIndex, 1);

      // Save 
      profile.save()
        .then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});


// @route   DELETE api/profile
// @desc    Delete a profile  
// @access  Private
router.delete('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Profile.findOneAndRemove({
      user: req.user.id
    })
    .then(() => {
      User.findOneAndRemove({
          _id: req.user.id
        })
        .then(() => res.json({
          success: true
        }));
    })
});






module.exports = router;