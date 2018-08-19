const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

// 10. Create profile schema
const ProfileSchema = new Schema({
  bio: {
    type: String
  },
  company: {
    type: String
  },
  date: {
    type: Date,
    default: moment().format()
  },
  education: [{
    school: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldOfStudy: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  experience: [{
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String,
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  githubUsername: {
    type: String
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  location: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  social: {
    facebook: {
      type: String
    },
    linkedIn: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    youTube: {
      type: String
    }
  },
  status: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  website: {
    type: String
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);