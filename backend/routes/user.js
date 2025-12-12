import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const newUser = await user.save();

    res.json(newUser);
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.JWT_SECRET
  );

  res.header("Authorization", "Bearer" + token).json({ 'token':token,"userId":user._id })
});

router.get("/profile", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json(user);
});


//follow user
router.post("/:id/follow", authenticateToken, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);

    const currentUser = await User.findById(req.user._id);

    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollow.save();
      res
        .status(201)
        .json({ status: "user followed successfully", user: currentUser });
    } else {
      res.status(400).json({ status: "you are already following this user" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//unfollow user
router.post("/:id/unfollow", authenticateToken, async (req, res) => {
  console.log('unfollow',req.params.id)
  try {
    const userToUnFollow = await User.findById(req.params.id);
    if (!userToUnFollow)
      return res.status(404).json({message: "User not found"})

    const currentUser = await User.findById(req.user._id);

    if (!currentUser.following.includes(userToUnFollow._id)) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userToUnFollow._id.toString()
      );

      userToUnFollow.followers = userToUnFollow.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );

      await currentUser.save();
      await userToUnFollow.save();

      console.log("currentUser", currentUser)
      res
        .status(201)
        .json({ status: "user unfollowed successfully", user: currentUser });
    } else {
      res.status(400).json({ status: "you are not following this user" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//fetch all the current user

router.get("/explore", authenticateToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.status(200).json(users);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//egt user by ID

export default router;
