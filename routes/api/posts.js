const express = require('express');
const router = express.Router();

// 3a .@route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    "msg": "Posts is working"
  }));

module.exports = router;