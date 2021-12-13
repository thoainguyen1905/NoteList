const express = require("express");
const route = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

route.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]); // lay thong tin user ra tru password
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

route.put('/:id', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		let updatedPost = {
			title,
			description: description || '',
			url: (url.startsWith('https://') ? url : `https://${url}`) || '',
			status: status || 'TO LEARN'
		}

		const postUpdateCondition = { _id: req.params.id, user: req.userId }

		updatedPost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatedPost,
			{ new: true }
		)

		// User not authorised to update post or post not found
		if (!updatedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			posts: updatedPost
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

route.delete('/:id',verifyToken , async(req,res)=>{
  try {
    const postDeleteCondition = {_id:req.params.id, user:req.userId}
    const deletePost = await Post.findOneAndDelete(postDeleteCondition)
    
    if(!deletePost){
      return res.status(401).json({success:false,message:'Post not found or user not authorised'})
    }
    res.json({success:true,message:'Delete Post Success!',posts: deletePost})
  } catch (error) {
    console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
  }
})
route.post("/", verifyToken, async (req, res) => {
  const { title, status, description, url } = req.body;

  //check title
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "title is required" });
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();

    res
      .status(200)
      .json({ success: true, message: "happy learning", posts: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal error server" });
  }
});

module.exports = route;
