import mongoose from "mongoose";
import User from "../models/User";

const { Schema, model } = mongoose;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    requried: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [],
});

const router = express.Router();

//create post
router.post("/", authenticateToken, async (req, res) => {
  console.log("req", req.user);
  try {
    const post = new Post({
      user: req.user._id,
      content: req.body.content,
    });
    console.log("post", post);
    await post.save();
    res.status(201).json({ status: "pos created successfully", data: post });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get posts

router.get("/", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", ["username", "email"])
      .populate("likes", "username");
    res.status(201).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//like post

router.post("/:id/follow", authenticateToken, async (req, res) => {
  try {
    const userToFollow = await Post.findById(req.params.id);

    const currentUser = await User.findById(req.user._id);

    if (!currentUser.following.includes(userToFollow._id))
      return res.status(404).json({ message: "post not found" });

    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
      await post.save();
      res.status(200).json("post liked successfully");
    } else {
      res.status(404).json("you already liked the post");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
