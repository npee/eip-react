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

class QuizListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quizzes:[],
        }
    }

    componentDidMount() {
        this.reloadUserList();
    }
    reloadUserList = () => {
        ApiService.fetchQuizzes().then( res => {
            this.setState({
                quizzes: res.data.list,
            })
        }).catch( err => {
            console.log('reloadedQuizzesList() Error!', err);
        })
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