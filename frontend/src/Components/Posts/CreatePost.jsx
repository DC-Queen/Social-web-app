import React, { useState } from "react";
import "./createPost.css";

import { createPost } from "../../services/api";

export default function CreatePost() {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createPost({ content: content });
      setContent("");
       //alert('Post has been created successfully')
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <textarea
          name="content"
          id=""
          placeholder="whats on your mind"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <button className="create-post-button" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
