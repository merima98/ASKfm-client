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

function rate(questionId) {
  return axios.patch(`/rate?questionId=${questionId}`);
}

function createAnswer(values) {
  return axios.post("/answerAdd", values);
}

function likeQuestion(questionId) {
  return axios.post(`/like?questionId=${questionId}`);
}

function dislikeQuestion(questionId) {
  return axios.post(`/dislike?questionId=${questionId}`);
}
function updateUser(values) {
  return axios.patch(`/update`, values);
}
const exports = {
  signup,
  signin,
  createQuestion,
  rate,
  createAnswer,
  likeQuestion,
  dislikeQuestion,
  updateUser,
};
export default exports;
