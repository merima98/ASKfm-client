import axios from "../httpClient";

function questions() {
  return axios.get(`/questionGet`);
}

function hotestQuestions() {
  return axios.get(`/questionHotestGet`);
}

function userQuestionGet() {
  return axios.get(`/userQuestionGet`);
}

function answers(questionId) {
  return axios.get(`/answerGet?questionId=${questionId}`);
}

function loggedUser() {
  return axios.get("/userById");
}
const exports = {
  questions,
  answers,
  loggedUser,
  userQuestionGet,
  hotestQuestions,
};
export default exports;
