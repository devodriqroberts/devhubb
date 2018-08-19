const express = require('express');
const router = express.Router();

// 3a. @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    "msg": "Profile is working"
  }));

module.exports = router;