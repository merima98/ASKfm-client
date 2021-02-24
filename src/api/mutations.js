import axios from "../httpClient";

function signup(credentials) {
  return axios.post(`/signup`, credentials);
}

function signin(credentials) {
  return axios.post(`/signin`, credentials);
}

function createQuestion(values) {
  return axios.post("/questionAdd", values);
}

function likeQuestion(questionId) {
  return axios.post(`/like?questionId=${questionId}`);
}

function dislikeQuestion(questionId) {
  return axios.post(`/dislike?questionId=${questionId}`);
}
const exports = {
  signup,
  signin,
  createQuestion,
  likeQuestion,
  dislikeQuestion,
};
export default exports;
