import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `bearer ${token}` } : {};
};

export const register = (userData) => API.post('/user/register', userData);
export const login = (userData) => API.post('/user/login', userData);
export const fetchPosts = () => API.post('/posts', { headers: getAuthHeader()});
export const createPost = (postData) =>
  API.post('/posts/', postData, { headers:getAuthHeader()});

export const likePost = (postId) =>
  API.post(`/posts/${postId}/like`,{}, {headers:getAuthHeader()});
export const commentOnPost = (postId, commentData) =>
  API.post(`/posts/${postId}/comment`,commentData, {headers: getAuthHeader()});

export const followUser =(userId) => API.post(`/user/${userId}/follow`,{}, {headers:getAuthHeader()});
export const unFollowUser =(userId) => API.post(`/user/${userId}/follow`,{}, {headers:getAuthHeader()});
export const fetchExploreUsers =(userId) => API.post(`/user/explore`, {headers:getAuthHeader()});
export const fetchUserById =(userId) => API.post(`/user/${userId}`, {headers:getAuthHeader()});
