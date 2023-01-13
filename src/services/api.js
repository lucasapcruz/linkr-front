import axios from "axios";

//const URL = "http://localhost:5000/";
const URL = "https://linkr-api-itfc.onrender.com/";

export const api = axios.create({ baseURL: URL });

const TOKEN = JSON.parse(localStorage.getItem("user"))?.token;
api.defaults.headers["Authorization"] = `Bearer ${TOKEN}`;

export function updateUser() {
  const TOKEN = JSON.parse(localStorage.getItem("user"))?.token;
  api.defaults.headers["Authorization"] = `Bearer ${TOKEN}`;
}

export function postSignUp(body) {
  return api.post("/sign-up", body);
}

export function signIn(body) {
  return api.post("/sign-in", body);
}

export function logOut() {
  return api.delete("/users");
}

export function getUsers(value) {
  return api.get("/user?name=" + value);
}

export function followUser(id) {
  const route = "/follow/" + id;
  return api.post(route);
}

// POSTS ==========================
export function postPost(body) {
  return api.post("/posts", body);
}

export function getPosts(postsPage, hashtag = null) {
  const route = hashtag? `/posts?page=${postsPage}&hashtag=${hashtag}` : `/posts?page=${postsPage}`;
  return api.get(route);
}

export function postLike(id) {
  return api.post("/likes", { postId: id });
}

export function getLikes() {
  return api.get("/likes");
}

export function getPostsUser(id, postsPage) {
  const route = `/posts/user/${id}?page=postsPage` ;
  return api.get(route);
}

export function updatePost(body) {
  return api.patch("/posts", body);
}

export function deletePost(id) {
  return api.delete("/posts/" + id);
}

export function repost(id) {
  console.log(id);
  // return api.post(`/share/${id}`);
}

// HASHTAGS ==========================
export function getTrendingHashtags() {
  return api.get("/hashtags");
}
