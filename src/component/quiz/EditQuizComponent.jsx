import React, { Component } from 'react';
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
import Radio from "@material-ui/core/Radio";

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
    },
    itemField: {
        minWidth: 500
    },
});

class EditQuizComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quizId: '',
            year: '',
            nth: '',
            subjectId: '',
            question: '',
            image: '',
            items: []
        };
    }

    componentDidMount() {
        this.loadUser();
        this.reloadSubjectList();
    }

    loadUser = () => {
        ApiService.fetchQuizById(window.localStorage.getItem('quizId')).then( res => {
            let quiz = res.data.data;
            console.log(quiz);
            this.setState({
                quizId: quiz.quizId,
                year: quiz.year,
                nth: quiz.nth,
                subjectId: quiz.subjectId,
                question: quiz.question,
                image: quiz.image,
                items: quiz.items,
            });
        }).catch( err => {
            console.log('loadUser() Error!', err);
        })
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
        let item = items;
        if (e.target.name.includes('choice')) {
            item[itemIndex].choice = e.target.value;
        } else {
            for (let i in item) {
                item[i].isAnswer = 'false';
            }
            item[itemIndex].isAnswer = 'true';
        }
        for (let i in items) {
            items[i] = item[i];
        }
        this.setState({items: items});

        console.log(this.state);
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
            subjectId: this.state.subjectId,
            question: this.state.question,
            image: this.state.image,
            items: this.state.items,
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

    /**
     * 보기 리스트 Input
     * @param items : any[]
     * @returns {*}
     */
    setItem = (items) => {
        const classes = useStyles();
        const labels = ["보기1", "보기2", "보기3", "보기4"];
        const choices = ["choice1", "choice2", "choice3", "choice4"];
        const answers = ["answer1", "answer2", "answer3", "answer4"];
        return items.map( (item, index) =>
            <FormGroup row key={index}>
                <Radio
                    checked={items[index].isAnswer === 'true'}
                    onChange={this.handleChangeItemList}
                    value={items[index].isAnswer}
                    name={answers[index]}
                    inputProps={{ 'aria-label': labels[index] }}
                />
                <TextField
                    label={labels[index]}
                    type="text"
                    name={choices[index]}
                    placeholder={labels[index]}
                    variant="outlined"
                    margin="normal"
                    style={classes.itemField}
                    value={items[index].choice}
                    onChange={this.handleChangeItemList}
                />
            </FormGroup>
        )
    }

    // TODO: image는 파일 업로드로 대체 해야함

    render() {
        const nths = ['1st', '2nd', '3rd'];
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
                <Typography variant="h4" style={ classes.typoGraphy }>퀴즈 수정</Typography>
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
                <FormGroup>{this.setItem(this.state.items)}</FormGroup>
                <Button variant="contained" color="primary" onClick={this.saveQuiz}>수정</Button>
            </Container>
        );
    }
}

export default withStyles(useStyles)(EditQuizComponent);
