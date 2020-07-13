import React, {Component} from "react";
import ApiService from "../../ApiService";

import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";

// eslint-disable-next-line no-unused-vars
class Quiz { quizId; year; nth; subjectId; question; image; isCorrect; createdDate; modifiedDate; }
class Subject { subjectId; subject; subject2019; }
console.log(Quiz);
console.log(Subject);

const useStyles = () => ({
    typoGraphy: {
        display: 'flex',
        justifyContent: 'center'
    },
    select: {
        margin: 6,
        minWidth: 120
    },
    textField: {
        margin: 6,
    }
});

class AddQuizComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            year: 2020,
            nth: '1st',
            // 초기값에 공백 이외의 값을 주는 경우 경고메시지가 뜨고 있으므로
            // 임시로 공백값을 주는 중
            // subjectId: 1,
            subjectId: '',
            question: '',
            image: '',
            isCorrect: 'false',
            items: [
                {
                    choice: '',
                    isAnswer: ''
                },
                {
                    choice: '',
                    isAnswer: ''
                },
                {
                    choice: '',
                    isAnswer: ''
                },
                {
                    choice: '',
                    isAnswer: ''
                },
            ]
        };
    }

    componentDidMount() {
        this.reloadSubjectList();
    }

    reloadSubjectList = () => {
        ApiService.fetchSubjects().then( res => {
            this.setState({
                subjects: res.data.list,
            });
        }).catch( err => {
            console.log('reloadSubjectList() Error!', err);
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleChangeItemList = (e) => {
        const items = [...this.state.items];
        const itemIndex = parseInt(e.target.name.slice(6)) - 1;
        let item = items[itemIndex];
        if (e.target.name.includes('choice')) {
            console.log('choice changed');
            item.choice = e.target.value;
        } else {
            console.log('answer changed');
            item.isAnswer = e.target.value;
        }
        items[itemIndex] = item;
        this.setState({items: items});

        console.log(this.state);
    }

    home = () => {
        this.props.history.push('/');
    }

    saveQuiz = (e) => {
        e.preventDefault();

        let quiz = {
            year: this.state.year,
            nth: this.state.nth,
            subjectId: this.state.subjectId,
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

    setOption = (options) => {
        return options.map( (option, index) =>
            <MenuItem key={index} value={option}>{option}</MenuItem>
        )
    }

    setSubject = (subjects) => {
        return subjects.map( (subject, index) =>
            <MenuItem key={index} value={index+1}>{subject}</MenuItem>
        )
    }

    // TODO: image는 파일 업로드로 대체 해야함
    // TODO: isCorrect는 radio button으로 대체 예정
    // TODO: 선택지(보기) 넣어야 함
    render() {
        const nths = ['1st', '2nd', '3rd', '1st+2nd'];
        const years = () => {
            let yearList = [];
            for (let y = 2020; y > 2000; y--) {
                yearList.push(y);
            }
            return yearList;
        }

        const subjects = () => {
            let subjectList = [];
            for (let i in this.state.subjects) {
                if (this.state.subjects.hasOwnProperty(i)) {
                    if (this.state.year < 2020)
                        subjectList.push(this.state.subjects[i]['subject2019']);
                    else
                        subjectList.push(this.state.subjects[i]['subject']);
                }
            }
            return subjectList;
        }

        const classes = useStyles();

        return (
            <Container maxWidth="sm">
                <Typography variant="h4" style={classes.typoGraphy}>퀴즈 등록</Typography>
                <Button variant="contained" color="primary" onClick={this.home}>초기 화면으로</Button>
                <FormGroup row>
                    <FormControl style={classes.select}>
                        <InputLabel id="year-list">연도</InputLabel>
                        <Select labelId="year-lists" name="year" value={this.state.year} onChange={this.handleChange}>{this.setOption(years())}</Select>
                    </FormControl>
                    <FormControl style={classes.select}>
                        <InputLabel id="nth-list">회차</InputLabel>
                        <Select labelId="nth-list" name="nth" value={this.state.nth} onChange={this.handleChange}>{this.setOption(nths)}</Select>
                    </FormControl>
                    <FormControl style={classes.select}>
                        <InputLabel id="subject-list">과목명</InputLabel>
                        <Select labelId="subject-list" name="subjectId" value={this.state.subjectId} onChange={this.handleChange}>{this.setSubject(subjects())}</Select>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <TextField required label="문제" type="text" name="question" placeholder="문제를 입력해주세요"
                               fullWidth margin="normal" style={classes.textField} value={this.state.question} onChange={this.handleChange} />
                    <TextField label="이미지" type="text" name="image" placeholder="이미지가 있으면 등록해주세요"
                               fullWidth margin="normal" style={classes.textField} value={this.state.image} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    {/*보기*/}
                    {/*정답 여부는 radio button으로*/}
                    <TextField label="보기1" type="text" name="choice1" placeholder="보기1"
                               fullWidth margin="normal" style={classes.textField} value={this.state.items[0].choice} onChange={this.handleChangeItemList} />
                    <TextField label="보기2" type="text" name="choice2" placeholder="보기2"
                               fullWidth margin="normal" style={classes.textField} value={this.state.items[1].choice} onChange={this.handleChangeItemList} />
                    <TextField label="보기3" type="text" name="choice3" placeholder="보기3"
                               fullWidth margin="normal" style={classes.textField} value={this.state.items[2].choice} onChange={this.handleChangeItemList} />
                    <TextField label="보기4" type="text" name="choice4" placeholder="보기4"
                               fullWidth margin="normal" style={classes.textField} value={this.state.items[3].choice} onChange={this.handleChangeItemList} />
                </FormGroup>
                <FormGroup>
                    <TextField label="정답 여부" type="text" name="isCorrect" placeholder="true or false"
                               fullWidth margin="normal" style={classes.textField} value={this.state.isCorrect} onChange={this.handleChange} />
                </FormGroup>
                <Button variant="contained" color="primary" onClick={this.saveQuiz}>저장</Button>
            </Container>
        );
    }
}

export default withStyles(useStyles)(AddQuizComponent);