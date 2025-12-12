import React, { useState } from "react";

import "./Explore.css";

import {
  fetchExploreUsers,
  followUser,
  unFollowUser,
} from "../../services/api";

export default function Explore() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetchExploreUsers();
      //console.log(response.data)
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isFollowing: true } : user
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnFollow = async (userId) => {
    try {
      await unFollowUser(userId);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isFollowing: false } : user
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  console.log(user[0]);

  return (
    <div className="explore-container">
      <h1>Explore Users </h1>
      <ul className="user-list">
        {users?.map((user) => {
          <li key={user._id} className="user-item">
            <h2>{user.username}</h2>
            <P>{user.email}</P>
            <P>Followers:{user.followers.length}</P>
            <P>Following:{user.followers.length}</P>
            {
            user.isFollowing?(
              <button
                className="unfollow-button"
                onClick={() => handleUnFollow(user._id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="follow-button"
                onClick={() => handleFollow(user._id)}
              >
                follow
              </button>
            )}
          </li>;
        })}
      </ul>
    </div>
  );
}
