import React, {Component} from "react";
import ApiService from "../../ApiService";

import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// eslint-disable-next-line no-unused-vars
class Quiz { quizId; year; nth; question; image; isCorrect; createdDate; modifiedDate; }
console.log(Quiz);

class AddQuizComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            year: 2020,
            nth: '1st',
            question: '',
            image: '',
            isCorrect: 'false'
        };
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    home = () => {
        this.props.history.push('/');
    }

    saveQuiz = (e) => {
        e.preventDefault();

        let quiz = {
            year: this.state.year,
            nth: this.state.nth,
            question: this.state.question,
            image: this.state.image,
            isCorrect: this.state.isCorrect
        }

        ApiService.addQuiz(quiz).then( res => {
            console.log(res.data.list);
            this.setState({
                message: '문제가 등록되었습니다.'
            });
            alert(this.state.message);
            this.props.history.push('/quizzes');
        }).catch( err => {
            console.log('saveQuiz() Error!', err);
        });
    }

    setItems = (items) => {
        return items.map( (item, index) =>
            <MenuItem key={index} value={item}>{item}</MenuItem>
        )
    }

    // TODO: image는 파일 업로드로 대체 해야함
    // TODO: isCorrect는 radio button으로 대체 예정
    // TODO: 선택지(보기) 넣어야 함
    render() {
        const nths = ['1st', '2nd', '3rd', '1st+2nd'];
        let years = [];
        for (let y = 2020; y > 2000; y--) {
            years.push(y);
        }

        return (
            <div>
                <Typography variant="h4" style={style}>퀴즈 등록</Typography>
                <Button variant="contained" color="primary" onClick={this.home}>초기 화면으로</Button>
                <form style={formContainer}>
                    <Select name="year" value={this.state.year} onChange={this.handleChange}>{this.setItems(years)}</Select>
                    <Select name="nth" value={this.state.nth} onChange={this.handleChange}>{this.setItems(nths)}</Select>
                    <TextField type="text" name="question" placeholder="문제를 입력해주세요"
                               fullWidth margin="normal" value={this.state.question} onChange={this.handleChange} />
                    <TextField type="text" name="image" placeholder="이미지가 있으면 등록해주세요"
                               fullWidth margin="normal" value={this.state.image} onChange={this.handleChange} />
                    <TextField type="text" name="isCorrect" placeholder="true or false"
                               fullWidth margin="normal" value={this.state.isCorrect} onChange={this.handleChange} />
                    <Button variant="contained" color="primary" onClick={this.saveQuiz}>저장</Button>
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

export default AddQuizComponent;