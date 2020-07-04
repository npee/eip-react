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

class Quiz { quizId; year; nth; question; isCorrect; createdDate; modifiedDate; }

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

    deleteQuiz = (id) => {
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
        });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={ style }>List</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Year</TableCell>
                            <TableCell align="center">nth</TableCell>
                            <TableCell align="inherit">Question</TableCell>
                            <TableCell align="inherit">ImageUrl</TableCell>
                            <TableCell align="center">isCorrect</TableCell>
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
                                <TableCell align="inherit">{quiz.question}</TableCell>
                                <TableCell align="inherit">{quiz.image}</TableCell>
                                <TableCell align="center">{quiz.isCorrect}</TableCell>
                                <TableCell align="center">{quiz.createdDate}</TableCell>
                                <TableCell align="center">{quiz.modifiedDate}</TableCell>
                                <TableCell align="center" onClick={() => this.deleteQuiz(quiz.quizId)}>
                                    <DeleteIcon />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center',
}

export default QuizListComponent;