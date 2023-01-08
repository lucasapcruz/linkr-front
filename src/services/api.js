import axios from "axios";

//const URL = "http://localhost:5000/";
const URL = "https://linkr-api-itfc.onrender.com/";

export const api = axios.create({ baseURL: URL });

let TOKEN = JSON.parse(localStorage.getItem("user"))?.token;
api.defaults.headers["Authorization"] = `Bearer ${TOKEN}`;

function updateUser () {
  TOKEN = JSON.parse(localStorage.getItem("user"))?.token;
  api.defaults.headers["Authorization"] = `Bearer ${TOKEN}`;
}

export function postSignUp(body) {
  updateUser();
  return api.post("/sign-up", body);
}

export function signIn(body) {
  updateUser();
  return api.post("/sign-in", body);
}

export function logOut() {
  updateUser();
  return api.delete("/users");
}

// POSTS ==========================
export function postPost(body) {
  updateUser();
  return api.post("/posts", body);
}

export function getPosts(hashtag=null) {
  updateUser();
  const route = hashtag? `/posts?hashtag=${hashtag}`: `/posts`;
  return api.get(route);
}

////////////////

export function postLike(id) {
  updateUser();
  return api.post("/likes", { postId: id });
}

export function getLikes() {
  updateUser();
  return api.get("/likes");
}

///////////////

export function updatePost(body) {
  updateUser();
  return api.patch("/posts", body);
}

export function deletePost(id) {
  updateUser();
  return api.delete("/posts/" + id);
}

// HASHTAGS ========================== 
export function getTrendingHashtags(){
  updateUser();
  return api.get("/hashtags")
}
