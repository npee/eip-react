import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8080/v1";

class ApiService {

    fetchQuizzes() {
        return axios.get(API_BASE_URL + '/quizzes');
    }

}

export default new ApiService();