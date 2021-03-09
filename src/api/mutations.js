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
const headers = {
  "Content-Type": "application/json",
};
function payment(values) {
  return axios.post(`/payment`, values, {
    headers: headers,
  });
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
  payment,
};
export default exports;
