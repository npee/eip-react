import React, { Component } from 'react';
import ApiService from "../../ApiService";

import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

class EditQuizComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quizId: '',
            year: '',
            nth: '',
            question: '',
            image: '',
            isCorrect: ''
        };
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        ApiService.fetchQuizById(window.localStorage.getItem('quizId')).then( res => {
            let quiz = res.data.data;
            console.log(quiz);
            this.setState({
                quizId: quiz.quizId,
                year: quiz.year,
                nth: quiz.nth,
                question: quiz.question,
                image: quiz.image,
                isCorrect: quiz.isCorrect
            });
        }).catch( err => {
            console.log('loadUser() Error!', err);
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    home = (e) => {
        this.props.history.push('/');
    }

    saveQuiz = (e) => {
        e.preventDefault();

        let quiz = {
            quizId: this.state.quizId,
            year: this.state.year,
            nth: this.state.nth,
            question: this.state.question,
            image: this.state.image,
            isCorrect: this.state.isCorrect
        }

        ApiService.editQuiz(quiz).then( res => {
            // console.log(res.data.list);
            this.setState({
                message: '문제가 수정되었습니다'
            });
            alert(this.state.message);
            this.props.history.push('/quizzes');
        }).catch( err => {
            console.log('editQuiz() Error!', err);
        });
    }

    // TODO: year, nth는 드롭다운으로 변경 예정
    // TODO: image는 파일 업로드로 대체 해야함
    // TODO: isCorrect는 radio button으로 대체 예정
    // TODO: 선택지(보기) 넣어야 함
    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>퀴즈 수정</Typography>
                <Button variant="contained" color="primary" onClick={this.home}>초기 화면으로</Button>
                <form style={formContainer}>
                    <TextField type="text" name="year" placeholder="연도를 입력해주세요"
                               fullWidth margin="normal" value={this.state.year} onChange={this.onChange} />
                    <TextField type="text" name="nth" placeholder="회차를 입력해주세요"
                               fullWidth margin="normal" value={this.state.nth} onChange={this.onChange} />
                    <TextField type="text" name="question" placeholder="문제를 입력해주세요"
                               fullWidth margin="normal" value={this.state.question} onChange={this.onChange} />
                    <TextField type="text" name="image" placeholder="이미지가 있으면 등록해주세요"
                               fullWidth margin="normal" value={this.state.image} onChange={this.onChange} />
                    <TextField type="text" name="isCorrect" placeholder="true or false"
                               fullWidth margin="normal" value={this.state.isCorrect} onChange={this.onChange} />
                    <Button variant="contained" color="primary" onClick={this.saveQuiz}>수정</Button>
                </form>
            </div>
        );
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default EditQuizComponent;