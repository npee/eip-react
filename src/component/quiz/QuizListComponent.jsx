import React, { Component } from 'react';
import ApiService from "../../ApiService";

import Table from '@material-ui/core/Table';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
// class Quiz { quizId; year; nth; subjectId; question; image; isCorrect; createdDate; modifiedDate; }
// class Subject { subjectId; subject; subject2019; }

const useStyles = () => ({
    typoGraphy: {
        display: 'flex',
        justifyContent: 'center'
    }
});

class QuizListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quizzes:[],
            message: null,
        }
    }

    componentDidMount() {
        this.reloadQuizList();
        this.reloadSubjectList();
        this.reloadQuizCountList();
    }

    reloadQuizList = () => {
        ApiService.fetchQuizzes().then( res => {
            this.setState({
                quizzes: res.data.list,
            })
        }).catch( err => {
            console.log('reloadedQuizzesList() Error!', err);
        });
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

    reloadQuizCountList = () => {
        ApiService.fetchQuizCountList().then( res => {
            this.setState({
                quizCountList: res.data.list,
            });
        }).catch( err => {
            console.log('reloadQuizCountList() Error!', err);
        });
    }

    addQuiz = () => {
        window.localStorage.removeItem('quizId');
        this.props.history.push('/add-quiz');
        console.log(this.props);
    }

    editQuiz = (id) => {
        window.localStorage.setItem('quizId', id);
        this.props.history.push('/edit-quiz');
        console.log(this.props);
    }

    deleteQuiz = (id) => {
        // eslint-disable-next-line no-restricted-globals
        confirm("퀴즈를 삭제하시겠습니까?") ?
        ApiService.deleteQuiz(id).then( res => {
            this.setState({
                // eslint-disable-next-line array-callback-return
                quizzes: this.state.quizzes.filter( quiz => {
                    // eslint-disable-next-line no-unused-expressions
                    return quiz.quizId !== id;
                }),
                message: '퀴즈가 삭제되었습니다.',
            });
            alert(this.state.message);
        }).catch( err => {
            console.log('deleterQuiz() Error!', err);
        }) : console.log("삭제 취소");
    }

    findSubjectByIdAndYear = (subjectId, year) => {
        const subjects = this.state.subjects;

        for (let i in subjects) {
            if (subjects.hasOwnProperty(i) && subjectId === parseInt(i) + 1) {
                return year < 2020 ? subjects[i]['subject2019'] : subjects[i]['subject'];
            }
        }
    }

    render() {

        const classes = useStyles();
        console.log(this.state);

        return (
            <div>
                <Typography variant="h4" style={ classes.typoGraphy }>Quiz List</Typography>
                <Button variant="contained" color="primary" onClick={this.addQuiz}>퀴즈 등록</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Year</TableCell>
                            <TableCell align="center">nth</TableCell>
                            <TableCell align="center">subject</TableCell>
                            <TableCell align="inherit">Question</TableCell>
                            <TableCell align="inherit">ImageUrl</TableCell>
                            <TableCell align="center">CreatedAt</TableCell>
                            <TableCell align="center">ModifiedAt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.quizzes.map( quiz =>
                            <TableRow key={quiz.quizId}>
                                <TableCell component="th" scope="quiz" align="center">{quiz.quizId}</TableCell>
                                <TableCell align="center">{quiz.year}</TableCell>
                                <TableCell align="center">{quiz.nth}</TableCell>
                                <TableCell align="center">{this.findSubjectByIdAndYear(quiz.subjectId, quiz.year)}</TableCell>
                                <TableCell align="inherit">{quiz.question}</TableCell>
                                <TableCell align="inherit">{quiz.image}</TableCell>
                                <TableCell align="center">{quiz.createdDate}</TableCell>
                                <TableCell align="center">{quiz.modifiedDate}</TableCell>
                                <TableCell align="center" onClick={() => this.deleteQuiz(quiz.quizId)}>
                                    <DeleteIcon />
                                </TableCell>
                                <TableCell align="center" onClick={() => this.editQuiz(quiz.quizId)}>
                                    <CreateIcon />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(useStyles)(QuizListComponent);
