import axios from "../httpClient";

function questions() {
  return axios.get(`/questionGet`);
}

function answers(questionId) {
  return axios.get(`/answerGet?questionId=${questionId}`);
}
const exports = { questions, answers };
export default exports;
