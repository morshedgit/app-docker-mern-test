const express = require('express');
const postRouter = express.Router();
const Post = require('../models/post.model'); // post model

/* Get all Posts */
postRouter.get('/', async (req, res, next) => {
  try {

    const result = await Post.find({})

    res.status(200).send({
      'success': true,
      'data': result
    });

  } catch (e) {
    res.status(400).send({
      'success': false,
      'error': e.message
    });
  }
});

/* Get Single Post */
postRouter.get("/:post_id", async (req, res, next) => {

  try {
    const result = await Post.findById(req.params.post_id)

    res.status(200).send({
      success: true,
      data: result
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message
    });
  }
});


/* Add Single Post */
postRouter.post("/", async (req, res, next) => {

  try {
    let newPost = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
    };
    const result = await Post.create(newPost)
    res.status(201).send({
      success: true,
      data: result,
      message: "Post created successfully"
    });

  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message
    });

  }
});

/* Edit Single Post */
postRouter.patch("/:post_id", async (req, res, next) => {
  try {
    let fieldsToUpdate = req.body;
    const result = await Post.findByIdAndUpdate(req.params.post_id, { $set: fieldsToUpdate }, { new: true })
    res.status(200).send({
      success: true,
      data: result,
      message: "Post updated successfully"
    });

  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message
    });
  }
});

/* Delete Single Post */
postRouter.delete("/:post_id", async (req, res, next) => {

  try {
    const result = await Post.findByIdAndDelete(req.params.post_id)
      res.status(200).send({
        success: true,
        data: result,
        message: "Post deleted successfully"
      })

  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message
    });
  }
});

module.exports = postRouter;
