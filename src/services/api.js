import axios from "axios";

const URL = "https://linkr-api-itfc.onrender.com/";

export const api = axios.create({ baseURL: URL });

const TOKEN = JSON.parse(localStorage.getItem("user"))?.token;

api.defaults.headers["Authorization"] = `Bearer ${TOKEN}`;

export function signIn(body) {
  // return api.post("/sign-in", body);
}

export function logOut() {
  //return api.delete("/logout");
}
