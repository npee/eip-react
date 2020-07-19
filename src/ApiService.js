import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8080/v1";

class ApiService {

    fetchQuizzes() {
        return axios.get(API_BASE_URL + '/quizzes');
    }

    fetchQuizById(quizId) {
        return axios.get(API_BASE_URL + '/quizzes/' + quizId);
    }

    deleteQuiz(quizId) {
        return axios.delete(API_BASE_URL + '/quizzes/' + quizId);
    }

    addQuiz(quiz) {
        return axios.post(API_BASE_URL + '/quizzes', quiz);
    }

    editQuiz(quiz) {
        return axios.put(API_BASE_URL + '/quizzes/' + quiz.quizId, quiz)
    }

    fetchSubjects() {
        return axios.get(API_BASE_URL + '/subjects');
    }

    fetchQuizCountList() {
        return axios.get(API_BASE_URL + '/quizzes/count');
    }

}

export default new ApiService();
