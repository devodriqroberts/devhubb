const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

// Post Model
const Post = require('../../models/Posts');
// Profile Model
const Profile = require('../../models/Profile');

// Load post validation
const validatePostInput = require('../../validation/post');

// 3a .@route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    "msg": "Posts is working"
  }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then((posts) => {
      if (!posts) {
        return res.status(404).json({
          noPostsFound: "No posts found"
        });
      }
      res.json(posts)
    })
    .catch(err => res.status(404).json({
      noPostsFound: "No posts found"
    }));
});

// @route   GET api/posts/:id
// @desc    Get posts by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          noPostFound: "No post found. Id does not match any user posts"
        });
      }
      res.json(post)
    })
    .catch(err => res.status(404).json({
      noPostFound: "No post found. Id does not match any user posts"
    }));
});


// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  const {
    errors,
    isValid
  } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });
  newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notAuthorized: 'User not authorized'
            });
          }

          // Delete
          post.remove().then(() => res.json({
            success: true
          }));
        })
        .catch(err => res.status(404).json({
          noPostsFound: "No posts found"
        }));
    });
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
              alreadyLiked: "User has already liked post"
            })
          }

          // Add user id to likes array
          post.likes.unshift({
            user: req.user.id
          })
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
          noPostsFound: "No posts found"
        }));
    });
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
              hasNotLiked: "Post has not been liked by current user"
            })
          }

          // Remove user id to likes array
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice from array
          post.likes.splice(removeIndex, 1);

          // Save 
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
          noPostsFound: "No posts found"
        }));
    });
});


// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  const {
    errors,
    isValid
  } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.nmae,
        avatar: req.body.avatar,
        user: req.user.id
      }

      // Add to comments array
      post.comments.unshift(newComment);

      // Save
      post.save().then(post => res.json(post));

    })
    .catch(err => res.status(404).json({
      noPostsFound: "No posts found"
    }));
});

// @route   DELETE api/comment/:id/:comment_id
// @desc    Delete comment form post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // Check if comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({
          noComment: "Comment does not Exist"
        });
      }

      // Remove index of comment
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Remove comment 
      post.comments.splice(removeIndex, 1);

      // Save
      post.save().then(post => res.json(post));

    })
    .catch(err => res.status(404).json({
      noCommentFound: "No comment found"
    }));
});








module.exports = router;