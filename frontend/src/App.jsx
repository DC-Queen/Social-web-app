import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//component
import Explore from "./Components/Explore/Explore.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Login.jsx";
import UserProfile from "./Components/UserProfile/Login.jsx";
import Navbar from "./Components/Navbar/Login.jsx";
import Feed from "./Components/Feed/Feed.jsx";
import CreatePost from './Components/Post/CreatePost.jsx';
import Post from './Components/Post/Post.jsx';


function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
