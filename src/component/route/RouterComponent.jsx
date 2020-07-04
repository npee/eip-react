import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QuizListComponent from "../quiz/QuizListComponent";

const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Switch>
                        <Route exact path="/" component={QuizListComponent} />
                        <Route path="/quizzes" component={QuizListComponent} />
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