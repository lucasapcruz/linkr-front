import axios from "axios";

const URL = "http://localhost:5000/";
// const URL = "https://linkr-api-itfc.onrender.com/";

export const api = axios.create({ baseURL: URL });

const TOKEN = JSON.parse(localStorage.getItem("user"))?.token;

api.defaults.headers["Authorization"] = `Bearer ${TOKEN}`;

export function postSignUp(body) {
  return api.post("/sign-up", body);
}

export function signIn(body) {
  return api.post("/sign-in", body);
}

export function logOut() {
  //return api.delete("/logout");
}

// POSTS ==========================
export function postPost(body) {
  return api.post("/posts", body);
}

export function getPosts() {
  return api.get("/posts");
}

export function updatePost(body) {
  return api.patch("/posts", body);
}

export function deletePost(id) {
  return api.delete("/posts/" + id);
}

// HASHTAGS ========================== 
export function getTrendingHashtags(){
  return api.get("/hashtags")
}
