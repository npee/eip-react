import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8080/v1";

class ApiService {

    fetchQuizzes() {
        return axios.get(API_BASE_URL + '/quizzes');
    }

    deleteQuiz(quizId) {
        return axios.delete(API_BASE_URL + '/quizzes/' + quizId);
    }

    addQuiz(quiz) {
        return axios.post(API_BASE_URL + '/quizzes', quiz);
    }

}

export default new ApiService();