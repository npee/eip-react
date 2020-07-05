import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QuizListComponent from "../quiz/QuizListComponent";
import AddQuizComponent from "../quiz/AddQuizComponent";

const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Switch>
                        <Route exact path="/" component={QuizListComponent} />
                        <Route path="/quizzes" component={QuizListComponent} />
                        <Route path="/add-quiz" component={AddQuizComponent}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

const style = {
    margin: '10px'
}

export default AppRouter;