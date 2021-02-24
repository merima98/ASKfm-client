import axios from "../httpClient";

function questions() {
  return axios.get(`/questionGet`);
}
const exports = { questions };
export default exports;
