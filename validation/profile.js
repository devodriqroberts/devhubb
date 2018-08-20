const isEmpty = require('./is-empty');
const validator = require('validator');



module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';


  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required'
  } else if (!validator.isLength(data.handle, {
      min: 2,
      max: 40
    })) {
    errors.handle = 'Handle should be between 2 and 4 characters'
  }

  if (validator.isEmpty(data.status)) {
    errors.status = 'Profile status field is required'
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Profile skills field is required'
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.linkedIn)) {
    if (!validator.isURL(data.linkedIn)) {
      errors.linkedIn = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }
  if (!isEmpty(data.youTube)) {
    if (!validator.isURL(data.youTube)) {
      errors.youTube = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};