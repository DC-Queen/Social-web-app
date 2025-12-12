import express from "express";

const router = express.Router();

router.get("/:postId/:commentId", async (req, res) => {
  console.log("req.path", req.path);
  console.log("req.headers", req.headers);
  console.log("req.params", req.params);
  console.log("req.query", req.query);
  res.json({ params: req.params, query: req.query });
});


export default router;
