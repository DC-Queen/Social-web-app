import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import testRoutes from "./routes/test.js";

const app = express();
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/socialApp";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("connected to Mongo");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/test", testRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running on port: " + port);
});
